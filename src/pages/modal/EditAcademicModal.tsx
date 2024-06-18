import React, { useEffect, useState } from 'react';
import { fetchTeacher, User } from '@app/services/users/users-provider';
import { AcademicGroupsInterface, Teacher } from '@app/services/academic-groups/academic-groups';
import { degreesOptions } from '@app/utils/constant';

interface EditAcademicModalProps {
  academic: AcademicGroupsInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<AcademicGroupsInterface, 'id'>>) => void;
}

const EditAcademicModal: React.FC<EditAcademicModalProps> = ({ academic, onClose, onSave }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [degress_display, setDegressDisplay] = useState<string | undefined>(undefined);
  const [degress, setDegress] = useState<string | undefined>(undefined);
  const [teachers, setTeachers] = useState<any | undefined>(undefined);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [selectTeacherId, setSelectTeacherId] = useState<number | null>(null);

  // get list of teachers
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

  useEffect(() => {
    if (academic) {
      setName(academic.name)
      setCode(academic.code!)
      setDegress(academic.degress)
      setTeachers((academic.teachers) ? academic.teachers.map(academi => academi.id) : [])
    }
  }, [academic])

  const handleTeachersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeachers = Array.from(e.target.selectedOptions, option => option.value);
    setTeachers(selectedTeachers);
  };

  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<AcademicGroupsInterface, 'id'>> = {};
    if (name !== undefined) updatedData.name = name;
    if (code !== undefined) updatedData.code = code;
    if (degress !== undefined) updatedData.degress = degress;
    if (teachers !== undefined) updatedData.teachers = teachers;

    onSave(updatedData);
  };
  
  if (!academic) return null;  // No renderizar si no hay usuario
  
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Grupos academicos</h5>
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
                <label>Grado</label>
                <select
                  className="form-control"
                  value={academic.degress}
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
                <label htmlFor="teachers">Profesores</label>
                <select
                  className="form-control"
                  id="teachers"
                  multiple
                  value={teachers}
                  onChange={handleTeachersChange}
                >
                  <option value="">Seleccione los Profesores</option>
                  {allTeachers.map((teacher) => (
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
