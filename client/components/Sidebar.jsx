import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useAppCtx } from "../utils/AppProvider";
import "../Sidebar.css";
import PostButtonLink from "./PostButtonLink";
import SavedPage from "./SavedPageButton"

export default function Sidebar() {
  const { user } = useAppCtx();

  return (
    <Container className="sidebar d-flex flex-column p-3">
      {/* <Button variant="secondary" className="mb-3">
        Saved Items
      </Button> */}

      <Nav className="mb-3">
        <NavDropdown
          title="Categories"
          id="categories-dropdown"
          className="dropdown-button"
        >
          <NavDropdown.Item href="#electronics">Electronics</NavDropdown.Item>
          <NavDropdown.Item href="#clothing">Clothing</NavDropdown.Item>
          <NavDropdown.Item href="#furniture">Furniture</NavDropdown.Item>
          <NavDropdown.Item href="#toys">Toys</NavDropdown.Item>
        </NavDropdown>
      </Nav>

        <PostButtonLink to="/post">Post for Sale Here</PostButtonLink>
        <SavedPage to="/saved">Saved Items</SavedPage>
      {/* <Button variant="success">Post Item For Sale</Button> */}
    </Container>
  );
}
