import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAddReviewMutation, useGetReviewQuery } from "@/redux/features/book/bookApi";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface IProps {
  id: string;
}

const BookReview = ({ id }: IProps) => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { toast } = useToast();
  const { data } = useGetReviewQuery(id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      review: { value: string };
    };

    const options = {
      id,
      data: {
        review: target.review.value,
      },
    };

    addReview(options)
      .unwrap()
      .then(() => {
        toast({
          variant: "default",
          description: "Review added successfully!",
        });
        target.review.value = "";
      })
      .catch((error) =>
        toast({
          variant: "destructive",
          description: error.error,
        })
      );
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          placeholder="Type your message here."
          id="review"
          autoCapitalize="none"
          autoComplete="review"
          autoCorrect="off"
          disabled={isLoading}
          required
        />
        <Button disabled={isLoading}>Submit</Button>
      </form>
      <div className="mt-10">
        {data?.reviews?.map((review: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReview;
