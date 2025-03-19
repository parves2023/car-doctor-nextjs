// app/register/page.jsx
import React from 'react';
import RegisterForm from './components/RegisterFrom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}