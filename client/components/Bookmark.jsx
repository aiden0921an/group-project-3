import { createContext, useContext, useState, useEffect } from "react";

const sharedContext = createContext();

export const useSharedContext = () => useContext(sharedContext);

const LocalStorageKey = "bookmarkedPosts";

export const ShareProvider = ({ children }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem(LocalStorageKey));
    return Array.isArray(storedBookmarks) ? storedBookmarks : [];
  });

  const addBookmark = (post) => {
    const updatedBookmarks = [...bookmarkedItems, post];
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem(LocalStorageKey, JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (postId) => {
    const updatedBookmarks = bookmarkedItems.filter(
      (post) => post._id !== postId
    );
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem(LocalStorageKey, JSON.stringify(updatedBookmarks));
  };

  const clearBookmarks = () => {
    localStorage.removeItem(LocalStorageKey);
    setBookmarkedItems([]);
  };

  return (
    <sharedContext.Provider
      value={{ bookmarkedItems, addBookmark, removeBookmark, clearBookmarks }}
    >
      {children}
    </sharedContext.Provider>
  );
};
