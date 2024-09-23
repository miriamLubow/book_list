import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // הוספת SweetAlert2
import '../bookList.css'; // ודא שהCSS מעודכן
import { Base_Url } from '../router/config';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    axios.get(`${Base_Url}/api/books`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const toggleDescription = (id) => {
    setExpandedBook(expandedBook === id ? null : id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${Base_Url}/api/books/${id}`)
          .then(() => {
            setBooks(books.filter(book => book.id !== id));
            Swal.fire(
              'Deleted!',
              'Your book has been deleted.',
              'success'
            );
          })
          .catch(error => console.error('Error deleting book:', error));
      }
    });
  };

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      <Link to="/add">
        <button className="add-book-button">Add New Book</button>
      </Link>
      <table className="my-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button className="toggle-description-button" onClick={() => toggleDescription(book.id)}>
                  {expandedBook === book.id ? 'Hide Description' : 'Show Description'}
                </button>
                {expandedBook === book.id && <p className="book-description">{book.description}</p>}
              </td>
              <td>
                <button className="edit-button">
                  <Link style={{ color: 'white' }} to={`/edit/${book.id}`}>Edit</Link>
                </button>
                <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
