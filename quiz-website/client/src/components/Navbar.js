import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">SocialAttackSecure</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/revision">Revision</Link>
      </div>
    </nav>
  );
};

export default Navbar;
