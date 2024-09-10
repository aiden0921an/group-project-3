
import { Link } from 'react-router-dom';

export default function HomeButton({to,children}) {
  return <Link to= {to} ><button>{children}</button></Link>;
}