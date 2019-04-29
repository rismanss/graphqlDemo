import types from "./types";
export default `
  type Query {
    users: [User!]!
    user(id: ID!): User! 
    tasks: [Task!]!
  }
`;