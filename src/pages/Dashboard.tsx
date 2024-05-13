import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';

const Dashboard = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem('type_user');
    console.log("Valor original del localStorage:", type);
    if (type) {
      const normalizedType = type.toLowerCase().trim();
      console.log("Valor normalizado:", normalizedType);
      setUserType(normalizedType);
    }
  }, []);

  const UserRegistrations = () => (
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

  const OtherMenuTwo = () => (
    <div className="col-lg-3 col-6">
      <div className="small-box bg-info">
        <div className="inner">
          <h3>150</h3>
          <p>New Orders</p>
        </div>
        <div className="icon">
          <i className="ion ion-bag" />
        </div>
        <a href="/" className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
  );

  const OtherMenuThree = () => (
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

  const OtherMenuFour = () => (
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

  const renderDashboarBoxes = () => {
    console.log("Tipo de usuario en renderDashboarBoxes:", userType);
    switch (userType) {
      case "administrador":
        return (
          <>
            <UserRegistrations />
            <UserRegistrations />
            <UserRegistrations />
            <UserRegistrations />
          </>
        );
      case "estudiantes":
        return (
          <>
            <UserRegistrations />
            <OtherMenuTwo />
            <OtherMenuThree />
            <OtherMenuFour />
          </>
        );
      default:
        return (
          <>
            <UserRegistrations />
            <OtherMenuTwo />
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
