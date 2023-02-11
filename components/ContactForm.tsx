'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [returnMessage, setReturnMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    console.log(formData);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Name, email, and message fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const body = await JSON.stringify(formData);
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      if (!data.error) setReturnMessage(data.message);
      if (data.error) setErrorMessage(data.error.code);
    } catch (error) {
      setErrorMessage('There was a problem connecting to the API');
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <div>
      <p>
        You can use this form to send me a message: <br />
      </p>
      {isLoading ? (
        <h2>Sending...</h2>
      ) : returnMessage ? (
        <h2>{returnMessage}</h2>
      ) : errorMessage ? (
        <div style={{ color: 'red' }}>
          <h2>{errorMessage} - Please try again later.</h2>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name *'
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <input
              type='email'
              name='email'
              placeholder='Email *'
              value={formData.email}
              onChange={handleInputChange}
              required
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              title='Email@examle.com'
              disabled={isLoading}
            />
            <input
              type='tel'
              name='phone'
              placeholder='Phone'
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <textarea
              name='message'
              placeholder='Message *'
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <button type='submit' disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </>
      )}
      <i style={{ color: 'grey' }}>
        I try and respond to messages within a day or two...
      </i>{' '}
      🙈
    </div>
  );
};

export default ContactForm;
