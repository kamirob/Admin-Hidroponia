import React, {useContext, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect} from "react-router-dom";
import { Layout, Menu, Row, Button, Col } from 'antd';
import {
  MenuOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined 
} from '@ant-design/icons';
import {auth} from '../../Config/Firebase'
import Logo from '../../assets/images/logo.png'
import './index.css'
import Login from "../Authentication/Login";
import AuthProvider from '../../Providers/AuthContext';
import Dashboard from "../Content/Dashboard";
import ControlPanel from "../ControlPanel/ControlPanel";
import ListEquipments from "../Equipments/ListEquipments";
import ListUsers from "../Users/ListUsers";
import DetailsEquipment from "../Equipments/DetailsEquipment";
import ConfigFormEquipment from "../Equipments/ConfigFormEquipment";
import ActivateEquipment from "../../Components/Equipments/ActivateEquipment";


const { Header, Content, Footer, Sider } = Layout;
const { Item, SubMenu } = Menu;

function Application() {
    const history = useHistory();
    const currentUser = useContext(AuthProvider);
    const [collapsed, setCollapsed] = useState(true);
   
    const toggle = () => {
        setCollapsed(!collapsed)
    };

    const signOutUser = async(e) => {
        e.preventDefault();
        await auth.signOut()
        .then(() => history.push("/"))
        .catch(console.log())
    }

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed({ collapsed });
    };


    return (
        auth.currentUser ?
        <Router>
            <Layout >
                <Sider 
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                <div>
                    <img
                        style={{width:'20%', height:'20%', alignItems:'center', margin:'4%', marginLeft:'35%', marginTop:'5%', marginBottom:'8%'}}
                        src={Logo}
                    />
                </div>
                    <Menu theme="dark" mode="inline">

                        <Menu.Item key="1" icon={<DashboardOutlined/>}>
                            <Link to="/dashboard">
                                Dashboard
                            </Link> 
                        </Menu.Item>
                        <Menu.Item key="2" icon={<OrderedListOutlined />}>
                            <Link to="/equipments">
                                Equipos
                            </Link> 
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
                            <Link to="/users">
                                Usuarios
                            </Link> 
                        </Menu.Item>
                      
                        {/**<SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="Usuarios">
                            <Menu.Item key="4" >
                                <Link to="/students">
                                    Estudiantes
                                </Link> 
                            </Menu.Item>
                            <Menu.Item key="5" >
                                <Link to="/teachers">
                                    Profesores
                                </Link> 
                            </Menu.Item>
                        </SubMenu>
                       
                        {/**<Menu.Item key="7" icon={<FundViewOutlined />}>
                            <Link to="/offers">
                                Ofertas
                            </Link> 
                        </Menu.Item>
                        <Menu.Item key="8" icon={<DollarOutlined />}>
                            <Link to="/payment-methods">
                                Métodos de pago
                            </Link> 
                        </Menu.Item>**/}
                    </Menu>
                </Sider>
                <Layout className="site-layout" >
                    <Header className="site-layout-sub-header-background"/**className="site-layout-background"**/ >
                        <Row>
                            <Col xs={20} sm={18} md={20} lg={20} xl={20} xxl={22}>
                                {/**<Menu mode="horizontal" selectable={false} >
                                    {React.createElement(collapsed ? MenuOutlined  : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: toggle,
                                    })}
                                </Menu>**/}
                            </Col>
                            <Col xs={4} sm={6} md={4} lg={4} xl={4} xxl={2}>
                                <Menu mode="horizontal" selectable={false} className="menu">
                                    <Item key="1">
                                        <Button onClick={signOutUser} type="primary">Salir</Button>
                                    </Item>
                                </Menu>
                            </Col>
                        </Row>
                    
                    </Header>
                    <Content style={{padding:'2%', minHeight:'100vh'}}/**style={{ padding:'3%', height: '150%' }}**/>
                        <div className="site-layout-background" style={{ padding: '2%'}}/**style={{ height: '150%', padding:'3%' }}**/>
                            <Switch>
                                <Route 
                                    exact path="/"
                                    component={Login}
                                /> 
                                <Route 
                                    exact path="/dashboard"
                                    component={Dashboard}
                                />
                                <Route 
                                    exact path="/equipments"
                                    component={ListEquipments}
                                />
                                <Route 
                                    exact path="/equipments/:id/activate"
                                    component={ActivateEquipment}
                                />
                                <Route 
                                    exact path="/equipments/:id/details"
                                    component={DetailsEquipment}
                                />
                                <Route 
                                    exact path="/equipments/config"
                                    component={ConfigFormEquipment}
                                />
                                <Route 
                                    exact path="/users"
                                    component={ListUsers}
                                />
                                <Route 
                                    exact path="/control-panel"
                                    component={ControlPanel}
                                />
                                <Redirect to="/equipments/"/>
                            </Switch>
                        </div> 
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>AdminWeb ©2021 por Camilo Bastidas</Footer>
                </Layout>
            </Layout>
            
        </Router>
        :
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    component={Login}
                /> 
            </Switch>
           
        </Router>
    );
}
export default Application;