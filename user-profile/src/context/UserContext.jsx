import React,{ createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const API_URL = 'http://assessmentapi.bistrainer.com/rest';
const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
      });
      setUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Create User
  const handleCreate = () => {
    axios.post(`${API_URL}/api/user`, newUser, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setShowModal(false);
      setNewUser({ firstName: '', lastName: '', username: '', email: '' });
      setStatusMessage('User created successfully!');
      setStatusType('success');
      setShowStatusModal(true);
      fetchUsers();
    })
    .catch(() => {
      setStatusMessage('Error creating user!');
      setStatusType('error');
      setShowStatusModal(true);
    });
  };

  // Delete User
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/user?userID=${id}`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
      setStatusMessage('User deleted successfully!');
      setStatusType('success');
      setShowStatusModal(true);
    })
    .catch(() => {
      setStatusMessage('Error deleting user!');
      setStatusType('error');
      setShowStatusModal(true);
    });
  };

  // Edit User
  const handleUpdate = () => {
    axios.patch(`${API_URL}/api/user?userID=${editUser.id}`, editUser, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setEditModal(false);
      setEditUser({ id: '', firstName: '', lastName: '', username: '', email: '' });
      setStatusMessage('User updated successfully!');
      setStatusType('success');
      setShowStatusModal(true);
      fetchUsers();
    })
    .catch(() => {
      setStatusMessage('Error updating user');
      setStatusType('error');
      setShowStatusModal(true);
    });
  };

  useEffect(() => {
    if (showStatusModal) {
      const timer = setTimeout(() => setShowStatusModal(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showStatusModal]);

  return (
    <UserContext.Provider
      value={{
        users,
        showModal,
        setShowModal,
        newUser,
        setNewUser,
        handleCreate,
        handleDelete,
        editModal,
        setEditModal,
        editUser,
        setEditUser,
        handleUpdate,
        statusMessage,
        statusType,
        showStatusModal,
        setShowStatusModal,
        currentPage,
        setCurrentPage,
        usersPerPage
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
