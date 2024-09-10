import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useAppCtx } from "../utils/AppProvider";
import "../App.css";
import PostButtonLink from "./PostButtonLink";
import SavedPage from "./SavedPageButton"
import AboutButtonLink from "./AboutButton";

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
          <NavDropdown.Item href="#toys">Toys & Games</NavDropdown.Item>
          <NavDropdown.Item href="#furniture">Furniture</NavDropdown.Item>
          <NavDropdown.Item href="#automotive">Automotive</NavDropdown.Item>
          <NavDropdown.Item href="#books">Books</NavDropdown.Item>
          <NavDropdown.Item href="#toys">Real Estate</NavDropdown.Item>
          <NavDropdown.Item href="#misc">Misc.</NavDropdown.Item>
        </NavDropdown>
      </Nav>

        <PostButtonLink to="/post">Post for Sale Here</PostButtonLink>
        <SavedPage to="/saved">Saved Items</SavedPage>
        <AboutButtonLink to="about">About Us</AboutButtonLink>
      {/* <Button variant="success">Post Item For Sale</Button> */}
    </Container>
  );
}
