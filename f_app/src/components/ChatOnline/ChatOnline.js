import { useEffect } from "react";
import { getConversations, newConvo } from "../../api/Messenger";
import "./ChatOnline.css";

const ChatOnline = ({ onlineUsers, setCurrentChat, currentId }) => {
    const clickHandler = async (username, userImage) => {
        const currentUser = currentId.username;
        const currentImage = currentId.image;
        const toUseImages = {}
        toUseImages[username] = userImage;
        toUseImages[currentUser] = currentImage;
        const data = {
            "senderId": username,
            "receiverId": currentUser,
            "senderImage": userImage,
            "receiverImage": currentImage
        }
        const imageObj={};
        imageObj[username]=userImage;
        imageObj[currentUser]=currentImage;
        const conversations = await getConversations(currentUser);
        const res = conversations.find(convo => convo.members[0] == username || convo.members[1] == username);
        if (!res) {
            const result = await newConvo(data);
            setCurrentChat({
                ...result,
                images:imageObj
            });
        }
        else {
            setCurrentChat(res);
        }
    }
    const toRender =
        onlineUsers.map(o =>
        (
            <div onClick={() => clickHandler(o.userId, o.userImage)} className="chatOnline">
                <div className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg"
                            src={o.userImage}
                            alt={o.userId} />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o.userId}</span>
                </div>
            </div>
        ))
    return (
        <>
            {
                toRender
            }
        </>
    )
}
export default ChatOnline;