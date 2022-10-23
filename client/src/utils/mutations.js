import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        _id
        username
      }
    }
  }
`;

export const POST_MESSAGE_TO_CHATROOM = gql`
  mutation Mutation($roomId: ID!, $messageText: String!) {
    addMessageToChat(roomId: $roomId, messageText: $messageText) {
      _id
    }
  }
`;

export const CREATE_CHATROOM = gql`
  mutation Mutation($roomName: String!) {
    createRoom(roomName: $roomName) {
      _id
      roomName
    }
  }
`;
