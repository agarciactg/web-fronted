import { ContentHeader } from "@app/components"
import { deleteEnrollment, detailEnrollment, EnrollmentInterface, EnrollmentResponse, fetchEnrollment, updatedEnrollment } from "@app/services/enrollment/enrollment-provider";
import { headers } from "@app/utils/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import EditEnrollmentModal from "./modal/EditEnrolModal";
import './ModalStyles.css'

// TODO: Probar lista de matriculas
const Enrollment = () => {
    // states
    const [enrollments, setEnrollments] = useState<EnrollmentInterface[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previusPage, setPreviusPage] = useState<string | null>(null);
    const [editingEnrollment, setEditingEnrollment] = useState<EnrollmentInterface  | null>();
    
    useEffect(() => {
        loadEnrollments();
    }, []);

    const loadEnrollments = async () => {
        const response = await fetchEnrollment();
        setEnrollments(response.data.results);
        setNextPage(response.data.next);
        setPreviusPage(response.data.previous)
    }

    const handleNextPage = async () => {
        if (nextPage) {
            const response = await axios.get<EnrollmentResponse>(nextPage, { headers });
            setEnrollments(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviusPage(response.data.data.previous);
        }
    }

    const handlePreviousPage = async () => {
        if (previusPage) {
            const response = await axios.get<EnrollmentResponse>(previusPage, { headers });
            setEnrollments(response.data.data.results);
            setNextPage(response.data.data.next);
            setPreviusPage(response.data.data.previous)
        }
    }

    const handleEditSubmit = async (updatedData: Partial<Omit<EnrollmentInterface, 'id'>>) => {
        if (!editingEnrollment) return;
        await updatedEnrollment(editingEnrollment.id, updatedData);
        await loadEnrollments;
        setIsEditing(false);
        setEditingEnrollment(null);
    }

    const handleEditInit = async (id: number) => {
        const detailResponse = await detailEnrollment(id);
        setEditingEnrollment(detailResponse.data);
        setIsEditing(true);
    }

    const handleDelete = async (id: number) => {
        const deleteData: EnrollmentInterface = await deleteEnrollment(id);
        await loadEnrollments();
    }

    // Todo: testear endpoint para el consumo de la vista
    return (
        <div>
            {/* Contenedor Principal que podría volverse borroso */}
            <div className={isEditing ? "blur-background" : ""}>
                <ContentHeader title="Matriculas" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Lista de Matriculas</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Grupo Academico</th>
                                            <th>Areas</th>
                                            <th>Estudiante</th>
                                            <th>Fecha de creacion</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrollments.map(enrol => (
                                            <tr key={enrol.id}>
                                                <td>{enrol.id}</td>
                                                <td>{enrol.academic_groups.name}</td>
                                                <td>{enrol.subjects.map(subject => subject.name).join(', ')}</td>
                                                <td>{enrol.student.get_full_name}</td>
                                                <td>{new Date(enrol.date_created).toLocaleString()}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleEditInit(enrol.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm ml-2"
                                                        onClick={() => handleDelete(enrol.id)}
                                                    >
                                                        Delete
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
                            <div className="card-footer">Total Users: {enrollments.length}</div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Modal que no se ve afectado por el desenfoque */}
            {isEditing && editingEnrollment && (
                <EditEnrollmentModal
                    enrollment={editingEnrollment}
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

export default Enrollment;
