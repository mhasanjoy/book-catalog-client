import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLazyGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import { useEffect } from "react";

const Books = () => {
  const [getBooks, { data, isLoading }] = useLazyGetBooksQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const options = {
      search: target.search.value,
    };

    getBooks(options);
  };

  useEffect(() => {
    getBooks({ search: "" });
  }, [getBooks]);

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <h1 className="text-center mt-10 font-semibold text-xl">List of all books</h1>

      <div>
        <form onSubmit={handleSubmit} className="flex justify-end">
          <Input
            id="search"
            type="text"
            autoCapitalize="none"
            autoComplete="search"
            autoCorrect="off"
            disabled={isLoading}
            className="w-1/5"
            placeholder="Search by title, author or genre"
          />
          <Button disabled={isLoading}>Search</Button>
        </form>
      </div>

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
