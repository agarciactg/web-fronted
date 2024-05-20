import React, { useState } from 'react';
import { EnrollmentInterface} from '@app/services/enrollment/enrollment-provider';

interface EditEnrollmentModalProps {
  enrollment: EnrollmentInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<EnrollmentInterface, 'id'>>) => void;
}

const EditEnrollmentModal: React.FC<EditEnrollmentModalProps> = ({ enrollment, onClose, onSave }) => {
  const [academicGroups, setAcademicGroups] = useState<any | undefined>(undefined);
  const [subjects, setSubjects] = useState<any | undefined>(undefined);
  const [student, setStudent] = useState<any | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<EnrollmentInterface, 'id'>> = {};
    if (academicGroups !== undefined) updatedData.academic_groups = academicGroups;
    if (subjects !== undefined) updatedData.subjects = subjects;
    if (student !== undefined) updatedData.student = student;
    onSave(updatedData);
  };

  if (!enrollment) return null;  // No renderizar si no hay usuario

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Matricula</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="academicGroups">Grupo Academico</label>
                <input
                  type="text"
                  className="form-control"
                  id="academicGroups"
                  value={academicGroups ?? enrollment.academic_groups.name}
                  onChange={e => setAcademicGroups(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjects">Asignaturas</label>
                <select
                  className="form-control"
                  id="subjects"
                  value={selectedSubjectId ?? ''}
                  onChange={e => setSelectedSubjectId(Number(e.target.value))}
                >
                  <option value="">Seleccione una Asignatura</option>
                  {enrollment.subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="student">Estudiante</label>
                <input
                  type="text"
                  className="form-control"
                  id="student"
                  value={student ?? enrollment.student.get_full_name}
                  onChange={e => setStudent(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEnrollmentModal;
