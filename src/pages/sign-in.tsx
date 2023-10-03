import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="min-w-[30%]">
        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
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
          />
        </div>
        <Button disabled={isLoading} className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
