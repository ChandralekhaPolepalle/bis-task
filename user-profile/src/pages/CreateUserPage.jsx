import React, { useState } from 'react';
import CreateUserModal from '../components/CreateUserModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://assessmentapi.bistrainer.com/rest';
const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';

function CreateUserPage() {
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', username: '', email: '' });
  const navigate = useNavigate();

  const handleCreate = () => {
    axios.post(`${API_URL}/api/user`, newUser, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then(() => navigate('/'));
  };

  return (
    <CreateUserModal
      newUser={newUser}
      setNewUser={setNewUser}
      onClose={() => navigate('/')}
      onCreate={handleCreate}
    />
  );
}

export default CreateUserPage;
