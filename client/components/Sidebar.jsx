import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAppCtx } from '../utils/AppProvider';

export default function Sidebar() {
  const { user } = useAppCtx();

  return (
    <Container className="sidebar d-flex flex-column justify-content-between">
      <Button variant="secondary" className="w-100">Saved Items</Button>

      <Nav className="w-100">
        <NavDropdown title="Categories" id="categories-dropdown">
          <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
          <NavDropdown.Item href="#clothing">Clothing</NavDropdown.Item>
          <NavDropdown.Item href="#furniture">Furniture</NavDropdown.Item>
          <NavDropdown.Item href="#toys">Toys</NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <Button variant="success" className="w-100">Post Item For Sale</Button>
    </Container>
  );
}