import React from "react";
import { useEffect, useRef } from "react";
import { db } from "../Config/Firebase";
import { doc, deleteDoc } from "firebase/firestore";
import trash from "../Assets/trash.png";

function ChatBody(props) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [props.messageList]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function deleteMessage(id) {
    try {
      const deleteMessages = props.messageList.find((chat) => chat.id === id);
      if (
        props.user !== null &&
        deleteMessages.senderMail === props.user.email
      ) {
        await deleteDoc(doc(db, "Chat", id));
      } else {
        alert("You cannot delete messages that are not yours.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="chat-body-container">
      {props.messageList.map((chat) => (
        <div
          key={chat.id}
          className={
            chat.senderMail === props.user?.email
              ? "chat-body-my-messages"
              : "chat-body-other-messages"
          }
        >
          <p className="sender">{chat.sender}</p>
          <p className="text">{chat.text}</p>
          <div>
            {chat.senderMail === props.user?.email && (
              <button
                onClick={() => deleteMessage(chat.id)}
                style={{ backgroundColor: "transparent" }}
              >
                <img src={trash} alt="delete" />
              </button>
            )}
            <p className="time">{chat.time} </p>
          </div>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatBody;
