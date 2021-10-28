import classes from './Messenger.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../../Conversations/Conversation';
import Message from '../../Message/Message';
import ChatOnline from '../../ChatOnline/ChatOnline';
import { getUserInfo } from '../../../api/Auth';
import { getConversations, getMessages, sendMessage } from '../../../api/Messenger';
import { getProfile } from '../../../api/Profile';
import { io } from 'socket.io-client';

const Messenger = () => {
    const [userAndConversations, setUserAndConversations] = useState({ userData: "", conversations: "" });
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on("getMessage",data=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])
    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
        setMessages(prev=>[...prev,arrivalMessage]);
    },[arrivalMessage,currentChat])
    useEffect(() => {
        if (userAndConversations.userData) {
            socket.current.emit("addUser", userAndConversations.userData.username,userAndConversations.userData.image);
            socket.current.on("getUsers", users => {
                const result=users.filter(user=>user.userId!=userAndConversations.userData.username);
                setOnlineUsers(result);
            })
        }
    }, [userAndConversations.userData])

    useEffect(async () => {
        let activeUser = await getUserInfo();
        activeUser = await getProfile(activeUser.username);
        console.log("Active User: ", activeUser);
        const totalConversations = await getConversations(activeUser.username);
        setUserAndConversations({ userData: activeUser, conversations: totalConversations });

    }, [])
    useEffect(async () => {
        if (currentChat) {
            const totalMessages = await getMessages(currentChat._id);
            setMessages(totalMessages);
        }
    }, [currentChat])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userAndConversations.userData.username,
            text: newMessage,
            conversationId: currentChat._id
        }
        const sender=userAndConversations.userData.username;
        const receiver=currentChat.members.find(member=>member!==sender)
        socket.current.emit("sendMessage",{
            senderId:sender,
            receiverId:receiver,
            text:newMessage
        })
        const newMsg = await sendMessage(message);
        setMessages([...messages, newMsg]);
        setNewMessage("");
    }
    return (
        <div className={classes.messenger}>
            <div className={classes.chatMenu}>
                <div clas sName={classes.chatMenuWrapper}>
                    <input placeholder="Search for friends" className={classes.chatMenuInput} />
                    {userAndConversations.conversations ? userAndConversations.conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={userAndConversations.userData} />
                        </div>
                    )) : <div />}
                </div>
            </div>
            <div className={classes.chatBox}>
                <div className={classes.chatBoxWrapper}>
                    {currentChat ? <>
                        <div className={classes.chatBoxTop}>
                            <span>{currentChat.members.find(member=>member!=userAndConversations.userData.username)}</span>
                            {messages ? messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message currentChat={currentChat} message={m} text={m.text} own={m.sender === userAndConversations.userData.username} />
                                </div>
                            )) : <div />}
                        </div>
                        <div className={classes.chatBoxBottom}>
                            <textarea
                                placeholder="write something..."
                                className={classes.chatMessageInput}
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button onClick={handleSubmit} className={classes.chatSubmitButton}>Send</button>
                        </div></> : <span className={classes.noConversationText}>Open a conversation to start a chat.</span>}
                </div>
            </div>
            <div className={classes.chatOnline}>
                <div className={classes.chatOnlineWrapper}>
                    <ChatOnline userAndConversations={userAndConversations} setUserAndConversations={setUserAndConversations} setCurrentChat={setCurrentChat} onlineUsers={onlineUsers} currentId={userAndConversations.userData} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
    )
}
export default Messenger;