import type { Post } from '@/types/post.types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_API_URL as string;

export const getAllPosts = async () => {
  const response = await axios.get(API_URL + '/posts');

  const data = response.data.posts as Post[];

  return data;
};

export const getPost = async (id: string) => {
  const response = await axios.get(API_URL + '/posts/' + id);

  const data = response.data.post as Post;

  return data;
};

export const updatePost = async (
  id: string,
  post: { text: string; username: string }
) => {
  const response = await axios.put(API_URL + '/posts/update/' + id, post);

  const data = response.data.post as Post;

  return data;
};
