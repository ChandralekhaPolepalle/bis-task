import React from 'react';

function UserTable({ users, onAdd, onDelete, onEdit }) {
  return (
    <table className="bg-white border border-gray-300 shadow-md rounded-lg w-full mt-4">
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
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.firstName}</td>
            <td className="border px-4 py-2">{user.lastName}</td>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">
              
              <button onClick={() => onDelete(user.id)} className="bg-red-300 w-15 mx-4">Delete</button>
              <button onClick={() => onEdit(user)} className="bg-yellow-300 w-15">Edit</button>
            </td>
          </tr>
        ))}
        <tr className="border px-4 py-2">
        <button onClick={onAdd} className="bg-blue-300 w-25">Create User</button>
        </tr>
      </tbody>
      
    </table>
  );
}

export default UserTable;
