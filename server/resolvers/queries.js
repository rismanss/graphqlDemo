export default {
  users: (parent, args, { db }, info) => {
    return db.User.findAll();
  },

  user: (parent, { id }, { db }, info) => {    
    return db.User.findById(id);    
  }, 

  tasks: (parent, args, { db }, info) => {
    return db.Task.findAll();
  }
};