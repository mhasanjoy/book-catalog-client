import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useGetSingleBookQuery, useUpdateBookInformationMutation } from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/types";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);

  const [updateBookInformation, { isLoading }] = useUpdateBookInformationMutation();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      author: { value: string };
      genre: { value: string };
      publicationDate: { value: string };
    };

    const options = {
      id,
      data: {
        title: target.title.value,
        author: target.author.value,
        genre: target.genre.value,
        publicationDate: target.publicationDate.value,
      },
    };

    updateBookInformation(options)
      .unwrap()
      .then(() => {
        toast({
          variant: "default",
          description: "Book updated successfully!",
        });
      })
      .catch((error) =>
        toast({
          variant: "destructive",
          description: error.error,
        })
      );
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center items-center ">
      <form className="min-w-[30%] my-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">Edit Book</h1>
          <p className="text-sm text-muted-foreground">Enter book information to edit book</p>
        </div>

        <div className="mb-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            autoCapitalize="none"
            autoComplete="title"
            autoCorrect="off"
            defaultValue={data.title}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            autoCapitalize="none"
            autoComplete="author"
            defaultValue={data.author}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            type="text"
            autoCapitalize="none"
            autoComplete="genre"
            defaultValue={data.genre}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="publicationDate">Publication Date</Label>
          <Input
            id="publicationDate"
            type="text"
            autoCapitalize="none"
            autoComplete="publicationDate"
            defaultValue={data.publicationDate}
            disabled={isLoading}
            required
          />
        </div>
        <Button className="w-full" disabled={isLoading || user.email !== data.user}>
          Edit Book
        </Button>
      </form>
    </div>
  );
};

export default EditBook;
