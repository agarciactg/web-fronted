import { SubjectsInterface } from '@app/services/subjects/subjects-provider';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchTeacher } from '@app/services/users/users-provider';
import { Teacher } from '@app/services/academic-groups/academic-groups';


interface AddSubjectModalProps {
    onClose: () => void;
    onSave: (newData: Partial<SubjectsInterface>) => void;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [credis, setCredis] = useState<string>('');
    const [hours, setHours] = useState<string>('');
    const [teacher, setTeacher] = useState<string>('');
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                const response = await fetchTeacher();
                setTeachers(response.data.results);
            } catch (error) {
                console.error('Error loading teachers:', error);
            }
        };
        loadTeachers();
    }, []);

    const handleSubmit = () => {
        const newSubject = {
            name,
            description,
            credis: parseInt(credis),
            hours,
            teacher: parseInt(teacher)
        };
        onSave(newSubject);
    };


    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nueva Asignatura</h5>
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
                            <label>Descripcion</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Creditos</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={credis} 
                                onChange={(e) => setCredis(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Horas</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={hours} 
                                onChange={(e) => setHours(e.target.value)} 
                                placeholder='HH:MM:SS'
                            />
                        </div>
                        <div className="form-group">
                            <label>Profesor</label>
                            <select 
                                className="form-control" 
                                value={teacher} 
                                onChange={(e) => setTeacher(e.target.value)}
                            >
                                <option value="">Seleccione un profesor</option>
                                {teachers.map((teacher) => (
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

export default AddSubjectModal;
