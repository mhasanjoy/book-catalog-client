import WishlistTable from "@/components/WishlistTable";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetWishlistQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";

export interface IWishlist {
  book: IBook;
  status: string;
}

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetWishlistQuery(user.email);

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <h1 className="text-center pt-10 font-semibold text-xl">Statistics</h1>

      <Table className="my-10">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.wishlist?.map((list: IWishlist) => (
            <WishlistTable key={list.book._id} wishlist={list} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Wishlist;
