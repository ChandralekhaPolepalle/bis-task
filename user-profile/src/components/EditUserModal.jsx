import React from 'react';

function EditUserModal({ editUser, setEditUser, onClose, onUpdate }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit User</h2>
        <br></br>
        <input type="text" placeholder="First Name" value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name" value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} />
        <input type="text" placeholder="Username" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
        <input type="email" placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
        <br></br>
        <button onClick={onUpdate} className="bg-blue-300 w-25">Update User</button>
      </div>
    </div>
  );
}

export default EditUserModal;
