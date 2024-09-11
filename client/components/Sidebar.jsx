import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useAppCtx } from "../utils/AppProvider";
import "../App.css";
import PostButtonLink from "./PostButtonLink";
import SavedPage from "./SavedPageButton"
import AboutButtonLink from "./AboutButton";
import { Link } from "react-router-dom";

function formatCategoryName(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function Sidebar() {
  const { user } = useAppCtx();

  return (
    <Container className="sidebar d-flex flex-column p-3">
    <Nav className="mb-3">
        <NavDropdown title="Categories" id="categories-dropdown" className="dropdown-button">
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Electronics")}`}>Electronics</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Clothing")}`}>Clothing</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Furniture")}`}>Furniture</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Toys & Games")}`}>Toys & Games</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Automotive")}`}>Automotive</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Books")}`}>Books</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Real Estate")}`}>Real Estate</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/category/${formatCategoryName("Misc")}`}>Misc.</NavDropdown.Item>
        </NavDropdown>
      </Nav>

        <PostButtonLink to="/post">Post for Sale Here</PostButtonLink>
        <SavedPage to="/saved">Saved Items</SavedPage>
        <AboutButtonLink to="about">About Us</AboutButtonLink>
      {/* <Button variant="success">Post Item For Sale</Button> */}
    </Container>
  );
}
