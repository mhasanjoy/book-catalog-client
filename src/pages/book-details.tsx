import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSingleBookQuery } from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/types";
import { IBook } from "@/types/book";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(id);

  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const handleEdit = (book: IBook) => {
    navigate(`/books/${book._id}/edit-book`);
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
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Title: {data.title}</p>
            <p>Author: {data.author}</p>
            <p>Genre: {data.genre}</p>
            <p>Publication Date: {data.publicationDate}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleEdit(data)} disabled={user.email !== data.user}>
              Edit
            </Button>
            <Button>Delete</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookDetails;