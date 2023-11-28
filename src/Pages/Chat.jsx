import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatBody from "../Components/ChatBody";
import ChatHead from "../Components/ChatHead";
import ChatSender from "../Components/ChatSender";
import { db } from "../Config/Firebase";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import "../ChatStyle.scss";

function Chat(props) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState(null);
  const messageRef = useRef(null);

  const messageStoreRef = collection(db, "Chat");

  useEffect(() => {
    const unsubscribe = onSnapshot(messageStoreRef, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => {
        const data = doc.data();
        let dateNtime = new Date();

        if (data.dateNtime instanceof Date) {
          dateNtime = data.dateNtime;
        } else if (data.dateNtime?.toDate) {
          dateNtime = data.dateNtime.toDate();
        }

        return {
          ...data,
          id: doc.id,
          dateNtime: dateNtime,
        };
      });

      chatData.sort((a, b) => {
        return a.dateNtime - b.dateNtime;
      });

      setMessageList(chatData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setUser(props.user);
  });

  async function sendMessage() {
    const currentDate = new Date();

    try {
      const newMessageRef = doc(messageStoreRef);

      console.log(user);
      await setDoc(newMessageRef, {
        sender: props.user.displayName,
        senderMail: props.user.email,
        text: message,
        dateNtime: currentDate,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
      });
      setMessage("");
      messageRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    if (message !== "") {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [sendMessage, messageRef]);

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        
        <ChatHead />
        <ChatBody messageList={messageList} user={user} />
        <ChatSender
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          messageList={messageList}
          messageRef={messageRef}
        />
      </div>
    </div>
  );
}

export default Chat;
