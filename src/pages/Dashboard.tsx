import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';


const UserRegistrations: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-warning">
      <div className="inner">
        <h3>44</h3>
        <p>Usuarios</p>
      </div>
      <div className="icon">
        <i className="ion ion-ios-people" />
      </div>
      <a href="/users" className="small-box-footer">
        Ir al module <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

const EnrollmentModule: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-info">
      <div className="inner">
        <h3>150</h3>
        <p>Matriculas</p>
      </div>
      <div className="icon">
        <i className="ion ion-document-text" />
      </div>
      <a href="/enrollment" className="small-box-footer">
        Ir al module <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

const AcademicGroups: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-success">
      <div className="inner">
        <h3>53<sup style={{ fontSize: '20px' }}>%</sup></h3>
        <p>Grupos Academicos</p>
      </div>
      <div className="icon">
        <i className="ion ion-ios-keypad" />
      </div>
      <a href="/academic-groups" className="small-box-footer">
        Ir al module <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

const OtherMenuFour: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-danger">
      <div className="inner">
        <h3>65</h3>
        <p>Unique Visitors</p>
      </div>
      <div className="icon">
        <i className="ion ion-pie-graph" />
      </div>
      <a href="/" className="small-box-footer">
        More info <i className="fas fa-arrow-circle-right" />
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
            <UserRegistrations />
            <EnrollmentModule />
            <AcademicGroups />
            <UserRegistrations />
          </>
        );
      case "estudiantes":
        return (
          <>
            <UserRegistrations />
            <AcademicGroups />
            <OtherMenuFour />
          </>
        );
      default:
        return (
          <>
            <UserRegistrations />
            <AcademicGroups />
            <OtherMenuFour />
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
