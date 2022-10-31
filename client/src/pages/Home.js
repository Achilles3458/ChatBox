import React from "react";
import { useQuery } from "@apollo/client";
//import chatroom list component
import ChatRoomList from "../components/ChatRoomList";

import { GET_ALL_CHATROOMS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_ALL_CHATROOMS);
  const chatrooms = data?.chatRooms || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ChatRoomList chatrooms={chatrooms} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
