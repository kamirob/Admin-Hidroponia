import React, {useEffect, useState} from 'react'
import { Card, Row, Col, Form, notification, Select, Button, TimePicker} from 'antd';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';
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
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{marginTop:'2%', marginBottom:'2%'}}>
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
                                <Button
                                    onClick={() => save()}
                                    primary
                                    //disabled={(minutesOn == '' || minutesOff == '') ?  true : false}
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
            </Row>
        </div>
    )
}