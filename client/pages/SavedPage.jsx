


import {createContext, useContext, useState, useEffect} from "react"
const sharedContext= () => useContext(sharedContext)



//Bookmarks will initially be saved to and pulled from local storage
export const ShareProvider = ({children}) => {
  const [bookmarkedItems, setBookmarkedItems] = useState (() => {
    const storedBookmarks = JSON.parse(localStorage.getItem(LocalStorageKey));
    return Array.isArray(storedBookmarks) ? storedBookmarks : []
  })
}

const addBookmark = (post) => {
  setBookmarkedItems ((prevBookmarks) => [...prevBookmarks, post]);
}




//We will want this page to reroute to the login if the user is not logged in
export default function SavedPage(){

    return (
      <>
        <h1>Recently Saved</h1>
        <p>These are our recently saved items</p>
      </>
    )
  }
  