import React, {useEffect, useState} from 'react'
import {useHistory } from 'react-router-dom'
import { PageHeader, Typography, Tag, Tabs, Button, Statistic, Descriptions, Row, Col } from 'antd';
import {
    SettingOutlined
  } from '@ant-design/icons';
import {db} from '../../Config/Firebase'
import TemperatureComponent from '../../Components/Equipments/TemperatureComponent';
import VentilationComponent from '../../Components/Equipments/VentilationComponent';
import HoursLight from '../../Components/Equipments/HoursLight';
import NutrientPumping from '../../Components/Equipments/NutrientPumping';
import Flush from '../../Components/Equipments/Flush';
import EcpHComponent from '../../Components/Equipments/EcpHComponent';

export default function DetailsEquipment() {
    const { Title, Text} = Typography;
    const { TabPane } = Tabs;
    const history = useHistory();

    const idEquipment = history.location.state.idEquipment
    const name = history.location.state.name
    const grow= history.location.state.grow
    const status = history.location.state.status
    
    const [date,setDate] = useState(new Date());
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState();
    const [ equipment, setEquipment] = useState([]);
    const [ dataApp, setDataApp] = useState([]);
    const [ dataRpi, setDataRpi] = useState([]);

    
    useEffect(() => {
        getDataRpi()
        dateActual()
        getDataApp()
        const unsubscribe = db.collection('Equipments').where('id', '==', idEquipment).onSnapshot(snap => {
            //const data = snap.docs.map(doc => doc.data())
            snap.forEach(doc => {
                setEquipment(doc.data())
                //console.log(doc.data())
            })
        });
        return () => unsubscribe()
    },[]);

    const dateActual = () => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    }

    const getDataApp = async() => {
        try{
            db.collection('Equipments').doc(idEquipment).collection('DataApp').onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    setDataApp(doc.data())
                })
            });
        }catch(e){
            console.log(e)
        }  
    } 

    const getDataRpi = async() => {
        try{
            db.collection('Equipments').doc(idEquipment).collection('DataRpi').onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    setDataRpi(doc.data())
                })
            });
        }catch(e){
            console.log(e)
        }  
    } 


    const renderContent = (column = 1) => (
        <Row type="flex" justify="space-between" align="middle" >
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Descriptions size="small" column={column}>
                    <Descriptions.Item label="Identificador">
                        <a>{idEquipment}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Agregado el">2017-01-10</Descriptions.Item>
                </Descriptions>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Descriptions size="small" column={column}>
                    <Descriptions.Item label="Último log">
                        hbhsbkjbsjkvbsjkbsdjkvbsjkvsbvjksdbv
                    </Descriptions.Item>
                    <Descriptions.Item label="Fecha último dato">{equipment.LastData}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );

    const extraContent = (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
                marginBottom:'2%'
            }}
        >
            <Statistic
                title="Estado"
                value={status == 'inactive' ? 'Inactivo' : 'Activo'}
                style={{
                marginRight: 32,
                }}
            />
            <Statistic title="Fecha" value={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()} />
        </div>
    );
    const Content = ({ children, extra }) => (
        <div className="content">
            <div className="extra">{extra}</div>
            <div className="main">{children}</div>
        </div>
    );

    return(
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={<Title level={2} style={{marginTop:'8%'}}>{name}</Title>}
                extra={[ 
                    <Button 
                        onClick={() => history.push({
                            pathname: '/equipments/' + idEquipment + '/activate', 
                            state: { 
                            idEquipment: idEquipment,
                            }
                        })} 
                        style={{marginTop:'8%'}} 
                        type='primary' 
                        shape='round' 
                        icon={<SettingOutlined />}
                        size='large' 
                        key="1"
                    >
                        Configuración
                    </Button>,
                    
                    <Button 
                        danger 
                        style={{marginTop:'8%'}} 
                        type='primary' 
                        shape='round' 
                        size='large' 
                        key="2"
                    >
                        Desactivar
                    </Button>
                ]}
                footer={
                    <Tabs defaultActiveKey="1" size='large'>
                        <TabPane tab="EC y pH" key="1">
                            <div style={{marginTop:'2%'}} >
                                <EcpHComponent/>
                            </div>
                        </TabPane>
                        <TabPane tab="Ventilación" key="2" >
                            <div style={{marginTop:'2%'}} >
                                <VentilationComponent datain={dataApp} data={equipment} datarpi={dataRpi} />
                            </div>
                        </TabPane>
                        <TabPane tab="Temperatura" key="3">
                            <div style={{marginTop:'2%'}} >
                                <TemperatureComponent datain={dataApp} data={equipment} datarpi={dataRpi} />
                            </div>
                        </TabPane>
                        <TabPane tab="Horas de luz" key="4">
                            <div style={{marginTop:'2%'}}>
                                <HoursLight datain={dataApp} data={equipment} datarpi={dataRpi}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Bombeo nutrientes" key="5" >
                            <div style={{marginTop:'2%'}} >
                                <NutrientPumping datain={dataApp} data={equipment} datarpi={dataRpi} />
                            </div>    
                        </TabPane>
                        <TabPane tab="Flush" key="6" >
                            <div style={{marginTop:'2%'}} >
                                <Flush datarpi={dataRpi} datain={dataApp} data={equipment} />
                            </div>  
                        </TabPane>
                    </Tabs>
                }
                >
                <Content extra={extraContent}>{renderContent()}</Content>
            </PageHeader>

        </div>
    )
}
