import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../addAndEditBook.css';
import { Base_Url } from '../router/config';

const EditBook = () => {
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${Base_Url}/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${Base_Url}/api/books/${id}`, book)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating book:', error));
  };

  const handleCancel = () => {
    navigate('/'); // חזרה לדף הראשי
  };

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
        </label>
        <label>
          Author:
          <input type="text" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
        </label>
        <label>
          Description:
          <textarea value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} />
        </label>
        <button type="submit">Update Book</button>
        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button> {/* כפתור החזרה */}
      </form>
    </div>
  );
};

export default EditBook;
