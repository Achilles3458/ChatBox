import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_CHATROOMS = gql`
  query Rooms {
    chatRooms {
      _id
      roomName
    }
  }
`;

export const GET_CHATROOM_MESSAGES = gql`
  query ChatRoomMessages($roomId: ID!) {
    chatRoomMessages(roomId: $roomId) {
      messages {
        messageText
        username
        createdAt
        _id
      }
    }
  }
`;

export const GET_MAINUSER = gql`
  query MainUser {
    mainUser {
      _id
      user
      email
    }
  }
`;
