import React, { useEffect, useState } from 'react';
import { SubjectsInterface } from '@app/services/subjects/subjects-provider';
import { Teacher } from '@app/services/academic-groups/academic-groups';
import { fetchTeacher } from '@app/services/users/users-provider';

interface EditSubjectsModalProps {
  subjects: SubjectsInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<SubjectsInterface, 'id'>>) => void;
}

const EditSubjectModal: React.FC<EditSubjectsModalProps> = ({ subjects, onClose, onSave }) => {
  const [name, setName] = useState<string | undefined>(subjects?.name);
  const [credis, setCredis] = useState<number | undefined>(subjects?.credis);
  const [hours, setHours] = useState<string | undefined>(subjects?.hours);
  const [description, setDescription] = useState<string | undefined>(subjects?.description);
  const [teacher, setTeacher] = useState<any | undefined>(subjects?.teacher);
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

  const handleSave = () => {
    const updatedData: Partial<Omit<SubjectsInterface, 'id'>> = {};
    if (name !== undefined) updatedData.name = name;
    if (credis !== undefined) updatedData.credis = credis;
    if (hours !== undefined) updatedData.hours = hours;
    if (description !== undefined) updatedData.description = description;
    if (teacher !== undefined) updatedData.teacher = teacher;

    onSave(updatedData);
  };

  if (!subjects) return null;

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
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="credis">Creditos</label>
                <input
                  type="text"
                  className="form-control"
                  id="credis"
                  value={credis}
                  onChange={e => setCredis(parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hours">Horas</label>
                <input
                  type="text"
                  className="form-control"
                  id="hours"
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Profesor</label>
                <select
                  className="form-control"
                  value={teacher?.id ?? ''}
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
