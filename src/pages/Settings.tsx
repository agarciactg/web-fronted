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
                                        <input type="text" className="form-control-setting" value={userDetails.nombreCompleto} placeholder='Ingrese los datos' onChange={e => e.target.value} />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Rol</label>
                                        <input type="text" className="form-control-setting" value={userDetails.rol}  />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Email Admin</label>
                                        <input type="email" className="form-control-setting" value={userDetails.emailAdmin}  />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Admin Descripción</label>
                                        <textarea className="form-control-setting" rows={3} >{userDetails.adminDescripcion}</textarea>
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Número</label>
                                        <input type="text" className="form-control-setting" value={userDetails.numero}  />
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
