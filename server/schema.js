import { users } from './data.js';
import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(source, args) {
                return users.find((user) => user.id === args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return users;
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: new GraphQLList(UserType),
            args: {
                input: {
                    type: UserInputType,
                },
            },
            resolve(source, args) {
                users.push(args.input);
                return users;
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query,
    mutation,
});
