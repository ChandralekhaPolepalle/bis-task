import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  
  const API_URL = 'http://assessmentapi.bistrainer.com/rest';
  const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';

  const [users, setUsers] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/api/user`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    })
    .then((response) => {
      console.log(response.data.data.users)
      setUsers(response.data.data.users)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  },[])

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/user?userID=${id}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    })
    .then((response) => {
      console.log('User deleted:', response.data);
      setUsers(users.filter(user => user.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
  };



  return (
    <>
      <div>
        <h1 className="text-blue-300">User Profile</h1>
        <table className="bg-white border border-gray-300 border-gray-300 shadow-md rounded-lg ">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
        </table>

        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(user.id)} className="bg-red-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

       
      </div>
    </>
  )
}

export default App
