import moment from 'moment';

export default {
  addUser: (parent, args, { db }, info) => {
    return db.User.create({
      name: args.userName,
      location: args.location,
      email: args.email,
      createdAt: moment().format("YYYY-MM-DD"),
      updatedAt: moment().format("YYYY-MM-DD")
    }).then(newCat => {
      return db.User.findAll();
    });
  },

  updateUser: (parent, args, { db }, info) => {
    return db.User.update({
      name: args.userName,
      location: args.location,
      email: args.email,
      updatedAt: moment().format("YYYY-MM-DD")
    }, {where: {id: args.userId}}).then(() => {
      return db.User.findById(args.userId);
    })
  },

  deleteUser: (parent, args, { db }, info) => {
    return db.User.destroy({where: {id: args.userId}}).then((res) => {
      return db.User.findAll();
    })
  },

  addTask: (parent, args, { db }, info) => {
    return db.Task.create({
      title: args.title,
      description: args.description,
      createdAt: moment().format("YYYY-MM-DD"),
      updatedAt: moment().format("YYYY-MM-DD"),
      userId: args.userId
    }).then(newCat => {
      return db.Task.findAll();
    });
  },
};