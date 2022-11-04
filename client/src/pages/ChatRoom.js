import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_CHATROOM } from "../utils/queries";
import { POST_MESSAGE_TO_CHATROOM } from "../utils/mutations";
import { GET_CHATROOM_MESSAGES } from "../utils/queries";
import auth from "../utils/auth";
const socket = io.connect("http://localhost:3001");

const ChatRoom = (props) => {
  const { roomId } = useParams();
  const { loading } = useQuery(GET_SINGLE_CHATROOM, {
    variables: { roomId: roomId },
  });

  function MessageList() {
    const currentUser = auth.getUser().data.username;
    const { loading, data, startPolling } = useQuery(GET_CHATROOM_MESSAGES, {
      variables: { roomId },
    });

    useEffect(() => {
      startPolling(300);
    }, []);

    const chatMessages = data?.chatRoomMessages.messages || [];

    if (loading) {
      return <p>loading...</p>;
    } else {
      return chatMessages?.map((message) => {
        if (message.username === currentUser) {
          return (
            <li
              className="list-group-item bg-chat d-flex flex-row-reverse mt-3 rounded"
              key={message._id}
            >
              <div className="text-light">{message.messageText}</div>
            </li>
          );
        } else {
          return (
            <li
              className="list-group-item bg-chat mt-3 rounded"
              key={message._id}
            >
              <div>
                <span className="rounded p-1 bg-user text-dark">
                  {message.username}
                </span>
                <div className="mt-1 text-light">{message.messageText}</div>
              </div>
            </li>
          );
        }
      });
    }
  }

  //Message posting function
  function MessageEditor(props) {
    const [post] = useMutation(POST_MESSAGE_TO_CHATROOM);
    const [value, setValue] = useState("");
    const roomId = props.roomId;
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
      <ul className="list-group mb-5 pb-5">
        <MessageList />
      </ul>
      <MessageEditor roomId={roomId} />
    </div>
  );
};

export default ChatRoom;
