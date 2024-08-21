import React, { useState } from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, Select, Col, Row, Typography, Upload, Steps, Checkbox, UploadProps } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  UploadOutlined,
  IdcardOutlined,
  RobotOutlined,
  GlobalOutlined,
  SendOutlined,
  CarOutlined,
  MoneyCollectOutlined,
  PictureOutlined,
  SkinOutlined,
  PhoneOutlined,
  TrophyOutlined,
  TagsOutlined,
  DollarOutlined,
  BankOutlined
} from '@ant-design/icons';
import "./styles/Inscription.css";
import logo from "../login/logo.png";
import { Link } from 'react-router-dom';
import { IncriptionCreated } from '@app/services/incription/incription-provider';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'


dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues]: any = useState({});

  const onFinish = async (values: any) => {
    // Combina los valores de los pasos anteriores con los actuales
    const allValues = { ...formValues, ...values };
    setFormValues(allValues);

    // Transform undefined values to null
    Object.keys(allValues).forEach(key => {
      if (allValues[key] === undefined) {
        allValues[key] = "";
      }
    });

    // Verifica si la fecha existe y asegúrate de que es un objeto dayjs
    if (allValues.date_of_bird && dayjs(allValues.date_of_bird).isValid()) {
      allValues.date_of_bird = dayjs(allValues.date_of_bird).format("YYYY-MM-DD");
    }

    const formData = new FormData();

    Object.keys(allValues).forEach(key => {
      const value = allValues[key];

      if (Array.isArray(value)) {
        // Verifica si es un array de archivos
        if (value[0] && value[0].originFileObj) {
          value.forEach((file: any) => {
            formData.append(key, file.originFileObj);
          });
        } else {
          value.forEach((item: any) => {
            formData.append(key, item);
          });
        }
      } else if (value && value.originFileObj) {
        // Si no es un array, pero es un archivo
        formData.append(key, value.originFileObj);
      } else {
        formData.append(key, value);
      }
    });

    // Llama a la función para enviar la inscripción
    const result: any = await IncriptionCreated(formData);

    // limpiar formulario siempre y cuando la creacion halla tenido exito
    if (result.code == 200) {
      form.resetFields();
    }

  };

  // props - de cargue
  const handleFileChange = (key: string, file: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [key]: [file]
    }));
  };

  const propsTemplate = (key: string) => ({
    onRemove: (file: any) => {
      setFormValues((prevValues: any) => {
        const newValues = { ...prevValues };
        delete newValues[key];
        return newValues;
      });
    },
    beforeUpload: (file: any) => {
      handleFileChange(key, file);
      return false;
    },
  });



  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormValues((prevValues: any) => ({ ...prevValues, ...values }));
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // formato fecha de formularios
  const dateFormat = "YYYY-MM-DD";

  // Candidato uno
  const steps = [
    {
      title: 'Candidato',
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name_c"
                label="Nombre del candidato"
                rules={[{ required: true, message: 'Por favor ingrese el nombre del candidato' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre del candidato" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name_c"
                label="Apellido del candidato"
                rules={[{ required: true, message: 'Por favor ingrese el apellido del candidato' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Apellido del candidato" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email_c"
                label="Correo electrónico"
                rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo electrónico válido' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo Electrónico del candidato" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username_c"
                label="Username"
                rules={[{ required: true, message: 'Por favor ingrese el username' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="document_number_c"
                label="Número de documento"
                rules={[{ required: true, message: 'Por favor ingrese el número de documento del candidato' }]}
              >
                <Input prefix={<IdcardOutlined />} type="number" placeholder="Número de Documento del candidato" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_document_c"
                label="Tipo de documento"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de documento del candidato' }]}
              >
                <Select placeholder="Seleccione el tipo de documento">
                  <Option value="0">Cédula</Option>
                  <Option value="1">Tarjeta de identidad</Option>
                  <Option value="2">Pasaporte</Option>
                  <Option value="3">Otro</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="years"
                label="Edad"
                rules={[
                  { required: true, message: 'Por favor ingrese la edad' },
                  {
                    validator: (_, value) => {
                      if (value && parseInt(value) > 40) {
                        return Promise.reject('El estrato no puede ser mayor a 40');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input prefix={<RobotOutlined />} type="number" placeholder="Edad" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stratum"
                label="Estrato"
                rules={[{ required: true, message: 'Por favor ingrese estrato' }]}
              >
                <Input prefix={<MoneyCollectOutlined />} placeholder="Estrato" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date_of_bird"
                label="Fecha de Nacimiento"
                rules={[
                  { required: true, message: 'Por favor ingrese la fecha de nacimiento' },
                  {
                    validator: (_, value) => {
                      const currentDate = moment();
                      if (value && moment(value).isAfter(currentDate)) {
                        return Promise.reject('La fecha de nacimiento no puede ser posterior a la fecha actual');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item
                name="degrees"
                label="Grado a aspirar"
                rules={[{ required: true, message: 'Por favor ingrese el grado' }]}
              >
                <Select placeholder="Seleccione el grado">
                  <Option value="1">Primero</Option>
                  <Option value="2">Segundo</Option>
                  <Option value="3">Tercero</Option>
                  <Option value="4">Cuarto</Option>
                  <Option value="5">Quinto</Option>
                  <Option value="6">Sexto</Option>
                  <Option value="7">Septimo</Option>
                  <Option value="8">Octavo</Option>
                  <Option value="9">Noveno</Option>
                  <Option value="10">Decimo</Option>
                  <Option value="11">Once</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Direccion"
                rules={[{ required: true, message: 'Por favor ingrese la direccion' }]}
              >
                <Input prefix={<SendOutlined />} placeholder="Dirrecion" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="Ciudad"
                rules={[{ required: true, message: 'Por favor ingrese la ciudad' }]}
              >
                <Input prefix={<GlobalOutlined />} placeholder="Ciudad" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="neighborhood"
                label="Barrio"
                rules={[{ required: true, message: 'Por favor ingrese barrio' }]}
              >
                <Input prefix={<CarOutlined />} placeholder="Barrio" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="elective_year"
                label="Año Electivo"
                rules={[{ required: true, message: 'Por favor ingrese el año electivo' }]}
              >
                <Input prefix={<SkinOutlined />} type="number" placeholder="Año electivo" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Genero"
                rules={[{ required: true, message: 'Por favor ingrese el genero' }]}
              >
                <Select placeholder="Seleccione el genero">
                  <Option value="0">Masculino</Option>
                  <Option value="1">Femenino</Option>
                  <Option value="2">Otro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar_c"
                label="Foto del candidato"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor suba una foto del candidato' }]}
              >
                <Upload {...propsTemplate('avatar_c')}>
                  <Button icon={<UploadOutlined />}>Subir Foto</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="avatar_url_c"
                label="Url avatar"
              >
                <Input prefix={<PictureOutlined />} placeholder="avatar url" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Tutor 1',
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name_t_one"
                label="Nombre tutor"
                rules={[{ required: true, message: 'Por favor ingrese el nombre tutor' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name_t_one"
                label="Apellido tutor"
                rules={[{ required: true, message: 'Por favor ingrese el apellido tutor' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Apellido tutor" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email_t_one"
                label="Correo Electrónico tutor"
                rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo electrónico válido' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo Electrónico tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_document_t_one"
                label="Tipo de Documento tutor"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de documento tutor' }]}
              >
                <Select placeholder="Seleccione el tipo de documento">
                  <Option value="0">Cédula</Option>
                  <Option value="1">Tarjeta de identidad</Option>
                  <Option value="2">Pasaporte</Option>
                  <Option value="3">Otro</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="document_number_t_one"
                label="Número de documento tutor"
                rules={[{ required: true, message: 'Por favor ingrese el número de documento tutor' }]}
              >
                <Input prefix={<IdcardOutlined />} type="number" placeholder="Número de documento tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar_t_one"
                label="Foto tutor"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor suba una foto tutor' }]}
              >
                <Upload {...propsTemplate('avatar_t_one')}>
                  <Button icon={<UploadOutlined />}>Subir Foto</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username_t_one"
                label="Username"
                rules={[{ required: true, message: 'Por favor ingrese el username del tutor' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar_url_t_one"
                label="Url avatar"
              >
                <Input prefix={<PictureOutlined />} placeholder="avatar url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_tutor_t_one"
                label="Telefono tutor uno"
                rules={[{ required: true, message: 'Por favor ingrese el numero de celular del tutor 1' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Telefono tutor uno" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="profession_t_one"
                label="Profesion"
                rules={[{ required: true, message: 'Por favor ingrese la profesion del tutor 1' }]}
              >
                <Input prefix={<TrophyOutlined />} placeholder="Profesion tutor uno" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="workplace_t_one"
                label="Lugar de trabajo"
                rules={[{ required: true, message: 'Por favor ingrese el lugar de trabajo' }]}
              >
                <Input prefix={<TagsOutlined />} placeholder="Lugar de trabajo" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone_number_work_t_one"
                label="Numero de trabajo"
                rules={[{ required: true, message: 'Por favor ingrese el numero de trabajo' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Numero de trabajo" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="monthly_income_t_one"
                label="Ingreso mensual"
                rules={[{ required: true, message: 'Por favor el valor solicitado' }]}
              >
                <Input prefix={<DollarOutlined />} type="number" placeholder="Ingresos mesuales" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_of_housing_t_one"
                label="Tipo de vivienda"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de vivienda' }]}
              >
                <Select placeholder="Seleccione una opcion">
                  <Option value="0">Propia</Option>
                  <Option value="1">Arrendada</Option>
                  <Option value="2">Otra</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="vehicle_t_one"
                label="Vehicle"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="it_financial_t_one"
                label="Acudiente financiero"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Tutor 2',
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name_t_two"
                label="Nombre tutor"
                rules={[{ required: true, message: 'Por favor ingrese el nombre tutor dos' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name_t_two"
                label="Apellido tutor"
                rules={[{ required: true, message: 'Por favor ingrese el apellido tutor dos' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Apellido tutor" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email_t_two"
                label="Correo Electrónico tutor"
                rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo electrónico válido' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo Electrónico tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_document_t_two"
                label="Tipo de Documento tutor"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de documento tutor' }]}
              >
                <Select placeholder="Seleccione el tipo de documento">
                  <Option value="0">Cédula</Option>
                  <Option value="1">Tarjeta de identidad</Option>
                  <Option value="2">Pasaporte</Option>
                  <Option value="3">Otro</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="document_number_t_two"
                label="Número de documento tutor"
                rules={[{ required: true, message: 'Por favor ingrese el número de documento tutor' }]}
              >
                <Input prefix={<IdcardOutlined  />} type="number" placeholder="Número de documento tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar_t_two"
                label="Foto tutor"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor suba una foto tutor' }]}
              >
                <Upload {...propsTemplate('avatar_t_two')}>
                  <Button icon={<UploadOutlined />}>Subir Foto</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username_t_two"
                label="Username"
                rules={[{ required: true, message: 'Por favor ingrese el username del tutor' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username tutor" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar_url_t_two"
                label="Url avatar"
              >
                <Input prefix={<PictureOutlined />} placeholder="avatar url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_tutor_t_two"
                label="Telefono tutor dos"
                rules={[{ required: true, message: 'Por favor ingrese el numero de celular del tutor dos' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Telefono Tutor dos" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="profession_t_two"
                label="Profesion"
                rules={[{ required: true, message: 'Por favor ingrese la profesion del tutor dos' }]}
              >
                <Input prefix={<TrophyOutlined />} placeholder="Profesion tutor dos" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="workplace_t_two"
                label="Lugar de trabajo"
                rules={[{ required: true, message: 'Por favor ingrese el lugar de trabajo' }]}
              >
                <Input prefix={<TagsOutlined />} placeholder="Lugar de trabajo" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone_number_work_t_two"
                label="Numero de trabajo"
                rules={[{ required: true, message: 'Por favor ingrese el numero de trabajo' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Numero de trabajo" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="monthly_income_t_two"
                label="Ingreso mensual"
                rules={[{ required: true, message: 'Por favor el valor solicitado' }]}
              >
                <Input prefix={<DollarOutlined />} type="number" placeholder="Ingresos mesuales" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type_of_housing_t_two"
                label="Tipo de vivienda"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de vivienda' }]}
              >
                <Select placeholder="Seleccione una opcion">
                  <Option value="0">Propia</Option>
                  <Option value="1">Arrendada</Option>
                  <Option value="2">Otra</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="vehicle_t_two"
                label="Vehicle"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="it_financial_t_two"
                label="Acudiente financiero"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>

        </>
      ),
    },
    {
      title: 'Adicionales',
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="laterality"
                label="Lateralidad candidato"
                rules={[{ required: true, message: 'Por favor ingrese la lateralidad' }]}
              >
                <Select placeholder="Seleccione una opcion">
                  <Option value="0">Izquierdo</Option>
                  <Option value="1">Diestro</Option>
                  <Option value="2">Ambidiestro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="place_of_bird"
                label="Lugar de nacimiento candidato"
                rules={[{ required: true, message: 'Por favor ingrese el lugar de nacimiento' }]}

              >
                <Input prefix={<BankOutlined />} placeholder="Lugar de nacimiento" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="civil_registration"
                label="Registro Civil"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor suba documento' }]}
              >
                <Upload {...propsTemplate('civil_registration')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vaccination_card"
                label="Carnet Vacunas"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor suba documento' }]}
              >
                <Upload {...propsTemplate('vaccination_card')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="identity_card"
                label="Tarjeta de identidad"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor subir documento' }]}
              >
                <Upload {...propsTemplate('identity_card')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_newsletter"
                label="Ultimo Boletin"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor subir documento' }]}
              >
                <Upload {...propsTemplate('last_newsletter')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="work_record"
                label="Constancia Laboral Acudiente"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor subir documento' }]}
              >
                <Upload {...propsTemplate('work_record')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="photo_license"
                label="Foto perfil"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor subir documento' }]}
              >
                <Upload {...propsTemplate('photo_license')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="registration_receipt"
                label="Recibo pago inscripcion"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => Array.isArray(e) ? e : e && e.fileList}
                rules={[{ required: true, message: 'Por favor subir documento' }]}
              >
                <Upload {...propsTemplate('registration_receipt')}>
                  <Button icon={<UploadOutlined />}>Subir documento</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
          <div className="content">
            <h1>SSPC Matriculas</h1>
            <p>Gestor de Matriculas Estudiantiles</p>
            <Link to="/login"><button>Sitio Web</button></Link>
          </div>
          <div className="Logo">
            <img src={logo} alt="jose de la vega" />
          </div>
        </div>
        <div className="col-md-8 col-lg-6">
          <div className="inscription-form d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <Title level={2}>Formulario de Inscripción</Title>
                  <Form
                    method='POST'
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    encType="multipart/form-data"
                    initialValues={{ remember: true }}
                  >
                    <Steps current={currentStep}>
                      {steps.map((item, index) => (
                        <Step key={index} title={item.title} />
                      ))}
                    </Steps>
                    <div className="steps-content">{steps[currentStep].content}</div>
                    <div className="steps-action">
                      {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                          Continuar
                        </Button>
                      )}
                      {currentStep === steps.length - 1 && (
                        <Button type="primary" htmlType="submit">
                          Enviar
                        </Button>
                      )}
                      {currentStep > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                          Anterior
                        </Button>
                      )}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
