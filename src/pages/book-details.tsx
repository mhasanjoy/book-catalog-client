import BookReview from "@/components/BookReview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteBookMutation, useGetSingleBookQuery } from "@/redux/features/book/bookApi";
import { useAddWishlistMutation, useGetBookStatusQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const [deleteBook, { isLoading: isDeleteLoading }] = useDeleteBookMutation();
  const { toast } = useToast();
  const [addWishlist] = useAddWishlistMutation();
  const { data: status } = useGetBookStatusQuery({ email: user.email, bookId: id });

  const navigate = useNavigate();
  const handleEdit = (book: IBook) => {
    navigate(`/books/${book._id}/edit-book`);
  };

  const handleDelete = (book: IBook) => {
    deleteBook(book._id)
      .unwrap()
      .then(() => {
        navigate("/");
        toast({
          variant: "default",
          description: "Book deleted successfully!",
        });
      })
      .catch((error) =>
        toast({
          variant: "destructive",
          description: error.error,
        })
      );
  };

  const statusList = ["Reading", "Completed", "Plan to Read"];
  const handleWishlist = async (event: string) => {
    const options = {
      email: user.email,
      data: {
        book: id,
        status: event,
      },
    };

    addWishlist(options)
      .unwrap()
      .then(() => {
        toast({
          variant: "default",
          description: "Status updated successfully!",
        });
      })
      .catch((error) =>
        toast({
          variant: "destructive",
          description: error.error,
        })
      );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] px-20">
        <p className="font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <div className="flex justify-center pt-10">
        <Card className="min-w-[350px]">
          <CardHeader className="text-center">
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Title: {data?.title}</p>
            <p>Author: {data?.author}</p>
            <p>Genre: {data?.genre}</p>
            <p>Publication Date: {data?.publicationDate}</p>

            <div className="flex items-center my-2">
              <p className="mr-4">Status: </p>
              <Select onValueChange={(event) => handleWishlist(event)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={status || `Add to List`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusList.map((status, index) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleEdit(data)} disabled={user.email !== data?.user}>
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isDeleteLoading || user.email !== data?.user}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete information about this book.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(data)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>

      <BookReview id={id!} />
    </div>
  );
};

export default BookDetails;
