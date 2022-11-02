import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { GET_SINGLE_CHATROOM } from "../utils/queries";

const ChatRoom = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_CHATROOM, {
    variables: { roomId: roomId },
  });

  const chatRoom = data?.chatRoom || {};

  console.log(chatRoom);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{chatRoom.roomName}</h2>
    </div>
  );
};

export default ChatRoom;
