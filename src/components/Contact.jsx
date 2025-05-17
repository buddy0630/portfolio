// src/pages/Contact.jsx
import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  useEffect(() => {
    emailjs.init('G3fXwHURMFoH3pvB8');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_k32bscq', 'template_gm55v6i', formRef.current)
      .then(() => {
        setStatus('success');
        formRef.current.reset();
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section className="py-24 px-4 flex justify-center">
      <div className="w-full max-w-lg bg-gray-900/50 rounded-lg p-8 backdrop-blur-md">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Contact Me</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-white">Name:</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Email:</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your email..."
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Message:</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 rounded-full font-semibold text-white hover:bg-opacity-80 transition ease-fluid"
          >
            Send
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-center text-green-400">Your message has been sent!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-center text-red-400">Oops! Something went wrong.</p>
        )}
      </div>
    </section>
  );
}