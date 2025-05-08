import React, { useState } from 'react';
import EditUserModal from '../components/EditUserModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://assessmentapi.bistrainer.com/rest';
const BEARER_TOKEN = 'E4B82B4D-0F17-872E-93D4CBE8A0B26982';

function EditUserPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [editUser, setEditUser] = useState(state || {});
  const navigate = useNavigate();

  const handleUpdate = () => {
    axios.patch(`${API_URL}/api/user?userID=${id}`, editUser, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then(() => navigate('/'));
  };

  return (
    <EditUserModal
      editUser={editUser}
      setEditUser={setEditUser}
      onClose={() => navigate('/')}
      onUpdate={handleUpdate}
    />
  );
}

export default EditUserPage;
