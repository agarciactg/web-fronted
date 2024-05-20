import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';

// Componente para las registraciones de usuario
const UserRegistrations: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-warning">
      <div className="inner">
        <h3>44</h3>
        <p>User Registrations</p>
      </div>
      <div className="icon">
        <i className="ion ion-person-add" />
      </div>
      <a href="/users" className="small-box-footer">
        More info <i className="fas fa-arrow-circle-right" />
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
        <i className="ion-ios-people" />
      </div>
      <a href="/enrollment" className="small-box-footer">
        Ir al module <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

// Componente para la tasa de rebote
const OtherMenuThree: React.FC = () => (
  <div className="col-lg-3 col-6">
    <div className="small-box bg-success">
      <div className="inner">
        <h3>53<sup style={{ fontSize: '20px' }}>%</sup></h3>
        <p>Bounce Rate</p>
      </div>
      <div className="icon">
        <i className="ion ion-stats-bars" />
      </div>
      <a href="/" className="small-box-footer">
        More info <i className="fas fa-arrow-circle-right" />
      </a>
    </div>
  </div>
);

// Componente para los visitantes únicos
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
    console.log("Valor original del localStorage:", type);
    if (type) {
      const normalizedType = JSON.parse(type).toLowerCase().trim();
      console.log("Valor normalizado:", normalizedType);
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
            <UserRegistrations />
            <UserRegistrations />
          </>
        );
      case "estudiantes":
        return (
          <>
            <UserRegistrations />
            <OtherMenuThree />
            <OtherMenuThree />
            <OtherMenuFour />
          </>
        );
      default:
        return (
          <>
            <UserRegistrations />
            <OtherMenuThree />
            <OtherMenuThree />
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
