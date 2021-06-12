import React, {useState} from 'react'
import { Card, Row, Col, Form, notification, InputNumber, Select, Button} from 'antd';
import {db} from '../../Config/Firebase'
import {Humidity} from 'react-environment-chart';
import {SmileOutlined} from '@ant-design/icons';

export default function VentilationComponent(props) {
    const { Option } = Select;

    const [minutesOn, setMinutesOn] = useState(props.datain.Ventilacion_Min_On)
    const [minutesOff, setMinutesOff] = useState(props.datain.Ventilacion_Min_Off)


    function handleChange(value) {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Ventilacion: value
        },{merge:true})
        .then(
            notification.open({
                message: 'Ventilación',
                description:
                'Se cambió el estado de la ventilación',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
        console.log(`selected ${value}`);
    }

    const save = () => {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Ventilacion_Min_On: minutesOn,
            Ventilacion_Min_Off: minutesOff,
        },{merge:true})
        .then(
            setMinutesOn(''),
            setMinutesOff(''),
            notification.open({
                message: 'Ventilación automática',
                description:
                'Se cambió el estado de la ventilación',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
    }

    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{marginTop:'2%', marginBottom:'2%'}}>
                            <Select placeholder="Cambiar estado" style={{ width: 180 }} onChange={handleChange}>
                                <Option value="true">On</Option>
                                <Option value="false">Off</Option>
                                <Option value="auto">Auto</Option>
                            </Select>
                        </div>

                        {props.datain.Ventilacion !== 'auto' ? (
                            <>
                                {props.datain.Ventilacion == 'true' && (
                                    <Form.Item label="Ventilación">
                                        <Button size='middle' type='primary' style={{backgroundColor:'green', borderColor:'green'}}>
                                            ON
                                        </Button>
                                    </Form.Item>
                                )}
                                {props.datain.Ventilacion == 'false' && (
                                    <Form.Item label="Ventilación">
                                        <Button size='middle' type='primary' style={{backgroundColor:'red', borderColor:'red'}}>
                                            OFF
                                        </Button>
                                    </Form.Item>
                                )}
                                {props.datain.Ventilacion == 'auto' && (
                                    <Form.Item label="Ventilación">
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
                            <Form.Item label="Minutos ON">
                                <InputNumber
                                    placeholder={props.datain.Ventilacion_Min_On}
                                    step={1}
                                    min={1}
                                    size='large'
                                    name="dayTemperature"
                                    id="dayTemperature"
                                    value = {minutesOn}
                                    onChange = {(minutesOn) => setMinutesOn(minutesOn)}
                                />
                            </Form.Item>
                            <Form.Item label="Minutos OFF">
                                <InputNumber
                                    placeholder={props.datain.Ventilacion_Min_Off}
                                    step={1}
                                    min={1}
                                    size='large'
                                    name="dayTemperature"
                                    id="dayTemperature"
                                    value={minutesOff}
                                    onChange = {(minutesOff) => setMinutesOff(minutesOff)}
                                />
                            </Form.Item>
                            {props.datain.Ventilacion == 'true' && (
                                <Form.Item label="Ventilación">
                                    <Button size='middle' type='primary' style={{backgroundColor:'green', borderColor:'green'}}>
                                        ON
                                    </Button>
                                </Form.Item>
                            )}
                            {props.datain.Ventilacion == 'false' && (
                                <Form.Item label="Ventilación">
                                     <Button size='middle' type='primary' style={{backgroundColor:'red', borderColor:'red'}}>
                                        OFF
                                    </Button>
                                </Form.Item>
                            )}
                            {props.datain.Ventilacion == 'auto' && (
                                <Form.Item label="Ventilación">
                                     <Button size='middle' type='ghost'>
                                        AUTO
                                    </Button>
                                </Form.Item>
                            )}
                            <Button
                                onClick={() => save()}
                                primary
                                disabled={(minutesOn == '' || minutesOff == '') ?  true : false}
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
                                value={props.data.HumExt} 
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{'Externa '+props.data.HumExt+' %'}</h1>

                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.data.HumInt} 
                            />
                        </div>
                        <h1 style={{textAlign:'center'}}>{'Interna '+props.data.HumInt+' %'}</h1>
                    </Card>
                </Col>    
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Temperatura' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.data.TempExt} 
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{'Externa '+props.data.TempExt+' °C'}</h1>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.data.TempInt} 
                            />
                        </div>
                        <h1 style={{textAlign:'center'}}>{'Interna '+props.data.TempInt+' °C'}</h1>
                    </Card>
                </Col>    
            </Row>
        </div>
    )
}