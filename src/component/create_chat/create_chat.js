import React from "react";
import "./create_chat.css";

const Create_Chat = ({ createNewChat }) => {


  // nieuwe chats bekijken
  return (
    <div className="text-center">
      <button className="btn btn-secondary" onClick={() => createNewChat()}>
        Create new chat
      </button>
    </div>
  );
};

export default Create_Chat;
