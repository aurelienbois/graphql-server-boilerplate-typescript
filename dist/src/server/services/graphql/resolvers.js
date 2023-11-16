"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts = [
    {
        id: 1,
        text: "Lorem ipsum",
        user: {
            avatar: "/uploads/avatar1.png",
            username: "Test User",
        },
    },
    {
        id: 2,
        text: "Lorem ipsum",
        user: {
            avatar: "/uploads/avatar2.png",
            username: "Test User 2",
        },
    },
];
const resolvers = {
    RootQuery: {
        posts(root, args, context) {
            return posts;
        },
    },
};
exports.default = resolvers;
