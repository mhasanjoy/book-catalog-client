import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";

const Books = () => {
  const { data } = useGetBooksQuery(undefined);

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <h1 className="text-center mt-10 font-semibold text-xl">List of all books</h1>
      <Table className="my-10">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className="text-right">Publication Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((book: IBook) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell className="text-right">{book.publicationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Books;
