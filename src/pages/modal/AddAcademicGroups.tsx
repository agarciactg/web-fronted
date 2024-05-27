import React, { useState, useEffect } from 'react';
import { fetchTeacher } from '@app/services/users/users-provider';
import { AcademicGroupsInterface, Teacher } from '@app/services/academic-groups/academic-groups';

interface AddAcademicGroupsModalProps {
    onClose: () => void;
    onSave: (newData: Partial<AcademicGroupsInterface>) => void;
}

const degreesOptions = [
    { value: 1, label: "Primero" },
    { value: 2, label: "Segundo" },
    { value: 3, label: "Tercero" },
    { value: 4, label: "Cuarto" },
    { value: 5, label: "Quinto" },
    { value: 6, label: "Sexto" },
    { value: 7, label: "Séptimo" },
    { value: 8, label: "Octavo" },
    { value: 9, label: "Noveno" },
    { value: 10, label: "Décimo" },
    { value: 11, label: "Once" },
];

const AddAcademicGroupsModal: React.FC<AddAcademicGroupsModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [degress, setDegress] = useState<string>('');
    const [teachers, setTeachers] = useState<string[]>([]);
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                const response = await fetchTeacher();
                setAllTeachers(response.data.results);
            } catch (error) {
                console.error('Error loading teachers:', error);
            }
        };
        loadTeachers();
    }, []);

    const handleSubmit = () => {
        const newSubject = {
            name,
            code,
            degress: parseInt(degress),
            teachers: teachers.map((teacher) => parseInt(teacher))
        };
        onSave(newSubject);
    };

    const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTeachers = Array.from(e.target.selectedOptions, option => option.value);
        setTeachers(selectedTeachers);
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar nuevo Grupo Academico</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Code</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={code} 
                                onChange={(e) => setCode(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Grado</label>
                            <select
                                className="form-control"
                                value={degress}
                                onChange={(e) => setDegress(e.target.value)}
                            >
                                <option value="">Selecione un grado</option>
                                {degreesOptions.map((option) => (
                                    <option key={option.value} value={option.value.toString()}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Profesor(es)</label>
                            <select 
                                className="form-control" 
                                multiple
                                value={teachers} 
                                onChange={handleTeacherChange}
                            >
                                <option value="">Seleccione a los profesores</option>
                                {allTeachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.user.get_full_name}
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

export default AddAcademicGroupsModal;
