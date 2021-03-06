import classes from './Messenger.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../../Conversations/Conversation';
import Message from '../../Message/Message';
import ChatOnline from '../../ChatOnline/ChatOnline';
import { getUserInfo } from '../../../api/Auth';
import { getConversations, getMessages, sendMessage, updateConvo } from '../../../api/Messenger';
import { getProfile } from '../../../api/Profile';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';



const Messenger = (props) => {
    const [userAndConversations, setUserAndConversations] = useState({ userData: "", conversations: "" });
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState("");
    // const [onlineUsers, props.setOnlineUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const scrollRef = useRef();

    useEffect(async () => {

        let activeUser = await getUserInfo();
        activeUser = await getProfile(activeUser.username);
        const totalConversations = await getConversations(activeUser.username);
        props.socket.current.on("getMessage", async (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
        if (props.location.state) {
            props.setUnread(false);
            setCurrentChat(props.location.state.state);
            setUserAndConversations({ userData: activeUser, conversations: totalConversations });
            setLoading(false)
        }
        else {
            setUserAndConversations({ userData: activeUser, conversations: totalConversations });
            setLoading(false)
        }
    }, [])
    // console.log(arrivalMessage);
    useEffect(async () => {
        if (arrivalMessage && !userAndConversations.conversations.find(convo => convo.members.includes(arrivalMessage.sender))) {
            let activeUser = await getUserInfo();
            activeUser = await getProfile(activeUser.username);
            const totalConversations = await getConversations(activeUser.username);
            setUserAndConversations({ userData: activeUser, conversations: totalConversations });
            setLoading(false)
        }

        if (arrivalMessage && !currentChat) {
            const sender = arrivalMessage.sender;
            const receiver = userAndConversations.userData.username;
            const x = await updateConvo({ user: sender, toChange: receiver, changed: false });
            let activeUser = await getUserInfo();
            activeUser = await getProfile(activeUser.username);
            const totalConversations = await getConversations(activeUser.username);
            setUserAndConversations({ userData: activeUser, conversations: totalConversations });
            setLoading(false)

        }
        else if (arrivalMessage && currentChat && !currentChat.members.find(user => user === arrivalMessage.sender)) {
            // console.log(currentChat.members.find(user => user != arrivalMessage.sender));
            const sender = arrivalMessage.sender;
            const receiver = userAndConversations.userData.username;
            const x = await updateConvo({ user: sender, toChange: receiver, changed: false });
            let activeUser = await getUserInfo();
            activeUser = await getProfile(activeUser.username);
            const totalConversations = await getConversations(activeUser.username);
            setUserAndConversations({ userData: activeUser, conversations: totalConversations });
            setLoading(false)
        }
        else if (arrivalMessage && currentChat) {
            const sender = arrivalMessage.sender;
            const receiver = userAndConversations.userData.username;
            const x = await updateConvo({ user: sender, toChange: receiver, changed: true });
            props.setUnread(false);
        }
    }, [arrivalMessage])
    useEffect(async () => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage]);


    }, [arrivalMessage, currentChat])
    useEffect(() => {
        if (userAndConversations.userData) {
            props.socket.current.emit("addUser", userAndConversations.userData.username, userAndConversations.userData.image);
            props.socket.current.on("getUsers", users => {
                const result = users.filter(user => user.userId != userAndConversations.userData.username);
                props.setOnlineUsers(result);
            })
        }
    }, [userAndConversations.userData])


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
        if (newMessage.length > 0) {
            const message = {
                sender: userAndConversations.userData.username,
                text: newMessage,
                conversationId: currentChat._id
            }
            const sender = userAndConversations.userData.username;
            const receiver = currentChat.members.find(member => member !== sender)
            const x = await updateConvo({ user: sender, toChange: receiver, changed: false });
            props.socket.current.emit("sendMessage", {
                senderId: sender,
                receiverId: receiver,
                text: newMessage
            })
            const newMsg = await sendMessage(message);
            setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    }
    const onInputChangeHandler = (e) => {
        setFilter(e.target.value);
    }
    const onClickHandler = async (c) => {
        setLoading2(true);
        const user = userAndConversations.userData.username;
        const friend = c.members.find(x => x != user);
        const x = await updateConvo({ user: friend, toChange: user, changed: true })
        props.setUnread(false);
        const totalConversations = await getConversations(userAndConversations.userData.username);
        setUserAndConversations({ ...userAndConversations, conversations: totalConversations });
        setCurrentChat(c);
        setLoading(false)
        setLoading2(false);

    }
    const toShow = !loading ? <><div className={classes.chatMenu}>
        <div clas sName={classes.chatMenuWrapper}>
            <input type="text" placeholder="Search for friends" className={classes.chatMenuInput} onChange={(e) => onInputChangeHandler(e)} />
            {userAndConversations.conversations ? userAndConversations.conversations.map((c) => {
                return c.members.find(a => a != userAndConversations.userData.username).includes(filter) ?
                    <div onClick={() => onClickHandler(c)}>
                        <Conversation conversation={c} currentUser={userAndConversations.userData} />
                    </div>
                    : <div />
            }) : <div />}
        </div>
    </div>
        <div className={classes.chatBox}>
            <div className={classes.chatBoxWrapper}>

                {currentChat && !loading2 ?
                    <span className={classes.Friend}><Link className={classes.friendLink} to={"/view/" + currentChat.members.find(member => member != userAndConversations.userData.username)}>{currentChat.members.find(member => member != userAndConversations.userData.username)}</Link></span>
                    : loading2 ?
                        <div className="wrappp"><Loader
                            type="Oval"
                            color="rgb(4,21,59)"
                            height={150}
                            width={150}
                        /></div>
                        : <div />}
                {currentChat && !loading2 ? <>
                    <div className={classes.chatBoxTop}>
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
                    </div></> : !loading2 ? <span className={classes.noConversationText}>Open a conversation to start a chat.</span> : <div />}
            </div>
        </div>
        <div className={classes.chatOnline}>
            <div className={classes.chatOnlineWrapper}>
                {userAndConversations.userData && <ChatOnline
                    setCurrentChat={onClickHandler}
                    onlineUsers={props.onlineUsers}
                    currentId={userAndConversations.userData} />}
            </div>
        </div></> : <div className="wrappp"><Loader
            type="Oval"
            color="rgb(4,21,59)"
            height={150}
            width={150}
        /></div>
    return (
        <div className={classes.messenger}>
            {toShow}
        </div>
    )
}
export default withRouter(Messenger);