import React from 'react';
import { Form, Input, Button, DatePicker, Select, Col, Row, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import "./styles/Inscription.css"

const { Option } = Select;
const { Title } = Typography;

const InscriptionForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // Aquí puedes enviar los datos a tu backend
  };

  return (
    <div className="inscription-form">
      <Title level={2}>Formulario de Inscripción</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="acudienteName"
              label="Nombre del Acudiente"
              rules={[{ required: true, message: 'Por favor ingrese el nombre del acudiente' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nombre del Acudiente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="acudienteEmail"
              label="Correo Electrónico del Acudiente"
              rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo electrónico válido' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Correo Electrónico del Acudiente" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="acudientePhone"
              label="Teléfono del Acudiente"
              rules={[{ required: true, message: 'Por favor ingrese el teléfono del acudiente' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Teléfono del Acudiente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="studentName"
              label="Nombre del Alumno"
              rules={[{ required: true, message: 'Por favor ingrese el nombre del alumno' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nombre del Alumno" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="studentDOB"
              label="Fecha de Nacimiento del Alumno"
              rules={[{ required: true, message: 'Por favor ingrese la fecha de nacimiento del alumno' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Fecha de Nacimiento" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="studentGrade"
              label="Grado del Alumno"
              rules={[{ required: true, message: 'Por favor seleccione el grado del alumno' }]}
            >
              <Select placeholder="Seleccione el grado">
                <Option value="preescolar">Preescolar</Option>
                <Option value="primero">Primero</Option>
                <Option value="segundo">Segundo</Option>
                <Option value="tercero">Tercero</Option>
                <Option value="cuarto">Cuarto</Option>
                <Option value="quinto">Quinto</Option>
                <Option value="sexto">Sexto</Option>
                <Option value="septimo">Séptimo</Option>
                <Option value="octavo">Octavo</Option>
                <Option value="noveno">Noveno</Option>
                <Option value="decimo">Décimo</Option>
                <Option value="undecimo">Undécimo</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InscriptionForm;
