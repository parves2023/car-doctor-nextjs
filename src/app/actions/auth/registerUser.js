'use server';

import dbConnect, { collectionNameObj } from '@/lib/dbConnect';

export const registerUser = async (payload) => {
  const { email, password } = payload;

  try {
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format.');
    }

    // Validate password length
    if (typeof password !== 'string' || password.length < 5) {
      throw new Error('Password must be at least 5 characters long.');
    }

    // Connect to the database
    const userCollection = dbConnect(collectionNameObj.userCollection);

    // Check if a user with the same email already exists
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // If the user does not exist, insert the new user
    const result = await userCollection.insertOne(payload);

    return { success: true, message: 'User registered successfully!', result };
  } catch (error) {
    console.error('Error during registration:', error.message);
    return { success: false, message: error.message };
  }
};
