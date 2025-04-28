// src/app/contact/page.tsx
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  email: string;
  description: string;
  body: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSending(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('API response status:', response.status);

      if (response.ok) {
        setMessage('Message sent successfully!');
        reset();
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
        setMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Contact Me</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="mt-1 w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/80">
              Subject
            </label>
            <input
              id="description"
              type="text"
              {...register('description', { required: 'Subject is required' })}
              className="mt-1 w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Brief subject"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-white/80">
              Message
            </label>
            <textarea
              id="body"
              {...register('body', { required: 'Message is required' })}
              rows={15}
              className="mt-1 w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
              placeholder="Your message here..."
            />
            {errors.body && <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSending}
              className={`min-w-[120px] px-6 py-2 text-xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${isSending ? 'animate-pulse' : ''}`}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
        <div className="min-h-[28px] mt-4 text-center">
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}