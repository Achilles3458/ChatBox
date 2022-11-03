import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_CHATROOM } from "../utils/queries";
import { POST_MESSAGE_TO_CHATROOM } from "../utils/mutations";
import { GET_CHATROOM_MESSAGES } from "../utils/queries";
import auth from "../utils/auth";

const ChatRoom = () => {
  const { roomId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_CHATROOM, {
    variables: { roomId: roomId },
  });
  const chatRoom = data?.chatRoom || {};

  function MessageList() {
    const currentUser = auth.getUser().data.username;
    const { loading, data, startPolling } = useQuery(GET_CHATROOM_MESSAGES, {
      variables: { roomId },
    });

    const chatMessages = data?.chatRoomMessages.messages || [];

    if (loading) {
      return <p>loading...</p>;
    } else {
      return chatMessages?.map((message) => {
        if (message.username === currentUser) {
          return (
            <li key={message._id}>
              <div>{message.messageText}</div>
            </li>
          );
        } else {
          return (
            <li key={message._id}>
              <div>
                <span>{message.username}</span>
                <div>{message.messageText}</div>
              </div>
            </li>
          );
        }
      });
    }
  }

  //Message posting function
  function MessageEditor() {
    const [post] = useMutation(POST_MESSAGE_TO_CHATROOM);
    const [value, setValue] = useState("");
    function handleChange(e) {
      setValue(e.target.value);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      await send(value);
      setValue("");
    }
    async function send(messageText) {
      await post({ variables: { roomId, messageText } });
    }

    return (
      <div className="p-3 bg-main fixed-bottom">
        <form
          id="form"
          action=""
          className="input-group"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control"
            type="text"
            value={value}
            onChange={handleChange}
            id="input"
            autoComplete="off"
          />
          <button className="bg-darkMain btn btn-outline-dark text-light">
            send
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        <MessageList />
      </ul>
      <MessageEditor />
    </div>
  );
};

export default ChatRoom;
