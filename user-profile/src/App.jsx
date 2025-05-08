import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';
import UserTable from './components/UserTable';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import StatusModal from './components/StatusModal';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const {
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
  } = useContext(UserContext);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const openEditModal = (user) => {
    setEditUser(user);
    setEditModal(true);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserTable
        users={currentUsers}
        onAdd={() => setShowModal(true)}
        onDelete={handleDelete}
        onEdit={openEditModal}
      />
      {showModal && (
        <CreateUserModal
          newUser={newUser}
          setNewUser={setNewUser}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
      {editModal && (
        <EditUserModal
          editUser={editUser}
          setEditUser={setEditUser}
          onClose={() => setEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
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

export default App;
