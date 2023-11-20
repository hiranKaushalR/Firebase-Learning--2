// import React from "react";
// import Login from "../Components/Login";
// import { db } from "../Config/Firebase";
// import { collection, orderBy, limit, query } from "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { currentUser } from 'firebase/auth'

// function ChatApp(props) {
//   const chatRef = collection(db, "Chat");
//   const q = query(chatRef, orderBy("time"), limit(25));
//   const [messages] = useCollectionData(q, { idField: "id" });
//   const messageClass = uid === auth.currentUser.uid 

//   return (
//     <div>
//       {props.user !== null ? (
//         <div>
//           {messages.map((message) => (
//             <div key={message.id}>
//               <p>{message.text}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         "Log IN"
//       )}
//     </div>
//   );
// }

// export default ChatApp;
