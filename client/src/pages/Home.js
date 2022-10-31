import React from "react";
import { useQuery } from "@apollo/client";
//import chatroom list component

import { GET_ALL_CHATROOMS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_ALL_CHATROOMS);
  const chatrooms = data?.chatrooms || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h1>Home Page</h1>
              <div>{chatrooms}</div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
