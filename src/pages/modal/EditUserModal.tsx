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

  const handleSave = () => {
    const updatedData: Partial<Omit<User, 'id'>> = {};
    if (typeUser !== undefined) updatedData.type_user = typeUser;
    if (firstName !== undefined) updatedData.first_name = firstName;
    if (lastName !== undefined) updatedData.last_name = lastName;
    if (username !== undefined) updatedData.username = username;
    if (typeDocument !== undefined) updatedData.type_document = typeDocument;
    if (documentNumber !== undefined) updatedData.document_number = parseInt(documentNumber, 10);
    if (email !== undefined) updatedData.email = email;

    onSave(updatedData);
  };

  if (!user) return null;  // No renderizar si no hay usuario

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="typeUser">Tipo de usuario</label>
                <select
                  className="form-control"
                  id="typeUser"
                  value={typeUser ?? user.type_user}
                  onChange={e => setTypeUser(e.target.value)}
                >
                  <option key="0" value="0">Administrador</option>
                  <option key="1" value="1">Rector</option>
                  <option key="2" value="2">Director</option>
                  <option key="3" value="3">Jefe de Sistemas</option>
                  <option key="4" value="4">Docente</option>
                  <option key="5" value="5">Estudiante</option>
                  <option key="6" value="6">Acudiente</option>
                  <option key="7" value="7">Otro</option>
                  <option key="8" value="8">Coordinador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName ?? user.first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellidos</label>
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
                <label htmlFor="typeDocument">Tipo de documento</label>
                <select
                  className="form-control"
                  id="typeDocument"
                  value={typeDocument! ?? user.type_document}
                  onChange={e => setTypeDocument(e.target.value)}
                >
                  <option value="0">Cedula de Ciudadania</option>
                  <option value="1">Tarjeta de Identidad</option>
                  <option value="2">Pasaporte</option>
                  <option value="4">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="documentNumber">Numero de documento</label>
                <input
                  type="text"
                  className="form-control"
                  id="documentNumber"
                  value={documentNumber ?? user.document_number?.toString()}
                  onChange={e => setDocumentNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email ?? user.email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
