import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../addAndEditBook.css';
import { Base_Url } from '../router/config';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // בדיקת שדות ריקים
    if (!title || !author || !description) {
      setError('Please fill in all fields.');
      return;
    }

    axios.post(`${Base_Url}/api/books`, { title, author, description })
      .then(() => {
        setError(''); // נקה את הודעת השגיאה במקרה של הצלחה
        navigate('/');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      {error && <div className="error-message">{error}</div>} {/* הצגת הודעת שגיאה */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Book</button>
        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddBook;
