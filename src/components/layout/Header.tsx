import { auth } from "@/lib/firebase";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        toast({
          description: "User signed out successfully!",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error,
        });
      });
  };

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

          {user.email ? (
            <>
              <li>
                <Button variant="link" asChild>
                  <Link to="/add-new-book">Add New Book</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
