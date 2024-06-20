import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faFileSignature, faPeopleGroup, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import PersonIcon from '@mui/icons-material/Person';
import { ContentHeader } from '@components';
import './styles/dashboard.css'


// const UserModule: React.FC = () => (
//   <div className="col-lg-3 col-6">
//     <div className="small-box">
//       <div className="inner">
//         <p>Total Matriculados</p>
//         <div className="icon-container">
//           <FontAwesomeIcon icon={faUserFriends} size="2x" color="#8A85FF" />
//         </div>
//       </div>
//       <h2>40,689</h2>
//       <p className="growth">
//         <span className="growth-value">8.5%</span> Más que ayer
//       </p>
//     </div>
//   </div>
// );

// const EnrollmentModule: React.FC = () => (
//   <div className="col-lg-3 col-6">
//     <div className="small-box bg-info">
//       <div className="inner">
//         <h3>150</h3>
//         <p>Matriculas</p>
//       </div>
//       <div className="icon">
//         <i className="ion ion-document-text" />
//       </div>
//       <a href="/enrollment" className="small-box-footer">
//         Ir al modulo <i className="fas fa-arrow-circle-right" />
//       </a>
//     </div>
//   </div>
// );

// const AcademicGroupsModule: React.FC = () => (
//   <div className="col-lg-3 col-6">
//     <div className="small-box bg-success">
//       <div className="inner">
//         <h3>53<sup style={{ fontSize: '20px' }}>%</sup></h3>
//         <p>Grupos Academicos</p>
//       </div>
//       <div className="icon">
//         <i className="ion ion-pie-graph" />
//       </div>
//       <a href="/academic-groups" className="small-box-footer">
//         Ir al modulo <i className="fas fa-arrow-circle-right" />
//       </a>
//     </div>
//   </div>
// );

// const SubjectsModule: React.FC = () => (
//   <div className="col-lg-3 col-6">
//     <div className="small-box bg-danger">
//       <div className="inner">
//         <h3>65</h3>
//         <p>Asignaturas</p>
//       </div>
//       <div className="icon">
//         <i className="ion ion-ios-bookmarks" />
//       </div>
//       <a href="/subjects" className="small-box-footer">
//         Ir al modulo <i className="fas fa-arrow-circle-right" />
//       </a>
//     </div>
//   </div>
// );

const UserModule: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box" id='small-box-id'>
      <div className="inner">
        <div className="container-icon">
          <div className="container-body" id="icon-title">
            <p className="title-card">Total usuarios</p>
            <h2 className="text-card">150</h2>
          </div>
          <div className="container-body" id="icon-div">
            <FontAwesomeIcon icon={faUserFriends} size="2x" color="#8A85FF" />  
          </div>
        </div>
      </div>
      <a href="/users" className="small-box-footer" id='footer-bottom'>
        Ir al modulo <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);


const EnrollmentModule: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box" id='small-box-id'>
      <div className="inner">
        <div className="container-icon">
          <div className="container-body" id="icon-title">
            <p className="title-card">Total matriculas</p>
            <h2 className="text-card">90</h2>
          </div>
          <div className="container-body" id="icon-div-enrollment">
            <FontAwesomeIcon icon={faFileSignature} size="2x" color="#FFC107" />  
          </div>
        </div>
      </div>
      <a href="/enrollment" className="small-box-footer" id='footer-bottom-enrollment'>
        Ir al modulo <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);


const AcademicGroupsModule: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box" id='small-box-id'>
      <div className="inner">
        <div className="container-icon">
          <div className="container-body" id="icon-title">
            <p className="title-card">Total academicos</p>
            <h2 className="text-card">8</h2>
          </div>
          <div className="container-body" id="icon-div-academic">
            <FontAwesomeIcon icon={faPeopleGroup} size="2x" color="#4ED6A7" />  
          </div>
        </div>
      </div>
      <a href="/academic-groups" className="small-box-footer" id='footer-bottom-academic'>
        Ir al modulo <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

const SubjectsModule: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box" id='small-box-id'>
      <div className="inner">
        <div className="container-icon">
          <div className="container-body" id="icon-title">
            <p className="title-card">Total asignaturas</p>
            <h2 className="text-card">89</h2>
          </div>
          <div className="container-body" id="icon-div-subjects">
            <FontAwesomeIcon icon={faBookBookmark} size="2x" color="#FF906E" />  
          </div>
        </div>
      </div>
      <a href="/academic-groups" className="small-box-footer" id='footer-bottom-subjects'>
        Ir al modulo <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);


const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem('type_user');
    if (type) {
      const normalizedType = JSON.parse(type).toLowerCase().trim();
      setUserType(normalizedType);
    }
  }, []);

  const renderDashboarBoxes = (): JSX.Element => {
    switch (userType) {
      case "administrador":
        return (
          <>
            <UserModule />
            <SubjectsModule />
            <AcademicGroupsModule />
            <EnrollmentModule />
          </>
        );
      case "estudiantes":
        return (
          <>
            <UserModule />
            <EnrollmentModule />
            <AcademicGroupsModule />
          </>
        );
      default:
        return (
          <>
            <EnrollmentModule />
            <AcademicGroupsModule />
            <SubjectsModule />
          </>
        );
    }
  };

  return (
    <div>
      <ContentHeader title="Dashboard" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {renderDashboarBoxes()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
