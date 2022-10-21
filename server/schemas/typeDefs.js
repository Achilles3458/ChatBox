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
`;

module.exports = typeDefs;
