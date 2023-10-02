import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const { toast } = useToast();

  return (
    <>
      <h1>Home</h1>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
};

export default Home;
