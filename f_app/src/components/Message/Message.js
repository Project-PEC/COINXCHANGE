import './Message.css';
import { format } from 'timeago.js';

const Message = ({ own, text, message ,currentChat}) => {
    let toRenderImage=currentChat.images[message.sender];
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg"
                    src={toRenderImage}
                    alt={message.sender} />
                <p className="messageText">
                    {text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message;