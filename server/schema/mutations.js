import types from "./types";
export default `
  type Mutation {
    addUser(userName: String, location: String, email: String): [User!]
    updateUser(userId: ID!, userName: String, location: String, email: String): User!
    deleteUser(userId: ID!): [User!]
    addTask(userId: ID!, title: String, description: String): [Task!]
  }
`;