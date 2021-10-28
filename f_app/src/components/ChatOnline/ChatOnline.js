import { useEffect } from "react";
import "./ChatOnline.css";

const ChatOnline = (onlineUsers, setCurrentChat, currentId) => {
    useEffect(() => {

    })
    return (
        <>
            {
                (
                    <div className="chatOnline">
                        <div className="chatOnlineFriend">
                            <div className="chatOnlineImgContainer">
                                <img className="chatOnlineImg"
                                    src="https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg"
                                    alt="" />
                                <div className="chatOnlineBadge"></div>
                            </div>
                            <span className="chatOnlineName">Johnia</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default ChatOnline;