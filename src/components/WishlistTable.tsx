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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IWishlist } from "@/pages/wishlist";
import { useRemoveBookFromWishlistMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useToast } from "./ui/use-toast";

interface IProps {
  wishlist: IWishlist[];
}

const WishlistTable = (props: IProps) => {
  const [removeBookFromWishlist, { isLoading }] = useRemoveBookFromWishlistMutation();
  const { toast } = useToast();
  const { email } = useAppSelector((state) => state.user.user);

  const handleRemove = (book: IBook) => {
    removeBookFromWishlist({ email, bookId: book._id })
      .unwrap()
      .then(() => {
        toast({
          variant: "default",
          description: "Book status removed successfully!",
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
    <>
      {!!props.wishlist.length && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.wishlist.map((list) => (
              <TableRow key={list.book._id}>
                <TableCell className="font-medium">{list.book.title}</TableCell>
                <TableCell>{list.book.author}</TableCell>
                <TableCell>{list.book.genre}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={isLoading}>Remove</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently remove status information about this
                          book.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemove(list.book)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default WishlistTable;
