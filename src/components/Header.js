import { Nav, Container, Navbar, NavDropdown, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
// import CarouselSlider from "./CarouselSlider";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));
  const loguot = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <div>
      {" "}
      <div className="header">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">KidsShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="contaner-fluid">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>

                  <div className="left">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item"></li>
                      <li className="text-white">
                        <div>+996509000000</div>
                        <div>+996509000000</div>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="register"
                        >
                          <FaUser />
                          {user.email.substring(0, user.email.length - 10)}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/orders">
                          Orders
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={loguot}>
                          Logout
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                          <FaCartPlus /> {cartItems.length}
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <li>
                            <Link className="dropdown-item" to="#">
                              Action
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="#">
                              Another action
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="#">
                              Something else here
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
{/* //Slider */}
      </div>
    </div>
  );
};

export default Header;

{
  /* <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
  <Link className="navbar-brand text-black" to="/">
    KidsSho
  </Link>
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNavDropdown"
    aria-controls="navbarNavDropdown"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon">
      {<FaBars size={30} color="white" />}
    </span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">

      </li>
      <li className="text-white">
        <div>+996509000000</div>
        <div>+996509000000</div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link active"
          aria-current="page"
          to="register"
        >
          <FaUser /> {user.email.substring(0, user.email.length - 10)}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/orders">
          Orders
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={loguot}>
          Logout
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          <FaCartPlus /> {cartItems.length}
        </Link>
      </li>
      <li className="nav-item dropdown">
        <ul
          className="dropdown-menu"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <Link className="dropdown-item" to="#">
              Action
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Another action
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Something else here
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</nav> */
}
