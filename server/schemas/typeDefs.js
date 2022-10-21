const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Message {
    _id: ID
    messageText: String
    createdAt: Date
    username: String
}

type ChatRoom {
    _id: ID
    roomName: String
    createdAt: Date
    members: [User]
    messages: [Message]
}

type Query {
    users: [User]!
    user:(userId: ID!): User
    mainUser: User
    chatRooms: [ChatRoom]
    chatRoom (roomId: ID!): ChatRoom
}

type Mutation{
    addUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): User
    createRoom(roomName: String!): ChatRoom
    addMessageToChat(roomId: ID!, messageText: String!): ChatRoom
    addChatMember(roomId: ID!, userId: ID!)
}
`;

module.exports = typeDefs;
