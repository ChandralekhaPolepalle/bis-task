import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import StatusModal from '../components/StatusModal';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://assessmentapi.bistrainer.com/rest';
const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/user`, {
      headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
    }).then(res => setUsers(res.data.data.users));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/api/user?userID=${id}`, {
      headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
    }).then(() => {
      setUsers(users.filter(user => user.id !== id));
      setStatusMessage('User deleted successfully!');
      setStatusType('success');
      setShowStatusModal(true);
    }).catch(() => {
      setStatusMessage('Error deleting user!');
      setStatusType('error');
      setShowStatusModal(true);
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <h1>User Profile</h1>
      <UserTable
        users={currentUsers}
        onAdd={() => navigate('/create')}
        onDelete={handleDelete}
        onEdit={(user) => navigate(`/edit/${user.id}`, { state: user })}
      />
      {showStatusModal && (
        <StatusModal
          message={statusMessage}
          type={statusType}
          onClose={() => setShowStatusModal(false)}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default UserListPage;
