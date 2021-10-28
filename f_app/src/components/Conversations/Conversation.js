import { useEffect, useState } from "react";
import { getProfile } from "../../api/Profile";
import "./Conversation.css";

const Conversation = ({ conversation, currentUser }) => {
    const [friend, setFriend] = useState(null);
    useEffect(async () => {
        const friendId = conversation.members.find(m => m !== currentUser.username)
        const friendData = await getProfile(friendId);
        setFriend(friendData);

    }, [])
    let toRender = <div></div>
    if (friend) {
        toRender = <div className="conversation">
            <img className="conversationImg"
                src={friend.image}
                alt={friend.username} />
            <span className="conversationName">{friend.username}</span>
        </div>
    }
    return (
        <>
            {toRender}
        </>
    )
}
export default Conversation;