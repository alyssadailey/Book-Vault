import { useMutation, useQuery } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Book } from '../models/Book.js';
import Auth from '../utils/auth';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

interface SavedBookData {
  me: {
    _id: string;
    username: string;
    email: string;
    savedBooks: Book[];
  };
}

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  const userData = data?.me || { savedBooks: [], username: '' };

  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await removeBookMutation({
        variables: { bookId },
        update(cache, { data }) {
          const removedBook = data?.removeBook; // Ensure to access removeBook from mutation result
          if (removedBook) {
          const existingData = cache.readQuery<SavedBookData>({ query: GET_ME });
          const updatedBooks = existingData?.me.savedBooks.filter(
            (book: Book) => book.bookId !== bookId
          ) || [];
          cache.writeQuery({
            query: GET_ME,
            data: { me: { ...existingData?.me, savedBooks: updatedBooks } },
          });
        }
        },
      });

      // Optionally refetch user data if needed
      // await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:` 
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: Book) => {
            return (
              <Col md='4' key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors?.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;