import React, { useState } from 'react';
import { User } from '@app/services/users/users-provider';

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<User, 'id'>>) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [typeUser, setTypeUser] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [typeDocument, setTypeDocument] = useState<string | undefined>(undefined);
  const [documentNumber, setDocumentNumber] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<User, 'id'>> = {};
    if (typeUser !== undefined) updatedData.type_user = typeUser;
    if (firstName !== undefined) updatedData.first_name = firstName;
    if (lastName !== undefined) updatedData.last_name = lastName;
    if (username !== undefined) updatedData.username = username;
    if (typeDocument !== undefined) updatedData.type_document = typeDocument;
    if (documentNumber !== undefined) updatedData.document_number = parseInt(documentNumber, 10);
    if (email !== undefined) updatedData.email = email;
    if (isActive !== undefined) updatedData.is_active = isActive;

    onSave(updatedData);
  };

  if (!user) return null;  // No renderizar si no hay usuario

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="typeUser">Type User</label>
                <select
                  className="form-control"
                  id="typeUser"
                  value={typeUser ?? user.type_user}
                  onChange={e => setTypeUser(e.target.value)}
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="RECTOR">Rector</option>
                  <option value="DIRECTOR">Director</option>
                  <option value="SYSTEM_CHIEF">Jefe de Sistemas</option>
                  <option value="TEACHER">Docente</option>
                  <option value="STUDENT">Estudiante</option>
                  <option value="TUTOR">Acudiente</option>
                  <option value="INSTITUTION_STAFF">Otro</option>
                  <option value="COORDINATOR">Coordinador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName ?? user.first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName ?? user.last_name}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username ?? user.username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="typeDocument">Type Document</label>
                <select
                  className="form-control"
                  id="typeDocument"
                  value={typeDocument! ?? user.type_document}
                  onChange={e => setTypeDocument(e.target.value)}
                >
                  <option value="CC">Cedula de Ciudadania</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="PS">Pasaporte</option>
                  <option value="NA">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="documentNumber">Document Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="documentNumber"
                  value={documentNumber ?? user.document_number?.toString()}
                  onChange={e => setDocumentNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email ?? user.email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isActive">Is Active</label>
                <input
                  type="checkbox"
                  className="form-control"
                  id="isActive"
                  checked={isActive ?? user.is_active}
                  onChange={e => setIsActive(e.target.checked)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
