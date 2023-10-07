import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { user, isLoading, isError, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    dispatch(
      loginUser({
        email: target.email.value,
        password: target.password.value,
      })
    );

    if (user.email) {
      navigate(-1);
      toast({
        description: "User signed in successfully!",
      });
    } else if (isError) {
      toast({
        description: error,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="min-w-[30%]">
        <div className="flex flex-col space-y-2 text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your email below</p>
        </div>

        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            disabled={isLoading}
            required
          />
        </div>
        <Button disabled={isLoading} className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Sign In
        </Button>

        <p className="px-8 text-center text-sm text-muted-foreground mt-6">
          By clicking continue, you agree to our{" "}
          <Link to="/service-terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default SignIn;
