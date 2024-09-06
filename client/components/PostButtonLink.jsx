//This will be used for having the sidebar buttons working as links


import { Link } from 'react-router-dom';

export default function PostButtonLink({to,children}) {
  return <Link to= {to} ><button>{children}</button></Link>;
}


{/* <ButtonLink to="/some-page">Go to Some Page!</ButtonLink> */}