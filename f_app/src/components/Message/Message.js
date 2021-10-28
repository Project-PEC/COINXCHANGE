import './Message.css';
import {format} from 'timeago.js';

const Message = ({own,text,image,message}) => {
    return (
        <div className={own?"message own":"message"}>
            <div className="messageTop">
                <img className="messageImg"
                    src={image}
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