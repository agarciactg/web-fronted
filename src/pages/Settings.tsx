import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import './styles/settings.css';
import { detailSettings, SettingsInterface, updatedSettings } from '@app/services/settings-personal/settings-provider';
import { toast } from 'react-toastify';

interface EditSettingsModalProps {
    settings: SettingsInterface | null;
    onClose: () => void;
    onSave: (updatedData: Partial<Omit<SettingsInterface, 'id'>>) => void;
}

// TODO: terminar el settings modal
const SettingsModal: React.FC<EditSettingsModalProps> = ({ onSave }) => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [typeUser, setTypeUser] = useState<number | undefined>(undefined);
    const [documentNumber, setDocumentNumber] = useState<number | undefined>(undefined);
    const [typeIdentification, setTypeIdentification] = useState<number | undefined>(undefined);
    const [userId, setUserId] = useState<number | undefined>(undefined); // Agregado para manejar el ID del usuario

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // get data of users logen
            const storedString = localStorage.getItem('authentication');
            if (storedString) {
                try {
                    const storedObject = JSON.parse(storedString)
                    const storedEmail = storedObject.profile.email
                    const response = await detailSettings({ email: storedEmail });
                    const userData = response.data;

                    setName(userData.first_name);
                    setLastName(userData.last_name);
                    setEmail(userData.email);
                    setUsername(userData.username);
                    setTypeUser(userData.type_user);
                    setDocumentNumber(userData.document_number);
                    setTypeIdentification(userData.type_document);
                    setUserId(userData.id); // Asigna el ID del usuario

                } catch (error) {
                    console.error('Error fetching user data', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        if (userId !== undefined) {
            const updatedData = {
                first_name: name,
                last_name: lastName
            };

            try {
                await updatedSettings(userId, updatedData); // Call endpoint to updated
                toast.success('Actualizacion con exito!');
                onSave(updatedData);
            } catch (error) {
                toast.error('Actualizacion Fallida');
                console.error("Error updating settings", error);
            }
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

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
                                        <label className="label-settings">Nombre/s</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={name || ''}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Ingrese los datos'
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Apellido/s</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={lastName || ''}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder='Ingrese los datos'
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Correo</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={email || ''}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Ingrese los datos'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Username</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={username || ''}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder='Ingrese los datos'
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Tipo de identificación</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={typeIdentification?.toString() || ''}
                                            onChange={(e) => setTypeIdentification(parseInt(e.target.value))}
                                            placeholder='Ingrese los datos'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Numero documento</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={documentNumber?.toString() || ''}
                                            onChange={(e) => setDocumentNumber(parseInt(e.target.value))}
                                            placeholder='Ingrese los datos'
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group-setting">
                                        <label className="label-settings">Tipo de usuario</label>
                                        <input
                                            type="text"
                                            className="form-control-setting"
                                            value={typeUser?.toString() || ''}
                                            onChange={(e) => setTypeUser(parseInt(e.target.value))}
                                            placeholder='Ingrese los datos'
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary save-button" onClick={handleSave}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsModal;
