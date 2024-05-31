import React, { useState, useEffect } from 'react';
import { fetchTeacher, fetchTypeUsers } from '@app/services/users/users-provider';
import { fetchAcademicGroups, Teacher } from '@app/services/academic-groups/academic-groups';
import { AcademicGroup, EnrollmentInterface, Student, Subject } from '@app/services/enrollment/enrollment-provider';
import { fetchSubjects } from '@app/services/subjects/subjects-provider';


interface AddEnrollmentModalProps {
    onClose: () => void;
    onSave: (newData: Partial<EnrollmentInterface>) => void;
}

const AddEnrollmentModal: React.FC<AddEnrollmentModalProps> = ({ onClose, onSave }) => {
    const [academicGroups, setAcademicGroups] = useState<any>();
    const [allAcademic, setAllAcademic] = useState<AcademicGroup[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
    const [student, setStudent] = useState<any>();
    const [allStudent, setAllStudent] = useState<any>([]);

    // list of academic groups
    useEffect(() => {
        const loadAcademicGroups = async () => {
            try {
                const response = await fetchAcademicGroups();
                setAllAcademic(response.data.results);
            } catch (error) {
                console.error('Error loading Academic Groups:', error);
            }
        };
        loadAcademicGroups();
    }, []);

    // list of subjects
    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const response = await fetchSubjects();
                setAllSubjects(response.data.results);
            } catch (error) {
                console.error('Error loading subjects:', error);
            }
        };
        loadSubjects();
    }, []);

    // list of subjects
    useEffect(() => {
        const loadTypeUsers = async () => {
            try {
                const response = await fetchTypeUsers({type_users: "Estudiante"});
                setAllStudent(response.data);
            } catch (error) {
                console.error('Error loading type users:', error);
            }
        };
        loadTypeUsers();
    }, []);

    const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubjects = Array.from(e.target.selectedOptions, option => option.value);
        setSubjects(selectedSubjects);
    };

    const handleSubmit = () => {
        const newSubject = {
            academic_groups: parseInt(academicGroups),
            subjects: subjects.map(subjects => parseInt(subjects)),
            student: parseInt(student)
        };
        onSave(newSubject);
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nueva Matricula</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Grupos Academicos</label>
                            <select
                                className="form-control"
                                value={academicGroups}
                                onChange={(e) => setAcademicGroups(e.target.value)}
                            >
                                <option value="">----- Seleccione el grupo academico -----</option>
                                {allAcademic.map((academic) => (
                                    <option key={academic.id} value={academic.id}>
                                        {academic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Asignaturas</label>
                            <select
                                className="form-control"
                                multiple
                                value={subjects}
                                onChange={handleSubjectsChange}
                            >
                                <option value="">----- Seleccione las Asignaturas  -----</option>
                                {allSubjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Estudiante</label>
                            <select
                                className="form-control"
                                value={student}
                                onChange={(e) => setStudent(e.target.value)}
                            >
                                <option value="">----- Seleccione un Estudiante -----</option>
                                {allStudent.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.first_name} {student.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEnrollmentModal;
