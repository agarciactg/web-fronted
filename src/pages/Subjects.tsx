import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import axios from 'axios';
import { headers } from '@app/utils/apiConfig';
import './ModalStyles.css';
import { createSubjects, deleteSubjects, detailSubjects, fetchSubjects, SubjectsInterface, SubjectsResponse, updateSubjects } from '@app/services/subjects/subjects-provider';
import EditSubjectModal from './modal/EditSubjectsModal';
import AddSubjectModal from './modal/AddSubjectModal';

const SubjectsList: React.FC = () => {
    const [subjects, setSubjects] = useState<SubjectsInterface[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previusPage, setPreviousPage] = useState<string | null>(null);
    const [editingSubjects, setEditingSubjects] = useState<SubjectsInterface | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        const response = await fetchSubjects();
        setSubjects(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
    };

    const handleNextPage = async () => {
        if (nextPage) {
            const response = await axios.get<SubjectsResponse>(nextPage, { headers });
            setSubjects(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviousPage(response.data.data.previous);
        }
    };

    const handlePreviousPage = async () => {
        if (previusPage) {
            const response = await axios.get<SubjectsResponse>(previusPage, { headers });
            setSubjects(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviousPage(response.data.data.previous);
        }
    };

    const handleEditInit = async (id: number) => {
        const detailResponse = await detailSubjects(id);
        setEditingSubjects(detailResponse.data);
        setIsEditing(true);
    };

    const handleEditSubmit = async (updatedData: Partial<Omit<SubjectsInterface, 'id'>>) => {
        if (!editingSubjects) return;
        await updateSubjects(editingSubjects.id, updatedData);
        await loadSubjects();
        setIsEditing(false);
        setEditingSubjects(null);
    };

    const handleDelete = async (id: number) => {
        const deleteData: SubjectsInterface = await deleteSubjects(id);
        await loadSubjects();
    };

    const handleAddNew = () => {
        setIsAdding(true);
    };

    const handleAddSubmit = async (subject: Partial<SubjectsInterface>): Promise<void> => {
        try {
            await createSubjects(subject);
            await loadSubjects();
            setIsAdding(false);
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <div>
            <div className={(isEditing || isAdding) ? "blur-background" : ""}>
                <ContentHeader title="Asignaturas" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="p-0">
                                    <h3 className="card-title">Lista de Asignaturas</h3>
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
                                            <th>Profesor</th>
                                            <th>Creditos</th>
                                            <th>Horas</th>
                                            <th className="description">Descripcion</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map(subject => (
                                            <tr key={subject.id}>
                                                <td>{subject.id}</td>
                                                <td>{subject.name}</td>
                                                <td>{subject.teacher.user.get_full_name}</td>
                                                <td>{subject.credis}</td>
                                                <td>{subject.hours}</td>
                                                <td className="description">{subject.description}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleEditInit(subject.id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm ml-2"
                                                        onClick={() => handleDelete(subject.id)}
                                                    >
                                                        Borrar
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
                            <div className="card-footer">Total: {subjects.length}</div>
                        </div>
                    </div>
                </section>
            </div>
            {isEditing && editingSubjects && (
                <EditSubjectModal
                    subjects={editingSubjects}
                    onClose={() => {
                        setIsEditing(false);
                    }}
                    onSave={handleEditSubmit}
                />
            )}
            {isAdding && (
                <AddSubjectModal
                    onClose={() => {
                        setIsAdding(false);
                    }}
                    onSave={handleAddSubmit}
                />
            )}
        </div>
    );
};

export default SubjectsList;
