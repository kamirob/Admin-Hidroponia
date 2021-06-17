import React, {useEffect, useState} from 'react'
import { Card, Row, Col, Form, notification, Select, Button, TimePicker} from 'antd';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';
import {Humidity} from 'react-environment-chart';
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function HoursLight(props) {

    var idLocale = require('dayjs/locale/es'); 
    var LocalizedFormat = require('dayjs/plugin/localizedFormat');
    dayjs.locale('es', idLocale);
    dayjs.extend(LocalizedFormat)

    const { Option } = Select;

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')


    function handleChangeState(value) {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Luz: value
        },{merge:true})
        .then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambia estado de luz a ' + value,
                title:'Luz',
                data:[{'estado':value}],
            }),
            notification.open({
                message: 'Luz',
                description:
                'Se cambió el estado de la luz',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
    }

    const save = () => {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Luz_Inicio: startTime,
            Luz_Fin: endTime,
        },{merge:true})
        .then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambian datos de luz, inicia a las ' + startTime + ' y termina a las ' + endTime,
                title:'Ventilación',
                data:[{'luzInicio': startTime, 'luzFin': endTime}],
            }),
            notification.open({
                message: 'Cambio exitoso',
                description:
                'Se ha cambiado el inicio y fin de la luz',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
    }

    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{marginTop:'2%', marginBottom:'10%'}}>
                            <Select placeholder="Cambiar estado" style={{ width: 180 }} onChange={handleChangeState}>
                                <Option value="true">On</Option>
                                <Option value="false">Off</Option>
                                <Option value="auto">Auto</Option>
                            </Select>
                        </div>
                        {props.datain.Luz !== 'auto' ? (
                            <>
                            {props.datain.Luz == 'true' && (
                                <Form.Item label="Luz">
                                    <Button size='middle' type='primary' style={{backgroundColor:'green', borderColor:'green'}}>
                                        ON
                                    </Button>
                                </Form.Item>
                            )}
                            {props.datain.Luz == 'false' && (
                                <Form.Item label="Luz">
                                    <Button size='middle' type='primary' style={{backgroundColor:'red', borderColor:'red'}}>
                                        OFF
                                    </Button>
                                </Form.Item>
                            )}
                            {props.datain.Luz == 'auto' && (
                                <Form.Item label="Luz">
                                    <Button size='middle' type='ghost'>
                                        AUTO
                                    </Button>
                                </Form.Item>
                            )}
                            </>
                        ):(
                            <Form
                            layout="horizontal"
                            size="large"
                            >
                                <Form.Item label="Hora de inicio">
                                    <TimePicker 
                                        defaultValue={dayjs('2021-05-21 ' + props.datain.Luz_Inicio)} 
                                        format={'HH:mm'}
                                        onChange={(time) => setStartTime(dayjs(time).format('HH:mm'))} 
                                    />
                                </Form.Item>
                                <Form.Item label="Hora de fin">
                                    <TimePicker 
                                        defaultValue={dayjs('2021-05-21 ' + props.datain.Luz_Fin)}
                                        format={'HH:mm'}
                                        onChange={(endTime) => setEndTime(dayjs(endTime).format('HH:mm'))} 
                                    />

                                </Form.Item>
                                {props.datarpi.Luz_Estado == 'true' ? (
                                    <Form.Item label="Luz">
                                        <Button size='middle' type='primary' style={{backgroundColor:'green', borderColor:'green'}}>
                                            ON
                                        </Button>
                                    </Form.Item>
                                ):(
                                    <Form.Item label="Luz">
                                        <Button size='middle' type='primary' danger >
                                            OFF
                                        </Button>
                                    </Form.Item>
                                )}
                                <Button
                                    onClick={() => save()}
                                    primary
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