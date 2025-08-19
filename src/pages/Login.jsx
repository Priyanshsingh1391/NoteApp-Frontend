import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'


const Login = () => {
 const navigate = useNavigate();
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useAuth()

    const handleSubmit = async (e) =>{
      e.preventDefault()
      try{
        const response = await axios.post("http://localhost:3000/api/auth/login",{ email, password})
        console.log(response);
         if(response.data.success){
          login(response.data.user)
        localStorage.setItem("token", response.data.token)
        navigate('/')
      }
      }
     
      catch(err){

      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
               onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
               onChange={(e)=> setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
         <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
