


// import {createContext, useContext, useState, useEffect} from "react"
// export const sharedContext= () => useContext(sharedContext)



// //Bookmarks will initially be saved to and pulled from local storage
//  export const ShareProvider = ({children}) => {
//   const [bookmarkedItems, setBookmarkedItems] = useState (() => {
//     const storedBookmarks = JSON.parse(localStorage.getItem(LocalStorageKey));
//     return Array.isArray(storedBookmarks) ? storedBookmarks : []
//   })
// // }

// const addBookmark = (post) => {
//   setBookmarkedItems ((prevBookmarks) => [...prevBookmarks, post]);
// }

// useEffect(() => {
//   try {
//     const storedBookmarks= JSON.parse(localStorage.getItem(LocalStorageKey));
//     if (Array.isArray(storedBookmarks)) {
//       setBookmarkedItems(storedBookmarks)
//     }
//   } catch (err) {
//     console.log("Error getting bookmarks", err)
//   }
// }, [])

// const clearBookmarks= () => {
//   localStorage.removeItem(LocalStorageKey);
//   setBookmarkedItems([]);
// }

// const removeBookmark = (postSlug) => {
//   setBookmarkedItems((prevBookmarks) =>
//     prevBookmarks.filter((post) => post.slug !== postSlug)
//   );
// }

// return (
//   <sharedContext.Provider 
//   value ={{bookmarkedItems, addBookmark, removeBookmark, clearBookmarks}}
//   >
//     {children}
//   </sharedContext.Provider>
// )
//  }

// We will want this page to reroute to the login if the user is not logged in
export default function SavedPage(){

    return (
      <>
        <h1>Recently Saved</h1>
        <p>These are our recently saved items</p>
      </>
    )
  }
