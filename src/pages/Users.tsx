import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { createUser, deleteUser, detailUser, fetchUsers, updateUser, User, UsersResponse } from '@app/services/users/users-provider';
import axios from 'axios';
import { headers, baseUrl } from '@app/utils/apiConfig';
import EditUserModal from './modal/EditUserModal';
import './ModalStyles.css';
import AddUsersModal from './modal/AddUsersModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';  // Importamos jsPDF
import html2canvas from 'html2canvas'; // Importamos html2canvas


const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await fetchUsers();
    setUsers(response.data.results);
    setNextPage(response.data.next);
    setPreviousPage(response.data.previous);
  };

  const handleNextPage = async () => {
    if (nextPage) {
      const response = await axios.get<UsersResponse>(nextPage, { headers });
      setUsers(response.data.data.results);
      setNextPage(response.data.data.next);
      setPreviousPage(response.data.data.previous);
    }
  };

  const handlePreviousPage = async () => {
    if (previousPage) {
      const response = await axios.get<UsersResponse>(previousPage, { headers });
      setUsers(response.data.data.results);
      setNextPage(response.data.data.next);
      setPreviousPage(response.data.data.previous);
    }
  };

  const handleEditInit = async (id: number) => {
    const detailResponse = await detailUser(id);
    setEditingUser(detailResponse.data);
    setIsEditing(true);
  };

  const handleEditSubmit = async (updatedData: Partial<Omit<User, 'id'>>) => {
    if (!editingUser) return;
    const updatedUser = await updateUser(editingUser.id, updatedData);
    await loadUsers();
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    await loadUsers();
  };

  const handleAddNew = () => {
    setIsAdding(true);
  };

  const handleAddSubmit = async (user: Partial<any>): Promise<void> => {
    try {
      if (user.type_user === 4) { // Tipo de usuario 'Docente'
        await axios.post(`${baseUrl}teacher/create/`, user, { headers });
      } else {
        await createUser(user);
      }
      await loadUsers();
      setIsAdding(false);
    } catch (error) {
      console.log('Error adding user', error);
    }
  };

  // fuction to export document pdf
  const exportPDF = () => {
    console.log("Export PDF function called"); // Log para depurar si la función se está ejecutando
    const input = document.getElementById('user-table');
    if (input) {
      html2canvas(input, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save("usuarios-lista.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error("No se encontró el elemento con id 'user-table'");
    }
  };

  return (
    <div>
      {/* Contenedor Principal que podría volverse borroso */}
      <div className={(isEditing || isAdding) ? "blur-background" : ""}>
        <ContentHeader title="Usuarios" />
        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="p-0">
                  <h3 className="card-title">Lista de Usuarios</h3>
                </div>
                <div className="ml-auto">
                  <button className="btn btn-danger" style={{ marginRight: '7px' }} onClick={exportPDF}>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </button>
                  <button className="btn btn-success" onClick={handleAddNew}>
                    Agregar
                  </button>
                </div>
              </div>
              <div className="card-body" id="user-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Username</th>
                      <th>Tipo de Documento</th>
                      <th># de documento</th>
                      <th>Correo</th>
                      <th>Tipo Usuario</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{`${user.first_name} ${user.last_name}`}</td>
                        <td>{user.username}</td>
                        <td>{user.type_document}</td>
                        <td>{user.document_number}</td>
                        <td>{user.email}</td>
                        <td>{user.type_user}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEditInit(user.id)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(user.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={!previousPage}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={handleNextPage}
                    disabled={!nextPage}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
              <div className="card-footer">Total: {users.length}</div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal que no se ve afectado por el desenfoque */}
      {isEditing && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => {
            setIsEditing(false);
            // Remueve el desenfoque si necesitas ajustar el UI
          }}
          onSave={handleEditSubmit}
        />
      )}
      {isAdding && (
        <AddUsersModal
          onClose={() => {
            setIsAdding(false);
          }}
          onSave={handleAddSubmit}
        />
      )}
    </div>
  );
};

export default UsersList;
