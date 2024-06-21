import React, { useState } from 'react';
import { ContentHeader } from '@components';
import './styles/settings.css';

const SettingsConfig = () => {
    const [userDetails, setUserDetails] = useState({
        nombreCompleto: "User Admin",
        rol: "Administrador",
        emailAdmin: "AdminIEJD@gmail.com",
        adminDescripcion: "Descripción General",
        numero: "+57 300716746",
    });

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [typeUser, setTypeUser] = useState<string>('');
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const [typeIdentification, setTypeIdentification] = useState<string>('');

    // TODO: conectar endpoint de actualizar para poner dinamico el formualio

    return (
        <div className="settings-container">
            <ContentHeader title="Configuracion General" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card user-config-card" id="card-user-config-card">
                        <div className="card-body">
                            <div className="user-info">
                                <img src="/img/default-profile.png" alt="User Logo" className="user-logo" />
                                <a href="#" className="upload-logo">Upload Logo</a>
                                <div className="user-details">
                                    <div className="form-group-setting">
                                        <label className="label-settings">Nombre Completo</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Apellido</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Email Admin</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Username</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Tipo de identificación</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={typeUser} 
                                            onChange={(e) => setTypeUser(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Numero Documento</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={documentNumber} 
                                            onChange={(e) => setDocumentNumber(e.target.value)} 
                                            placeholder='Ingrese los datos' 
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Tipo de usuario</label>
                                        <input 
                                            type="text" 
                                            className="form-control-setting" 
                                            value={typeIdentification} 
                                            onChange={(e) => setTypeIdentification(e.target.value)} 
                                            placeholder='Ingrese los datos'
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary save-button">Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsConfig;
