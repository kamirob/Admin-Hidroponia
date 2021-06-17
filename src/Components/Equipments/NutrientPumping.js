import React, {useState} from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function NutrientPumping(props) {

    const [BBA1On, setBBA1On] = useState(props.datain.BBA1)
    const [BBA2On, setBBA2On] = useState(props.datain.BBA2)
    const [BBA3On, setBBA3On] = useState(props.datain.BBA3)
    const [BBA4On, setBBA4On] = useState(props.datain.BBA4)
    const [BBA5On, setBBA5On] = useState(props.datain.BBA5)
    const [BBA6On, setBBA6On] = useState(props.datain.BBA6)
    const [Ag1, setAg1] = useState(props.datain.Ventilacion_Min_On)
    const [Ag2, setAg2] = useState(props.datain.Ventilacion_Min_On)

    const saveBBA = (BBA, value) => {
        {value == 'BBA1' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA1: BBA,
                BBA1_Comando: 'true'
            },{merge:true})
        )}
        {value == 'BBA2' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA2: BBA,
                BBA2_Comando: 'true'
            },{merge:true})
        )}
        {value == 'BBA3' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA3: BBA,
                BBA3_Comando: 'true'
            },{merge:true})
        )}
        {value == 'BBA4' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA4: BBA,
                BBA4_Comando: 'true'
            },{merge:true})
        )}
        {value == 'BBA5' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA5: BBA,
                BBA5_Comando: 'true'
            },{merge:true})
        )}
        {value == 'BBA6' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                BBA6: BBA,
                BBA6_Comando: 'true'
            },{merge:true})
        )}
        {/**.then(
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('Logs')
            .add({
                date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                description: ' Se cambian datos de ventilación, minutos ON a ' + minutesOn + ' y minutos OFF a ' + minutesOff,
                title:'Ventilación',
                data:[{'minutosOn':minutesOn, 'minutosOff':minutesOff}],
            }),
            notification.open({
                message: 'Ventilación automática',
                description:
                'Se cambió el estado de la ventilación',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
        ) */}
    }

    const saveAg = (Ag, value) => {
        {value == 'Ag1' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                Ag1: Ag,
                Agitador1_Comando: 'true'
            },{merge:true})
        )}
        {value == 'Ag2' && (
            db.collection('Equipments')
            .doc(props.data.id)
            .collection('DataApp')
            .doc(props.data.id)
            .set({
                Ag2: Ag,
                Agitador2_Comando: 'true'
            },{merge:true})
        )}
    }

    return (
        <div style={{marginBottom:'3%'}}>  
            <Card title='Variables' style={{marginTop:'5%'}}>
                <Row type="flex">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="BBA1 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA1On}
                                    onChange = {(BBA1On) => setBBA1On(BBA1On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA1On, 'BB1') }>Encender</Button>
                                {props.datarpi.BBA1_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="BBA2 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA2On}
                                    onChange = {(BBA2On) => setBBA2On(BBA2On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA2On, 'BBA2') }>Encender</Button>
                                {props.datarpi.BBA2_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="BBA3 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA3On}
                                    onChange = {(BBA3On) => setBBA3On(BBA3On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA3On, 'BBA3') }>Encender</Button>
                                {props.datarpi.BBA3_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="Agitador1 (min)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {Ag1}
                                    onChange = {(Ag1) => setAg1(Ag1)}
                                />
                                <Button type='primary' onClick={() => saveAg(Ag1, 'Ag1') }>Encender</Button>
                                {props.datarpi.Agitador1_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Col>   
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="BBA4 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA4On}
                                    onChange = {(BBA4On) => setBBA4On(BBA4On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA4On, 'BBA4') }>Encender</Button>
                                {props.datarpi.BBA4_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="BBA5 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA5On}
                                    onChange = {(BBA5On) => setBBA5On(BBA5On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA5On, 'BBA5') }>Encender</Button>
                                {props.datarpi.BBA5_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="BBA6 (seg)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {BBA6On}
                                    onChange = {(BBA6On) => setBBA6On(BBA6On)}
                                />
                                <Button type='primary' onClick={() => saveBBA(BBA6On, 'BBA6') }>Encender</Button>
                                {props.datarpi.BBA6_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                            <Form.Item label="Agitador2 (min)">
                                <InputNumber
                                    step={1}
                                    min={1}
                                    size='large'
                                    value = {Ag2}
                                    onChange = {(Ag2) => setAg2(Ag2)}
                                />
                                <Button type='primary' onClick={() => saveAg(Ag2, 'Ag2') }>Encender</Button>
                                {props.datarpi.Agitador2_Estado == 'true' ? (
                                    <Button type='primary' style={{backgroundColor:'green', borderColor:'green', marginLeft:'1%'}}>ON</Button>
                                ):(
                                    <Button type='primary' danger style={{marginLeft:'1%'}}>Off</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Col> 
                </Row>
            </Card>
        </div>
    )
}