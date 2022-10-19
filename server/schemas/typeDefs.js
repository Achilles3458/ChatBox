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

type Query {
    users: [User]!
    user:(userId: ID!): User
    mainUser: User
}
`;

module.exports = typeDefs;
