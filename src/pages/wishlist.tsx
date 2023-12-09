import WishlistTable from "@/components/WishlistTable";
import { useGetWishlistQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useEffect, useState } from "react";

export interface IWishlist {
  book: IBook;
  status: string;
}

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetWishlistQuery(user.email);

  const [readingList, setReadingList] = useState<IWishlist[]>([]);
  const [completedList, setCompletedList] = useState<IWishlist[]>([]);
  const [planToReadList, setPlanToReadList] = useState<IWishlist[]>([]);

  useEffect(() => {
    data?.wishlist.forEach((list: IWishlist) => {
      if (list.status === "Reading") {
        const isExists = readingList.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          setReadingList([...readingList, list]);
        }
      } else if (list.status === "Completed") {
        const isExists = completedList.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          setCompletedList([...completedList, list]);
        }
      } else if (list.status === "Plan to Read") {
        const isExists = planToReadList.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          setPlanToReadList([...planToReadList, list]);
        }
      }
    });
  }, [data]);

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <h1 className="text-center pt-10 font-semibold text-xl">Statistics</h1>

      <section className="mt-10">
        <p className="font-semibold mb-4">Reading: {readingList.length}</p>
        {<WishlistTable wishlist={readingList} />}
      </section>

      <section className="mt-10">
        <p className="font-semibold mb-4">Completed: {completedList.length}</p>
        {<WishlistTable wishlist={completedList} />}
      </section>

      <section className="mt-10">
        <p className="font-semibold mb-4">Plan to Read: {planToReadList.length}</p>
        {<WishlistTable wishlist={planToReadList} />}
      </section>
    </div>
  );
};

export default Wishlist;
