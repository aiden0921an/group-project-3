import React from "react";
import { useSharedContext } from "../components/Bookmark";
import Card from "../components/Card";

export default function SavedPage() {
  const { bookmarkedItems } = useSharedContext();

  return (
    <div>
      <h1>Recently Saved</h1>
      <p>These are your recently saved items</p>
      <div className="posts-container">
        {bookmarkedItems.length > 0 ? (
          bookmarkedItems.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <p>No items saved yet.</p>
        )}
      </div>
    </div>
  );
}
