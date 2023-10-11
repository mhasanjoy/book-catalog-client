import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddNewBookMutation } from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";

const AddNewBook = () => {
  const { user } = useAppSelector((state) => state.user);

  const [addNewBook, { isLoading }] = useAddNewBookMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      author: { value: string };
      genre: { value: string };
      publicationDate: { value: string };
    };

    const options: { data: IBook } = {
      data: {
        title: target.title.value,
        author: target.author.value,
        genre: target.genre.value,
        publicationDate: target.publicationDate.value,
        user: user.email!,
      },
    };

    addNewBook(options);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] flex justify-center items-center ">
        <form onSubmit={handleSubmit} className="min-w-[30%] my-10">
          <div className="flex flex-col space-y-2 text-center mb-10">
            <h1 className="text-2xl font-semibold tracking-tight">Add New Book</h1>
            <p className="text-sm text-muted-foreground">Enter book information to add a new book</p>
          </div>

          <div className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
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
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading} className="w-full">
            Add New Book
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddNewBook;
