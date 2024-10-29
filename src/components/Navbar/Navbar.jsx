import "./Navbar.css";
import { useInfoContext } from "../../context/Context";
import logout from '../../img/log out.png';

const Navbar = () => {
  const { exit, searchTerm, setSearchTerm } = useInfoContext();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand navLogo" href="/">Abduqodir Gallery</a>
          <form className="d-flex w-100" role="search">
            <input type="text" className="form-control me-2 w-100" placeholder='Search' name='name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className="nav-link btn px-2 mx-2 bg-danger" onClick={exit} aria-current="page"><img className="btnIcons" src={logout} alt="logOut" /></button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;