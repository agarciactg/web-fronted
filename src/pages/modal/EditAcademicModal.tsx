import React, { useState } from 'react';
import { User } from '@app/services/users/users-provider';
import { AcademicGroupsInterface, Teacher } from '@app/services/academic-groups/academic-groups';

interface EditAcademicModalProps {
  academic: AcademicGroupsInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<AcademicGroupsInterface, 'id'>>) => void;
}

const EditAcademicModal: React.FC<EditAcademicModalProps> = ({ academic, onClose, onSave }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [degress_display, setDegressDisplay] = useState<string | undefined>(undefined);
  const [teachers, setTeachers] = useState<Teacher[] | undefined>(undefined);
  const [selectTeacherId, setSelectTeacherId] = useState<number | null>(null);


  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<AcademicGroupsInterface, 'id'>> = {};
    if (name !== undefined) updatedData.name = name;
    if (code !== undefined) updatedData.code = code;
    if (degress_display !== undefined) updatedData.degress_display = degress_display;
    if (teachers !== undefined) updatedData.teachers = teachers;

    onSave(updatedData);
  };

  if (!academic) return null;  // No renderizar si no hay usuario

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name ?? academic.name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Codigo</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={code! ?? academic.code}
                  onChange={e => setCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="degress_display">Grado</label>
                <input
                  type="text"
                  className="form-control"
                  id="degress_display"
                  value={degress_display ?? academic.degress_display}
                  onChange={e => setDegressDisplay(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="teachers">Profesores</label>
                <select 
                    className="form-control"
                    id="teachers"
                    value={selectTeacherId ?? ''}
                    onChange={e => setSelectTeacherId(Number(e.target.value))}
                >
                    <option value="">....</option>
                    {academic.teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.user.get_full_name}
                        </option>
                    ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAcademicModal;
