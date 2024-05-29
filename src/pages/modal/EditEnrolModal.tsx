import React, { useEffect, useState } from 'react';
import { AcademicGroup, EnrollmentInterface, Subject } from '@app/services/enrollment/enrollment-provider';
import { fetchAcademicGroups } from '@app/services/academic-groups/academic-groups';
import { fetchSubjects } from '@app/services/subjects/subjects-provider';

interface EditEnrollmentModalProps {
  enrollment: EnrollmentInterface | null;
  onClose: () => void;
  onSave: (updatedData: Partial<Omit<EnrollmentInterface, 'id'>>) => void;
}

const EditEnrollmentModal: React.FC<EditEnrollmentModalProps> = ({ enrollment, onClose, onSave }) => {
  const [academicGroups, setAcademicGroups] = useState<any | undefined>(undefined);
  const [studentName, setStudentName] = useState<string | undefined>(undefined);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [allAcademic, setAllAcademic] = useState<AcademicGroup[]>([]);
  const [subjects, setSubjects] = useState<any | undefined>(undefined);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);

  // get list of subjects
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const response = await fetchSubjects();
        setAllSubjects(response.data.results);
      } catch (error) {
        console.error('Error loading subjects:', error);
      }
    };
    loadSubjects();
  }, []);

  // get list of academic group
  useEffect(() => {
    const loadAcademicGroups = async () => {
      try {
        const response = await fetchAcademicGroups();
        setAllAcademic(response.data.results)
      } catch (error) {
        console.log('Error loading academic groups:', error);
      }
    };
    loadAcademicGroups();
  }, []);

  useEffect(() => {
    if (enrollment) {
      setStudentName(enrollment.student.get_full_name);
      setStudentId(enrollment.student.id); // Asigna el ID del estudiante
      setAcademicGroups(enrollment.academic_groups.id);
      setSubjects(Array.isArray(enrollment.subjects) ? enrollment.subjects.map(subject => subject.id) : []);
    }
  }, [enrollment]);

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjects = Array.from(e.target.selectedOptions, option => option.value);
    setSubjects(selectedSubjects);
  };

  // Manejar el guardado de los cambios
  const handleSave = () => {
    const updatedData: Partial<Omit<any, 'id'>> = {};
    if (academicGroups !== undefined) updatedData.academic_groups = academicGroups;
    if (subjects !== undefined) updatedData.subjects = subjects;
    if (studentId !== null) updatedData.student = studentId; // Envía el ID del estudiante
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
                <label>Grupos Academicos</label>
                <select
                  className="form-control"
                  value={academicGroups}
                  onChange={(e) => setAcademicGroups(e.target.value)}
                >
                  <option value="">Seleccione el grupo academico</option>
                  {allAcademic.map((academic) => (
                    <option key={academic.id} value={academic.id}>
                      {academic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Asignaturas</label>
                <select
                  className="form-control"
                  multiple
                  value={subjects}
                  onChange={handleSubjectsChange}
                >
                  <option value="">Seleccione las Asignaturas</option>
                  {allSubjects.map((subject) => (
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
                  value={studentName ?? ''}
                  readOnly
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
