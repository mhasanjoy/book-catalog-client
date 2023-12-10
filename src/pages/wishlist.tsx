import WishlistTable from "@/components/WishlistTable";
import { useGetWishlistQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useEffect, useRef, useState } from "react";

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

  const read = useRef<IWishlist[]>([]);
  const complete = useRef<IWishlist[]>([]);
  const plan = useRef<IWishlist[]>([]);

  useEffect(() => {
    data?.wishlist.forEach((list: IWishlist) => {
      if (list.status === "Reading") {
        const isExists = read.current.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          read.current = [...read.current, list];
          setReadingList(read.current);
        }
      } else if (list.status === "Completed") {
        const isExists = complete.current.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          complete.current = [...complete.current, list];
          setCompletedList(complete.current);
        }
      } else if (list.status === "Plan to Read") {
        const isExists = plan.current.find((bookList) => bookList.book._id === list.book._id);

        if (!isExists) {
          plan.current = [...plan.current, list];
          setPlanToReadList(plan.current);
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
