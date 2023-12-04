import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLazyGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [getBooks, { data, isLoading }] = useLazyGetBooksQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const options: Record<string, unknown> = {};

    if (target.search.value) {
      options["search"] = target.search.value;
    }
    if (genre) {
      options["genre"] = genre;
    }
    if (publicationYear) {
      options["publicationYear"] = publicationYear;
    }

    getBooks(options);
  };

  useEffect(() => {
    getBooks({});
  }, [getBooks]);

  const navigate = useNavigate();

  const handleClick = (book: IBook) => {
    navigate(`/books/${book._id}`);
  };

  const [genre, setGenre] = useState("");
  const genreList = ["Biography", "Autobiography", "Memoir", "Personal finance", "Non-fiction", "Self-help book"];

  const [publicationYear, setPublicationYear] = useState("");
  const publicationYearList: string[] = [];
  for (let i = 1995; i <= new Date().getFullYear(); i++) {
    publicationYearList.push(i.toString());
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] px-20">
      <h1 className="text-center pt-10 font-semibold text-xl">List of all books</h1>

      <div>
        <form onSubmit={handleSubmit} className="flex justify-end">
          <Select onValueChange={(event) => setGenre(event)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genreList.map((genre, index) => (
                  <SelectItem key={index} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(event) => setPublicationYear(event)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a publication year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {publicationYearList.map((publicationYear, index) => (
                  <SelectItem key={index} value={publicationYear}>
                    {publicationYear}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

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
            <TableRow key={book._id} onClick={() => handleClick(book)}>
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
