import queries from "./queries";
import mutations from './mutations';
export default {
  User: {
    tasks: (parent, args, context, info) => parent.getTasks(),
  },
  Task: {
    user: (parent, args, context, info) => parent.getUser(),
  },
  Query: queries,
  Mutation: mutations,
};