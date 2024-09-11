import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAppCtx } from "../utils/AppProvider";
import logo from "../src/vite.svg";

export default function Header() {
  const { user } = useAppCtx();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Meta Mart" style={{ height: "40px" }} />
          Meta Mart
        </Navbar.Brand>
        <div className="d-flex justify-content-center flex-grow-1">
          <form
            className="d-flex input-group"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              style={{
                padding: ".5rem 1rem",
                fontSize: "0.9rem",
              }}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?._id !== undefined && (
              <Nav.Link href="/private">My Shopping Cart</Nav.Link>
            )}

            <Nav className="me-auto">
              {user?._id !== undefined && (
                <Nav.Link href="/profile">Profile</Nav.Link>
              )}
              {/* We'll need to link this differently when we decide how we're doing the cart */}

              {user?._id !== undefined ? (
                <Nav.Link href="/logout">Logout</Nav.Link>
              ) : (
                <Nav.Link href="/auth">Login</Nav.Link>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
