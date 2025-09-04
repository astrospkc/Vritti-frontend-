"use client";
import axios from "axios";
import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts: posts }),
  // fetch all posts:
  fetchAllPosts: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/fetchAllPosts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      set({ loading: false, posts: data });
      console.log("data obtained in posts: ", data);

      return data;
    } catch (error) {
      console.log("some error occurred while fetching posts");
      set({ loading: false, error: error });
    }
  },

  updatePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/editPost/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = await res.json();
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
        loading: false,
      }));
      return updatedPost;
    } catch (error) {
      console.log("some error occurred while updating post");
      set({ loading: false, error: error });
    }
  },
  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/deletePost/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      set((state) => ({}));
    } catch (error) {
      console.log("some error occurred while deleting post");
      set({ loading: false, error: error });
    }
  },
  createPost: async (post) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/createPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(post),
        }
      );
      console.log("at this spot reached: ");
      const createdpost = await res.json();

      console.log("created post: ", createdpost);
      set((state) => ({
        loading: false,
        posts: [...state.posts, createdpost],
      }));
      return createdpost;
    } catch (error) {
      console.log("some error occurred while creating post");
      set({ loading: false, error: error });
    }
  },
}));

const useBookmarkStore = create((set) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks: bookmarks }),
  fetchAllBookmarks: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookmark/fetchAllBookmarkedPost`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("data: ", data);
      set({ loading: false, bookmarks: data });
      return data;
    } catch (error) {
      console.log("some error occurred while getting bookmarked posts");
      set({ loading: false, error: error });
      throw new Error("fetch failed in bookmarks");
    }
  },
  bookmarkPost: async (post_id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookmark/bookmarkPost?postId=${post_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", res);
      const data = await res.json();
      console.log("bookmark data: ", data);
      set({
        loading: false,
        bookmarks: data,
      });
      return data;
    } catch (error) {
      console.log("failed while adding post");
      set({ loading: false, error: error });
      throw new Error("fetch failed in bookmarks");
    }
  },
  unbookmarkPost: async (post_id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/bookmark/unbookmarkPost?postId=${post_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("bookmark data: ", data);
      set({
        loading: false,
        bookmarks: data,
      });
      return data;
    } catch (error) {
      console.log("failed while removing bookmark");
      set({ loading: false, error: error });
      throw new Error("faild removing bookmark");
    }
  },
}));

export { usePostStore, useBookmarkStore };
