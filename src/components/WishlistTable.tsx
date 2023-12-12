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
import { TableCell, TableRow } from "@/components/ui/table";
import { IWishlist } from "@/pages/wishlist";
import { useRemoveBookFromWishlistMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useToast } from "./ui/use-toast";

interface IProps {
  wishlist: IWishlist;
}

const WishlistTable = ({ wishlist }: IProps) => {
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
      <TableRow>
        <TableCell className="font-medium">{wishlist.book.title}</TableCell>
        <TableCell>{wishlist.book.author}</TableCell>
        <TableCell>{wishlist.book.genre}</TableCell>
        <TableCell>{wishlist.status}</TableCell>
        <TableCell className="text-right">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isLoading}>Remove</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove status information about this book.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleRemove(wishlist.book)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WishlistTable;
