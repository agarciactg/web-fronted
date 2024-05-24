import React, { useState } from 'react';
import { SubjectsInterface } from '@app/services/subjects/subjects-provider';


interface EditSubjectsModalProps {
  subjects: SubjectsInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<SubjectsInterface, 'id'>>) => void;
}

const EditSubjectModal: React.FC<EditSubjectsModalProps> = ({ subjects, onClose, onSave }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [credis, setCredis] = useState<number | undefined>(undefined);
  const [hours, setHours] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [teacher, setTeacher] = useState<any | undefined>(undefined);

  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<SubjectsInterface, 'id'>> = {};
    if (name !== undefined) updatedData.name = name;
    if (credis !== undefined) updatedData.credis = credis;
    if (hours !== undefined) updatedData.hours = hours;
    if (description !== undefined) updatedData.description = description;
    if (teacher !== undefined) updatedData.teacher = teacher;

    onSave(updatedData);
  };

  if (!subjects) return null;  // No renderizar si no hay usuario

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Asignaturas</h5>
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
                  value={name ?? subjects.name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="teacher">Profesor</label>
                <input
                  type="text"
                  className="form-control"
                  id="teacher"
                  value={teacher ?? subjects.teacher}
                  onChange={e => setTeacher(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="credis">Creditos</label>
                <input
                  type="text"
                  className="form-control"
                  id="credis"
                  value={credis ?? subjects.credis}
                  onChange={e => setCredis(parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hours">Horas</label>
                <input
                  type="text"
                  className="form-control"
                  id="hours"
                  value={hours ?? subjects.hours}
                  onChange={e => setHours(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description ?? subjects.description}
                  onChange={e => setDescription(e.target.value)}
                />
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

export default EditSubjectModal;
