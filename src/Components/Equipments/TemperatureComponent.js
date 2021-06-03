import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';
import {Temperature, PM, Humidity,} from 'react-environment-chart';
import {db} from '../../Config/Firebase'

export default function TemperatureComponent(props) {

    const [nightTemperature, setNightTemperature] = useState('')
    const [dayTemperature, setDayTemperature] = useState('')
    const [ tags, setTags] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState();

    useEffect(() => {
        tagsForm()
        console.log(props.data.id)
    }, [])
    
    const tagsForm = async () => {
        db.collection('Equipments').doc(props.data.id)
        .collection('ConfigurationForm').get()
        .then(response => {
        const fetchedNotifications = [];
        const config = [];
        response.forEach(document => {
            const fetchedNotification = {
            ...document.data()
            };
            //fetchedNotifications.push(fetchedNotification) 
            for (const k in fetchedNotification) fetchedNotifications.push({'e':k,'f':fetchedNotification[k]}) 
        });
            /**fetchedNotifications.map((e) => {
                config.push(e)
                console.log(e)
            })**/
            setTags(fetchedNotifications)
            console.log(fetchedNotifications)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
        });
    }

    const saveStatus = () => {
        db.collection('Equipments')
        .doc(props.data.id)
        .update({
            D09: dayTemperature
        })
    }

    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        
                        <Form
                            layout="horizontal"
                            size="large"
                        >
                            <Form.Item label="Temperatura día">
                                <InputNumber 
                                    size='large'
                                    name="dayTemperature"
                                    id="dayTemperature"
                                    value = {dayTemperature}
                                    onChange = {(dayTemperature) => setDayTemperature(dayTemperature)}
                                />
                            </Form.Item>
                            <Form.Item label="Temperatura noche">
                                <InputNumber
                                    size='large'
                                    name="nightTemperaturee"
                                    id="nightTemperature"
                                    value = {nightTemperature}
                                    onChange = {(nightTemperature) => setNightTemperature(nightTemperature)}
                                />
                            </Form.Item>
                            <Form.Item label="Ventilación">
                                <Button type='primary'  shape='round' style={{backgroundColor:'green', borderColor:'green'}}>
                                    Activo
                                </Button>
                            </Form.Item>
                            <Button
                                onClick={() => saveStatus()}
                                primary
                                style={{marginTop:'8%'}} 
                                type='primary'
                                shape='round' 
                                size='large' 
                                key="1"
                            >
                                Guardar
                            </Button>
                        
                        </Form>
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
                        <h1 style={{textAlign:'center'}}>{'Externa '+props.data.HumExt+' °C'}</h1>

                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <Humidity 
                                height={80}  
                                tips={[' ', ' ', ' ']}
                                value={props.data.HumInt} 
                            />
                        </div>
                        <h1 style={{textAlign:'center'}}>{'Interna '+props.data.HumInt+' °C'}</h1>
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
