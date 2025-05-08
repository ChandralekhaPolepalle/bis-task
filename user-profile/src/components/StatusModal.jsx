import React from 'react';

function StatusModal({ message, type, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p className={type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default StatusModal;
