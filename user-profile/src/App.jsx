import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  
  const API_URL = 'http://assessmentapi.bistrainer.com/rest';
  const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';
  // State management to store user data
  const [users, setUsers] = useState([])

  // State management for Create User
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  // State management for pagination

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; 

  // State management for Edit User
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  // State management for modal status
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);


  // Function for edit modal
  const openEditModal = (user) => {
    setEditUser(user);
    setEditModal(true);
  };

  // Function to fecth users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      });console.log(response.data.data.users)
      setUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //Fetch User
  useEffect(()=>{
  fetchUsers();
  },[])


  // Delete User
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/user?userID=${id}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    })
    .then((response) => {
      console.log('User deleted:', response.data);
      setUsers(users.filter(user => user.id !== id));
      setStatusMessage('User deleted successfully!');
      setStatusType('success');
      setShowStatusModal(true);
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      setStatusMessage('Error deleting user!');
      setStatusType('error');
      setShowStatusModal(true);
    }); 
  };

  // Add User

  const handleCreate = () => {
    axios.post(`${API_URL}/api/user`, newUser, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setShowModal(false);
      setNewUser({
        firstName: '',
        lastName: '',
        username: '',
        email: ''
      });
      setStatusMessage('User created successfully!');
      setStatusType('success');
      setShowStatusModal(true);
    fetchUsers();
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      setStatusMessage('Error creating user!');
      setStatusType('error');
      setShowStatusModal(true);
    });
  };

  // Edit User
  const handleUpdate = (id) => {
    axios.patch(`${API_URL}/api/user?userID=${editUser.id}`, editUser, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setEditModal(false);
      setEditUser({
        id:'',
        firstName: '',
        lastName: '',
        username: '',
        email: ''
      });
      setStatusMessage('User updated successfully!');
      setStatusType('success');
      setShowStatusModal(true);
      fetchUsers();
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      setStatusMessage('Error updating user');
      setStatusType('error');
    });
  }

  useEffect(() => {
    if (showStatusModal) {
      const timer = setTimeout(() => setShowStatusModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showStatusModal]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);


  return (
    <>
      <div>
        <h1 className="my-3">User Profile</h1>
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
        

        <tbody className="bg-white">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button onClick={() => setShowModal(true)} className="bg-blue-300">Add User</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-300 mx-4">Delete</button>
                <button onClick={() => openEditModal(user)} className="bg-yellow-300">Edit</button>
                
              </td>
              
            </tr>
          ))}
        </tbody>
        </table>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Add User</h2>
              <input type="text" placeholder="First Name" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
              <input type="text" placeholder="Last Name" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
              <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
              <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              <button onClick={handleCreate}>Create User</button>
            </div>
          </div>
        )}

        {editModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEditModal(false)}>&times;</span>
              <h2>Edit User</h2>
              <input type="text" placeholder="First Name" value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} />
              <input type="text" placeholder="Last Name" value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} />
              <input type="text" placeholder="Username" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
              <input type="email" placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              <button onClick={handleUpdate}>Update User</button>
            </div>
          </div>
        )}

        {showStatusModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowStatusModal(false)}>&times;</span>
              <p className={statusType === 'success' ? 'text-green-600' : 'text-red-600'}>
                {statusMessage}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        

       
      </div>
    </>
  )
}

export default App
