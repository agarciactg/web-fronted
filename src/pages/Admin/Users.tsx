import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { createUser, deleteUser, fetchUsers, updateUser, User, UsersResponse } from '@app/services/users/users-provider';
import axios from 'axios';
import { headers } from '@app/utils/apiConfig';


const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previusPage, setPreviousPage] = useState<string | null>(null);

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

  const handleAdd = async (newUser: Omit<User, 'id'>) => {
    const createdUser = await createUser(newUser);
    setUsers([...users, createdUser]);
  };

  const handleEdit = async (id: number, updatedData: Omit<User, 'id'>) => {
    const updatedUser = await updateUser(id, updatedData);
    setUsers(users.map(user => user.id === id ? updatedUser : user));
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
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
                    <th>Numero De documento</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{`${user.first_name} ${user.last_name}`}</td>
                      <td>{user.username}</td>
                      <td>{user.document_number}</td>
                      <td>{user.email}</td>
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
                        // onClick={() => handleEdit(user.id, { name: 'Nuevo nombre', email: user.email })}
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
  );
};

export default UsersList;
