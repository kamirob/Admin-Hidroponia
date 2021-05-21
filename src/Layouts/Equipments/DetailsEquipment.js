import React, {useEffect, useState} from 'react'
import {useHistory } from 'react-router-dom'
import { PageHeader, Typography, Tag, Tabs, Button, Statistic, Descriptions  } from 'antd';
import {db} from '../../Config/Firebase'
import TemperatureComponent from '../../Components/Equipments/TemperatureComponent';

export default function DetailsEquipment() {
    const { Title, Text} = Typography;
    const { TabPane } = Tabs;
    const history = useHistory();

    const idEquipment = history.location.state.idEquipment
    const name = history.location.state.name
    const grow= history.location.state.grow
    const state = history.location.state.state
    
    const [date,setDate] = useState(new Date());
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState();
    const [ equipment, setEquipment] = useState([]);
    
    useEffect(() => {
        getEquipment()
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    const getEquipment = () => {
         
        db.collection("Equipments").doc(idEquipment)
        .onSnapshot((doc) => {
            setEquipment(doc.data());
        });
        setLoading(false)
       
    };


    const renderContent = (column = 2) => (
        <Descriptions size="large" column={column}>
          <Descriptions.Item label="Cultivo">{grow}</Descriptions.Item>
          <Descriptions.Item label="Identificador">
            <a>{idEquipment}</a>
          </Descriptions.Item>
          <Descriptions.Item label="Agregado el">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Activo desde">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Último log">
            hbhsbkjbsjkvbsjkbsdjkvbsjkvsbvjksdbv
          </Descriptions.Item>
          <Descriptions.Item label="Fecha último log">2017-10-10</Descriptions.Item>

        </Descriptions>
    );
      
    const extraContent = (
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            justifyContent: 'flex-end',
          }}
        >
          {/**<Statistic
            title="Estado"
            value={state == 'inactive' ? 'Inactivo' : 'Activo'}
            style={{
              marginRight: 32,
            }}
          />
          <Statistic title="Fecha" value={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()} />**/}
        </div>
    );
      
    const Content = ({ children, extra }) => (
        <div className="content">
          <div className="main">{children}</div>
          <div className="extra">{extra}</div>
        </div>
    );

    return(
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={<Title level={2} style={{marginTop:'8%'}}>{name}</Title>}
                extra={
                    state == 'inactive' ? (
                        <Button 
                            type='primary' 
                            style={{marginTop:'8%'}} 
                            shape='round' 
                            size='large' 
                            key="1"
                        >
                            Activar
                        </Button>
                    ):(
                        <Button 
                            danger 
                            style={{marginTop:'8%'}} 
                            type='primary' 
                            shape='round' 
                            size='large' 
                            key="1"
                        >
                            Desactivar
                        </Button>
                    )     
                }
                footer={
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Temperatura" key="1" >
                            <div style={{marginTop:'2%'}} >
                                <TemperatureComponent data={equipment} />
                            </div>
                        </TabPane>
                        <TabPane tab="Ventilación" key="2" />
                        <TabPane tab="Horas de Luz" key="3" />
                        <TabPane tab="EC y pH" key="4" />
                        <TabPane tab="Bombeo nutrientes" key="5" />
                        <TabPane tab="Flush" key="6" />
                    </Tabs>
                }
                >
                <Content extra={extraContent}>{renderContent()}</Content>
            </PageHeader>

        </div>
    )
}
