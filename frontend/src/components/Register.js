import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  // Importing the Register CSS

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="register-container h-[80.5vh] w-full py-5 text-gray-800 px-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className='flex flex-col gap-4 items-center justify-center ' onSubmit={handleSubmit}>
        <div>
        
          <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100' 
            type="email"
            placeholder='Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
         
          <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100' 
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className='p-4  rounded-md outline-none bg-gray-700 text-white' type="submit">Register</button>
      </form>
      <p className="text-gray-600 text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
      </p>
    </div>
  );
};

export default Register;
