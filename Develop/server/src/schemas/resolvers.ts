import  User  from '../models/User.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'apollo-server-express';

const resolvers = {
    //This resolver handles the me query. checks if the user is logged in and returns the user data.
    Query: {
        me: async (
            _parent: any, _args: any, context: any) => {
          if (!context.user) throw new AuthenticationError('Not logged in');
          return User.findById(context.user._id);
        },
},

Mutation: {
    //checks the login credentials and returns a token and user data if successful.
     login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('No user found');

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect credentials');

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    //creates a new user and returns a token and user data like login
    addUser: async (_parent: any, { username, email, password }: any) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      },


      //checks if the user is logged in still and saves a book to the user's savedBooks array only if it isn't already saved.
    saveBook: async (_parent: any, { bookData }: any, context: any) => {
      console.log('input', bookData);
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findByIdAndUpdate(
        context.user._id,
        {
          $addToSet: { savedBooks: bookData },
        },
        { new: true }
      );
    },


    //checks if the user is logged in and removes a book from the user's savedBooks array by it's id
    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findByIdAndUpdate(
        context.user._id,
        {
          $pull: { savedBooks: { bookId } },
        },
        { new: true }
      );
    },
  },
};


export default resolvers;