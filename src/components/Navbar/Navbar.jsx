import "./Navbar.css";
import { useInfoContext } from "../../context/Context";

const Navbar = () => {
  const { exit, searchTerm, setSearchTerm } = useInfoContext();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand navLogo" href="/">Abduqodir Gallery</a>
          <form className="d-flex w-100" role="search">
            <input type="text" className="form-control me-2 w-100" placeholder='Search' name='name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            <button className="nav-link btn px-2 mx-2 bg-danger" onClick={exit} aria-current="page">Logout</button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;