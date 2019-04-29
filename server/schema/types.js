export default `
  type User {
    id: ID!
    name: String!
    location: String!
    email: String!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    userId: ID!
    user: User!
  }
`;