import React from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';
import {Temperature, PM, Humidity,} from 'react-environment-chart';

export default function TemperatureComponent(props) {
    
    return (
        <div style={{marginBottom:'3%'}}>
        {/**<Temperature 
            height={400} 
            tips={['Congelado', 'Frío', 'Estable', 'Peligro']}
            value={props.data.TempExt}
        />
        <PM value={props.data.TempExt} />**/}
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'100%'}}>
                    <Form
                       
                        layout="horizontal"
                        size="large"
                    >
                        
                        <Form.Item label="Temperatura día">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Temperatura noche">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Calefacción">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Refrigeración">
                            <Switch />
                        </Form.Item>
                       
                    </Form>
                    </Card>
                </Col>   
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Humedad' style={{margin:'2%'}}>
                        <Humidity 
                            height={80}  
                            tips={[' ', ' ', ' ']}
                            value={props.data.HumExt} 
                        />
                        <h1>{'Externa '+props.data.HumExt+' °C'}</h1>

                        <Humidity 
                            height={80}  
                            tips={[' ', ' ', ' ']}

                            value={props.data.HumInt} 
                        />
                        <h1>{'Interna '+props.data.HumInt+' °C'}</h1>
                    </Card>
                </Col>    
                <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Temperatura' style={{margin:'2%'}}>
                        <Humidity 
                            height={80}  
                            tips={[' ', ' ', ' ']}
                            value={props.data.HumExt} 
                        />
                        <h1>{'Externa '+props.data.HumExt+' °C'}</h1>

                        <Humidity 
                            height={80}  
                            tips={[' ', ' ', ' ']}

                            value={props.data.HumInt} 
                        />
                        <h1>{'Interna '+props.data.HumInt+' °C'}</h1>
                    </Card>
                </Col>   
            </Row>
            
        </div>
    )
}
