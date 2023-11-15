interface User {
  avatar: string;
  username: string;
}

interface Post {
  id: number;
  text: string;
  user: User;
}

const posts: Post[] = [
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
    posts(root: any, args: any, context: any): Post[] {
      return posts;
    },
  },
};

export default resolvers
