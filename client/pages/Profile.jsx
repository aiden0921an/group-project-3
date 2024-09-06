
//We will want this to be hidden unless the user is logged in, we could also just have it reroute to the login if we can't get that working

export default function Profile(){

    return (
      <>
        <h1>Private Page</h1>
        <p>This is an example of a page that would require an authenticated user.</p>
      </>
    )
  }