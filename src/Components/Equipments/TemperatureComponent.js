import React, { useState, useLayoutEffect } from 'react'
import { Card, Row, Col, Form, Select, InputNumber, notification, Button} from 'antd';
import {Temperature, PM, Humidity,} from 'react-environment-chart';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function TemperatureComponent(props) {

    var idLocale = require('dayjs/locale/es'); 
    var LocalizedFormat = require('dayjs/plugin/localizedFormat');
    dayjs.locale('es', idLocale);
    dayjs.extend(LocalizedFormat)

    const { Option } = Select;
    const [ tags, setTags] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState();
    const [nightTemperature, setNightTemperature] = useState(props.datain.Temperatura_Noche)
    const [dayTemperature, setDayTemperature] = useState(props.datain.Temperatura_Dia)

    useLayoutEffect(() => {
        tagsForm()
    }, [])
    
    const tagsForm = async () => {
        db.collection('Equipments').doc(props.data.id)
        .collection('ConfigurationForm').get()
        .then(response => {
        const fetchedNotifications = [];
        response.forEach(document => {
            const fetchedNotification = {
            ...document.data()
            };
            for (const k in fetchedNotification) fetchedNotifications.push({'e':k,'f':fetchedNotification[k]}) 
        });
            setTags(fetchedNotifications)
            //setDayTemperature(props.datain.Temperatura_Dia)
            console.log(fetchedNotifications)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
        });
    }

    function handleChange(value) {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Temperatura: value
        },{merge:true})
        .then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambia estado de temperatura a ' + value,
                title:'Temperatura',
                data:[{'estado':value}],
            }),
            notification.open({
                message: 'Temperatura',
                description:
                'Se cambió el estado de la temperatura',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
        console.log(`selected ${value}`);
    }

    const saveStatus = () => {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Temperatura_Dia: dayTemperature,
            Temperatura_Noche: nightTemperature,
        },{merge:true})
        .then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambian datos de temperatura, temperatura día a ' + dayTemperature + ' y temperatura noche ' + nightTemperature,
                title:'Temperatura',
                data:[{'temperaturaDia': dayTemperature, 'temperaturaNoche': nightTemperature}],
            }),
            //setDayTemperature(''), 
            //setNightTemperature(''),
            notification.open({
                message: 'Cambio de temperatura',
                description:
                'El cambio de temperatura se hizo correctamente',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
    }


    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{marginTop:'2%', marginBottom:'8%'}}>
                            <Select placeholder="Cambiar estado" style={{ width: 180 }} onChange={handleChange}>
                                <Option value="true">On</Option>
                                <Option value="false">Off</Option>
                                <Option value="auto">Auto</Option>
                            </Select>
                        </div>
                        {props.datain.Temperatura !== 'auto' ? (
                            <div style={{marginTop:'8%'}}>
                                {props.datain.Ventilacion !== 'false' ? (
                                    <Form.Item label="Ventilación">
                                        <Button size='middle' type='primary' style={{backgroundColor:'green', borderColor:'green'}}>
                                            ON
                                        </Button>
                                    </Form.Item>
                                ):(
                                    <Form.Item label="Ventilación">
                                        <Button size='middle' type='danger' style={{backgroundColor:'red', borderColor:'red'}}>
                                            OFF
                                        </Button>
                                    </Form.Item>
                                        
                                )}
                            </div>
                        ):(
                            <Form
                                layout="horizontal"
                                size="large"
                            >
                                <Form.Item label={"Temperatura día"} >
                                    <InputNumber 
                                        precision={1}
                                        placeholder={props.datain.Temperatura_Dia}
                                        step={0.1}
                                        min={1}
                                        max={100}
                                        size='large'  
                                        value = {dayTemperature}
                                        onChange = {(dayTemperature) => setDayTemperature(dayTemperature)}
                                    />
                                </Form.Item>
                                <Form.Item label={"Temperatura noche"}>
                                    <InputNumber
                                        placeholder={props.datain.Temperatura_Noche}
                                        precision={1}
                                        step={0.1}
                                        size='large'
                                        name="nightTemperaturee"
                                        id="nightTemperature"
                                        value={nightTemperature}
                                        onChange = {(nightTemperature) => setNightTemperature(nightTemperature)}
                                    />
                                </Form.Item>
                                <Button
                                    onClick={() => saveStatus()}
                                    primary
                                    disabled={(dayTemperature == '' || nightTemperature == '') ?  true : false}
                                    style={{marginTop:'8%'}} 
                                    type='primary'
                                    shape='round' 
                                    size='large' 
                                    key="1"
                                >
                                    Guardar
                                </Button>
                            
                            </Form>
                        )}
                    </Card>
                </Col>   
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Humedad' style={{margin:'2%', minHeight:'50vh'}}>     
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.datarpi.HumExt} 
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{'Externa '+props.datarpi.HumExt+' %'}</h1>

                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.datarpi.HumInt} 
                            />
                        </div>
                        <h1 style={{textAlign:'center'}}>{'Interna '+props.datarpi.HumInt+' %'}</h1>
                    </Card>
                </Col>    
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Temperatura' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.datarpi.TempExt} 
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{'Externa '+props.datarpi.TempExt+' °C'}</h1>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.datarpi.TempInt} 
                            />
                        </div>
                        <h1 style={{textAlign:'center'}}>{'Interna '+props.datarpi.TempInt+' °C'}</h1>
                    </Card>
                </Col>   
            </Row>
        </div>
    )
}
