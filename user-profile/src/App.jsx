import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;




// import React,{ useEffect, useState } from 'react'
// import axios from 'axios'
// import UserTable from './components/UserTable';
// import CreateUserModal from './components/CreateUserModal';
// import EditUserModal from './components/EditUserModal';
// import StatusModal from './components/StatusModal';
// import Pagination from './components/Pagination';
// import './App.css'

// function App() {
  
//   const API_URL = 'http://assessmentapi.bistrainer.com/rest';
//   const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';
//   // State management to store user data
//   const [users, setUsers] = useState([])

//   // State management for Create User
//   const [showModal, setShowModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: ''
//   });

//   // State management for pagination

//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10; 

//   // State management for Edit User
//   const [editModal, setEditModal] = useState(false);
//   const [editUser, setEditUser] = useState({
//     id: '',
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: ''
//   });

//   // State management for modal status
//   const [statusMessage, setStatusMessage] = useState('');
//   const [statusType, setStatusType] = useState('');
//   const [showStatusModal, setShowStatusModal] = useState(false);


//   // Function for edit modal
//   const openEditModal = (user) => {
//     setEditUser(user);
//     setEditModal(true);
//   };

//   // Function to fecth users from API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/user`, {
//         headers: {
//           'Authorization': `Bearer ${BEARER_TOKEN}`
//         }
//       });console.log(response.data.data.users)
//       setUsers(response.data.data.users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   //Fetch User
//   useEffect(()=>{
//   fetchUsers();
//   },[])


//   // Delete User
//   const handleDelete = (id) => {
//     axios.delete(`${API_URL}/api/user?userID=${id}`, {
//       headers: {
//         'Authorization': `Bearer ${BEARER_TOKEN}`
//       }
//     })
//     .then((response) => {
//       console.log('User deleted:', response.data);
//       setUsers(users.filter(user => user.id !== id));
//       setStatusMessage('User deleted successfully!');
//       setStatusType('success');
//       setShowStatusModal(true);
//     })
//     .catch((error) => {
//       console.error('Error deleting user:', error);
//       setStatusMessage('Error deleting user!');
//       setStatusType('error');
//       setShowStatusModal(true);
//     }); 
//   };

//   // Add User

//   const handleCreate = () => {
//     axios.post(`${API_URL}/api/user`, newUser, {
//       headers: {
//         'Authorization': `Bearer ${BEARER_TOKEN}`,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(() => {
//       setShowModal(false);
//       setNewUser({
//         firstName: '',
//         lastName: '',
//         username: '',
//         email: ''
//       });
//       setStatusMessage('User created successfully!');
//       setStatusType('success');
//       setShowStatusModal(true);
//     fetchUsers();
//     })
//     .catch((error) => {
//       console.error('Error creating user:', error);
//       setStatusMessage('Error creating user!');
//       setStatusType('error');
//       setShowStatusModal(true);
//     });
//   };

//   // Edit User
//   const handleUpdate = (id) => {
//     axios.patch(`${API_URL}/api/user?userID=${editUser.id}`, editUser, {
//       headers: {
//         'Authorization': `Bearer ${BEARER_TOKEN}`,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(() => {
//       setEditModal(false);
//       setEditUser({
//         id:'',
//         firstName: '',
//         lastName: '',
//         username: '',
//         email: ''
//       });
//       setStatusMessage('User updated successfully!');
//       setStatusType('success');
//       setShowStatusModal(true);
//       fetchUsers();
//     })
//     .catch((error) => {
//       console.error('Error updating user:', error);
//       setStatusMessage('Error updating user');
//       setStatusType('error');
//     });
//   }

//   useEffect(() => {
//     if (showStatusModal) {
//       const timer = setTimeout(() => setShowStatusModal(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [showStatusModal]);

 

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(users.length / usersPerPage);


//   return (
//     <div>
//       <h1>User Profile</h1>
//       <UserTable
//         users={currentUsers}
//         onAdd={() => setShowModal(true)}
//         onDelete={handleDelete}
//         onEdit={openEditModal}
//       />
//       {showModal && (
//         <CreateUserModal
//           newUser={newUser}
//           setNewUser={setNewUser}
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreate}
//         />
//       )}
//       {editModal && (
//         <EditUserModal
//           editUser={editUser}
//           setEditUser={setEditUser}
//           onClose={() => setEditModal(false)}
//           onUpdate={handleUpdate}
//         />
//       )}
//       {showStatusModal && (
//         <StatusModal
//           message={statusMessage}
//           type={statusType}
//           onClose={() => setShowStatusModal(false)}
//         />
//       )}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//   )
// }

// export default App;
