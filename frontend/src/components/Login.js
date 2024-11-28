import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
  // Importing the Login CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');  // Redirect to dashboard or other protected page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container h-[80.5vh] w-full py-5 text-gray-800 px-10">
      <h2 className="text-2xl   font-bold mb-4">Login</h2>
      <form className='flex flex-col gap-4 items-center justify-center ' onSubmit={handleSubmit}>
        <div>
          <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
            type="password"
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className='p-4  rounded-md outline-none bg-gray-700 text-white' type="submit">Login</button>
      </form>
      <p className="text-gray-600 text-center mt-4">
        Don't have an account? <Link className="text-blue-500 hover:text-blue-700" to={'/registration'}>Register</Link>
        {/*<a href="/register">Register</a>*/}
      </p>
      
    </div>
  );
};

export default Login;
