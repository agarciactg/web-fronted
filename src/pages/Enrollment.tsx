import { ContentHeader } from "@app/components"
import { createEnrollment, deleteEnrollment, detailEnrollment, EnrollmentInterface, EnrollmentResponse, fetchEnrollment, updatedEnrollment } from "@app/services/enrollment/enrollment-provider";
import { headers } from "@app/utils/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import EditEnrollmentModal from "./modal/EditEnrolModal";
import './ModalStyles.css'
import AddEnrollmentModal from "./modal/AddEnrollmentModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';  // Importamos jsPDF
import html2canvas from 'html2canvas'; // Importamos html2canvas


const Enrollment = () => {
    // states
    const [enrollments, setEnrollments] = useState<EnrollmentInterface[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previusPage, setPreviusPage] = useState<string | null>(null);
    const [editingEnrollment, setEditingEnrollment] = useState<EnrollmentInterface | null>();
    const [isAdding, setIsAdding] = useState(false);

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

    const handleEditInit = async (id: number) => {
        const detailResponse = await detailEnrollment(id);
        setEditingEnrollment(detailResponse.data);
        setIsEditing(true);
    }

    const handleEditSubmit = async (updatedData: Partial<Omit<EnrollmentInterface, 'id'>>) => {
        if (!editingEnrollment) return;
        await updatedEnrollment(editingEnrollment.id, updatedData);
        await loadEnrollments();
        setIsEditing(false);
        setEditingEnrollment(null);
    }

    const handleDelete = async (id: number) => {
        const deleteData: EnrollmentInterface = await deleteEnrollment(id);
        await loadEnrollments();
    }

    const handleAddNew = () => {
        setIsAdding(true);
    };

    const handleAddSubmit = async (enroll: Partial<EnrollmentInterface>): Promise<void> => {
        try {
            await createEnrollment(enroll);
            await loadEnrollments();
            setIsAdding(false);
        } catch (error) {
            console.log('Error adding enrollment', error);
        }
    }

    // fuction to export document pdf
    const exportPDF = () => {
        console.log("Export PDF function called"); // Log para depurar si la función se está ejecutando
        const input = document.getElementById('enrollment-table');
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
                    pdf.save("enrollment-lista.pdf");
                })
                .catch((error) => {
                    console.error("Error generating PDF:", error);
                });
        } else {
            console.error("No se encontró el elemento con id 'enrollment-table'");
        }
    };

    return (
        <div>
            {/* Contenedor Principal que podría volverse borroso */}
            <div className={(isEditing || isAdding) ? "blur-background" : ""}>
                <ContentHeader title="Matriculas" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="p-0">
                                    <h3 className="card-title">Lista de Matriculas</h3>
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
                            <div className="card-body" id="enrollment-table">
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
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm ml-2"
                                                        onClick={() => handleDelete(enrol.id)}
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
            {isAdding && (
                <AddEnrollmentModal
                    onClose={() => {
                        setIsAdding(false);
                    }}
                    onSave={handleAddSubmit}
                />
            )}
        </div>
    );
};

export default Enrollment;
