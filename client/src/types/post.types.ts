export type Post = {
  id: string;
  text: string;
  username: string;
  updatedAt?: string;
  createdAt: string;
};

export type NewPost = {
  text: string;
  username: string;
};
