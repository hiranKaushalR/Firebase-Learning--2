import React from "react";

function ChatSender(props) {
  return (
    <div className="chat-sender-container">
      <input
        type="text"
        onChange={(event) => props.setMessage(event.target.value)}
        ref={props.messageRef}
      />
      {props.message !== "" ? (
        <button onClick={props.sendMessage}> Send </button>
      ) : (
        <button disabled>Send </button>
      )}
    </div>
  );
}

export default ChatSender;
