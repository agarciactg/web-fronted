import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { createUser, deleteUser, detailUser, fetchUsers, updateUser, User, UsersResponse } from '@app/services/users/users-provider';
import axios from 'axios';
import { headers } from '@app/utils/apiConfig';
import EditUserModal from './modal/EditUserModal';
import './UserStyles.css'


const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previusPage, setPreviousPage] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);


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
  }

  const handlePreviousPage = async () => {
    if (previusPage) {
      const response = await axios.get<UsersResponse>(previusPage, { headers });
      setUsers(response.data.data.results);

      setNextPage(response.data.data.next);
      setPreviousPage(response.data.data.previous);
    }
  };

  const handleEditInit = async (id: number) => {
    const detailResponse = await detailUser(id);
    setEditingUser(detailResponse.data);
    setIsEditing(true);
  }

  const handleEditSubmit = async (updatedData: Partial<Omit<User, 'id'>>) => {
    if (!editingUser) return;
    const updatedUser = await updateUser(editingUser.id, updatedData);
    // setUsers(prevUsers => prevUsers.map(user => user.id === editingUser.id ? { ...user, ...updatedUser } : user));
    await loadUsers();
    setIsEditing(false);
    setEditingUser(null);
  }

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };


  return (
    <div>
      {/* Contenedor Principal que podría volverse borroso */}
      <div className={isEditing ? "blur-background" : ""}>
        <ContentHeader title="User List" />
        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">List of Users</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Username</th>
                      <th>Tipo de Documento</th>
                      <th># de documento</th>
                      <th>Correo</th>
                      <th>Estado</th>
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
                            className={`btn btn-sm ${user.is_active ? 'btn-success' : 'btn-warning'}`}
                            style={{ width: '70px' }}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEditInit(user.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={!previusPage}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={handleNextPage}
                    disabled={!nextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="card-footer">Total Users: {users.length}</div>
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
    </div>
  );
};
export default UsersList;
