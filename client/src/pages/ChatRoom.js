import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
//import messages list

import { GET_CHATROOM_MESSAGES } from "../utils/queries";
import { POST_MESSAGE_TO_CHATROOM } from "../utils/mutations";

import Auth from "../utils/auth";

export default function ChatRoom(props) {
  const scrollElement = useRef();
  const bottomTarget = useRef();
  const [canScrollDown, setCanScrollDown] = useState(true);
  // const [limit, setLimit] = useState(10);
  const [roomId] = useState(props.roomId);

  const currentUser = Auth.getUser().data.username;
  const { loading, data, startPolling } = useQuery(GET_CHATROOM_MESSAGES, {
    variables: { roomId },
  });
  const executeScroll = () => {
    bottomTarget.current.scrollIntoView();
    setCanScrollDown(false);
  };
  useEffect(() => {
    startPolling(300);
    executeScroll();
  }, []);
  useEffect(() => {
    if (!canScrollDown) {
      executeScroll();
    }
  });

  const chatRooms = data?.chatMessages || [];

  function parseLinkInText(text) {
    let validLink = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+"
    );
    if (validLink.test(text)) {
      let linkMatches = text.match(validLink);
      let beforeAndAfterLink = text.split(linkMatches[0]);
      return (
        <span>
          {beforeAndAfterLink[0]}
          <a href={linkMatches[0]}>{linkMatches[0]}</a>
          {parseLinkInText(beforeAndAfterLink[1])}
        </span>
      );
    } else {
      return <span>{text}</span>;
    }
  }

  function chatListItems(messages, userMatch) {
    if (loading) {
      return <p>loading...</p>;
    } else {
      return messages?.map((message) => {
        if (message.username === userMatch) {
          return (
            <li key={message._id}>
              <div>
                {parseLinkInText(message.messageText)} |
                <span>{message.username}</span>
              </div>
            </li>
          );
        } else {
          return (
            <li key={message._id}>
              <div>
                <span>{message.username}</span>|{" "}
                {parseLinkInText(message.messageText)}
              </div>
            </li>
          );
        }
      });
    }
  }
  return (
    <div>
      <h1>{props.name}</h1>
      <div ref={scrollElement}>
        <ul>{chatListItems(chatRooms.messages, currentUser)}</ul>
        <div ref={bottomTarget}></div>
      </div>
      {canScrollDown ? (
        <button onClick={executeScroll}>scroll to bottom</button>
      ) : (
        <div></div>
      )}
      <MessageEditor roomId={props.roomId} />
    </div>
  );
}

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
    <form id="form" action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        id="input"
        autoComplete="off"
      />
      <button>send</button>
    </form>
  );
}
