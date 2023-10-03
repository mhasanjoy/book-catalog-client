import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <nav className="w-full h-16 bg-slate-400">
      <div className="h-full flex items-center justify-end px-20">
        <ul className="flex items-center">
          <li>
            <Button variant="link" asChild>
              <Link to="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/all-books">All Books</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
