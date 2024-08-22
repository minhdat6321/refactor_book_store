import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addingBookFavorite, getBookDetail } from "../components/features/bookDetailPage/slice";


const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const { loading, book } = useSelector(state => state.bookdetailpage)

  const [addingBook, setAddingBook] = useState("");

  const params = useParams();
  const bookId = params.id;

  const addToReadingList = (book) => {
    setAddingBook(book);
  };
  const dispatch = useDispatch()

  useEffect(() => {

    if (!addingBook) return;
    dispatch(addingBookFavorite({ addingBook }))

  }, [addingBook, dispatch]);

  useEffect(() => {
    dispatch(getBookDetail({ bookId }))
  }, [bookId, dispatch]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid container spacing={2} p={4} mt={5} sx={{ border: "1px solid black" }}>
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button variant="outlined" sx={{ width: "fit-content" }} onClick={() => addToReadingList(book)}>
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )
      }
    </Container >
  );
};

export default BookDetailPage;
