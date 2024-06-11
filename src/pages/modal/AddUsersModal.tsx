import { SubjectsInterface } from '@app/services/subjects/subjects-provider';
import React, { useState, useEffect } from 'react';


interface AddUsersModalProps {
    onClose: () => void;
    onSave: (newData: Partial<SubjectsInterface>) => void;
}

const AddUsersModal: React.FC<AddUsersModalProps> = ({ onClose, onSave }) => {
    const [typeUser, setTypeUser] = useState<number>();
    const [typeDocument, setTypeDocument] = useState<number>();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [documentNumber, setDocumentNumber] = useState<string>();

    const handleSubmit = () => {
        const newSubject = {
            type_user: typeUser,
            type_document: typeDocument,
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            document_number: documentNumber
        };
        onSave(newSubject);
    };


    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nuevo Usuario</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="typeUser">Tipo de usuario</label>
                            <select
                                className="form-control"
                                id="typeUser"
                                value={typeUser}
                                onChange={e => setTypeUser(parseInt(e.target.value))}
                            >
                                <option value="0">Administrador</option>
                                <option value="1">Rector</option>
                                <option value="2">Director</option>
                                <option value="3">Jefe de Sistemas</option>
                                <option value="4">Docente</option>
                                <option value="5">Estudiante</option>
                                <option value="6">Acudiente</option>
                                <option value="7">Otro</option>
                                <option value="8">Coordinador</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="typeDocument">Tipo de documento</label>
                            <select
                                className="form-control"
                                id="typeDocument"
                                value={typeDocument}
                                onChange={e => setTypeDocument(parseInt(e.target.value))}
                            >
                                <option value="0">Cedula de Ciudadania</option>
                                <option value="1">Tarjeta de Identidad</option>
                                <option value="2">Pasaporte</option>
                                <option value="3">Otro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Numero de documento</label>
                            <input
                                type="number"
                                className="form-control"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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

export default AddUsersModal;
