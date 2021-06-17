import React, {useState} from 'react'
import { Card, Row, Col, Form, notification, InputNumber, Switch, Button} from 'antd';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function Flush(props) {

    const [flush, setFlush] = useState(props.datain.Flush)

    const save = () => {
        db.collection('Equipments')
        .doc(props.data.id)
        .collection('DataApp')
        .doc(props.data.id)
        .set({
            Flush: flush,
            Flush_Comando:'true'
        },{merge:true})
        .then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambia alor de flush a ' + flush,
                title:'Flush',
                data:[{'flush':flush}],
            }),
            notification.open({
                message: 'Flush',
                description:
                'Se cambió valor de flush a ' + flush,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        )
    }

    return (
        <div style={{marginBottom:'3%'}}>  
        <p>{props.datarpi.Flush_Estado} </p>
            <Card title='Variables' style={{marginTop:'5%'}}>
                <Row type="flex">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="Flush (min)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {flush}
                                    onChange = {(flush) => setFlush(flush)}
                                />
                                <Button type='primary' onClick={save}>Encender</Button>
                                {props.datarpi.Flush_Estado === 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}} >ON</Button>
                                ):(
                                    <Button type='primary' danger>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="Alarma de nivel">
                                {props.datarpi.Flush_Level === 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}} >ON</Button>
                                ):(
                                    <Button type='primary' danger>Off</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Col>   
                </Row>
            </Card>
        </div>
    )
}