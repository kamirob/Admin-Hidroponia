import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import './index.css'
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Col, Spin, Space} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {db} from '../../Config/Firebase'
import {useAuth} from '../../Providers/AuthContext'
import Logo from '../../assets/images/logo.png'

const Login = () => {
    const history = useHistory();

    
    const [admin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const { signin } = useAuth();
    const adminCollection = db.collection('Admin')


    useEffect(() => {
      const response = adminCollection
      .onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(documentSnapshot => {
          const { 
              email,
              role
          } = documentSnapshot.data();
          list.push({
              id: documentSnapshot.id,
              email,
              role
          });
      })
      setAdmin(list);
      setLoading(false);
         
      });
      return () => response();
    }, []);

    const loginUser = (event, email, password) => {
      event.preventDefault();
      setLoading(true);
      if(admin.map(x => (x.email)) == email){
        signin(email, password)
        .then(
          setLoading(false),
          history.push('/dashboard'),
        )
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
      } else {
        console.error('Usted no es administrador')
      }
      
      
    };


    const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;

      if(name === 'userEmail') {
        setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
    };

    if (loading){
      <Space size="middle">
        <Spin size="large" />
      </Space>
    }

  return (
    <>
      <Row type="flex" justify="center" align="middle" >
        <div style={{ justifyContent: 'center', marginTop:'10%'}}>
          <img
            className="logo-login"
            src={Logo}
          />
        </div>
      </Row>
      <Row type="flex" justify="center" align="middle" >
        <Col xs={20} sm={12} md={10} lg={10} xl={8} xxl={7}>
        <div style={{ justifyContent: 'center', marginTop:'10%'}}>
         
        
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
      
          >
            {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-6">{error}</div>}
            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa un email',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
                type="email" 
                size='large'
                name="userEmail"
                id="userEmail"
                value = {email}
                onChange = {(event) => onChangeHandler(event)}
              />
            </Form.Item>
            <Form.Item
              name="Contraseña"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa la contraseña',
                },
              ]}
            >
                
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                name="userPassword"
                size='large'
                id="userPassword"
                value = {password}
                onChange = {(event) => onChangeHandler(event)}
              />
            </Form.Item>
            

            <Form.Item>
              <Button 
                onClick={event => {
                  loginUser(event, email, password);
                }}
                type="primary" 
                size='large'
                style={{width:'100%'}}
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
        </Col>
      </Row>
    </>
  );
};
export default Login;