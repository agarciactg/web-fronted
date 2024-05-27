import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';
import { headers } from '@app/utils/apiConfig';
import EditAcademicModal from './modal/EditAcademicModal';
import './ModalStyles.css'
import { AcademicGroupsInterface, AcademicGroupsResponse, createAcademicGroups, deleteAcademicGroups, detailAcademicGroups, fetchAcademicGroups, updateAcademicGroups } from '@app/services/academic-groups/academic-groups';
import AddAcademicGroupsModal from './modal/AddAcademicGroups';


const AcademicGroupsList: React.FC = () => {
    const [academicGroups, setAcademicGroups] = useState<AcademicGroupsInterface[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previusPage, setPreviousPage] = useState<string | null>(null);
    const [editingAcademicGroups, setEditingAcademicGroups] = useState<AcademicGroupsInterface | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        loadAcademicGroups();
    }, []);

    const loadAcademicGroups = async () => {
        const response = await fetchAcademicGroups();
        setAcademicGroups(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
    };

    const handleNextPage = async () => {
        if (nextPage) {
            const response = await axios.get<AcademicGroupsResponse>(nextPage, { headers });
            setAcademicGroups(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviousPage(response.data.data.previous);
        }
    }

    const handlePreviousPage = async () => {
        if (previusPage) {
            const response = await axios.get<AcademicGroupsResponse>(previusPage, { headers });
            setAcademicGroups(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviousPage(response.data.data.previous);
        }
    };

    const handleEditInit = async (id: number) => {
        const detailResponse = await detailAcademicGroups(id);
        setEditingAcademicGroups(detailResponse.data);
        setIsEditing(true);
    }

    const handleEditSubmit = async (updatedData: Partial<Omit<AcademicGroupsInterface, 'id'>>) => {
        if (!editingAcademicGroups) return;
        const updatedUser = await updateAcademicGroups(editingAcademicGroups.id, updatedData);
        // setAcademicGroups(prevUsers => prevUsers.map(user => user.id === editingUser.id ? { ...user, ...updatedUser } : user));
        await loadAcademicGroups();
        setIsEditing(false);
        setEditingAcademicGroups(null);
    }

    const handleDelete = async (id: number) => {
        const deleteData: AcademicGroupsInterface = await deleteAcademicGroups(id);
        await loadAcademicGroups();
    };

    const handleAddNew = () => {
        setIsAdding(true);
    };

    const handleAddSubmit = async (academic: Partial<AcademicGroupsInterface>): Promise<void> => {
        try {
            await createAcademicGroups(academic)
            await loadAcademicGroups();
            setIsAdding(false);
        } catch (error) {
            console.log('Error adding academic group');
        }
    }


    return (
        <div>
            {/* Contenedor Principal que podría volverse borroso */}
            <div className={(isEditing || isAdding ) ? "blur-background" : ""}>
                <ContentHeader title="Grupos Academicos" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="p-0">
                                    <h3 className="card-title">Lista de Grupos Academicos</h3>
                                </div>
                                <div className="ml-auto">
                                    <button className="btn btn-success" onClick={handleAddNew}>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Code</th>
                                            <th>Profesores</th>
                                            <th>Grado</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {academicGroups.map(academic => (
                                            <tr key={academic.id}>
                                                <td>{academic.id}</td>
                                                <td>{academic.name}</td>
                                                <td>{academic.code}</td>
                                                <td>
                                                    <select className="form-control">
                                                        {academic.teachers.map(teacher => (
                                                            <option key={teacher.id} value={teacher.id}>
                                                                {teacher.user.get_full_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>{academic.degress_display}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleEditInit(academic.id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm ml-2"
                                                        onClick={() => handleDelete(academic.id)}
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
                                        disabled={!previusPage}
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
                            <div className="card-footer">Total: {academicGroups.length}</div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Modal que no se ve afectado por el desenfoque */}
            {isEditing && editingAcademicGroups && (
                <EditAcademicModal
                    academic={editingAcademicGroups}
                    onClose={() => {
                        setIsEditing(false);
                        // Remueve el desenfoque si necesitas ajustar el UI
                    }}
                    onSave={handleEditSubmit}
                />
            )}
            {isAdding && (
                <AddAcademicGroupsModal 
                    onClose={() => {
                        setIsAdding(false);
                    }}
                    onSave={handleAddSubmit}
                />
            )
            }
        </div>
    );
};
export default AcademicGroupsList;
