import { gql } from "@apollo/client";
export const SUBSCRIBE_TO_CHATROOM = gql`
  subscription Subscription($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      _id
    }
  }
`;
