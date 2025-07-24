"use client";
import { createContext, useState } from "react";
export const PostInteractionContext = createContext(false);

export const PostInteractionProvider = ({ children }) => {
  const [bookmark_arr, setBookmark_arr] = useState([]);
  // const [liked_Arr, setLiked_Arr] = useState([]);

  return (
    <PostInteractionContext.Provider value={{ bookmark_arr, setBookmark_arr }}>
      {children}
    </PostInteractionContext.Provider>
  );
};
