import { Link } from 'react-router-dom';

export default function SuccessBtn({to,children}) {
  return <Link to= {to} ><button>{children}</button></Link>;
}


{/* <ButtonLink to="/some-page">Go to Some Page!</ButtonLink> */}