import React, {useState} from 'react'
import { Card, Row, Col, Form, InputNumber, notification, Button} from 'antd';
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
    const [Ag1, setAg1] = useState(props.datain.Ag1)
    const [Ag2, setAg2] = useState(props.datain.Ag2)

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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA1 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA1':BBA}],
                }),
                notification.open({
                    message: 'BBA1',
                    description:
                    'Se cambió valor de BBA 1 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA2 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA2':BBA}],
                }),
                notification.open({
                    message: 'BBA2',
                    description:
                    'Se cambió valor de BBA2 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA3 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA3':BBA}],
                }),
                notification.open({
                    message: 'BBA3',
                    description:
                    'Se cambió valor de BBA3 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA4 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA4':BBA}],
                }),
                notification.open({
                    message: 'BBA4',
                    description:
                    'Se cambió valor de BBA4 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA5 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA5':BBA}],
                }),
                notification.open({
                    message: 'BBA1',
                    description:
                    'Se cambió valor de BBA5 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de BBA6 a ' + BBA,
                    title:'Bomba nutrientes',
                    data:[{'BBA6':BBA}],
                }),
                notification.open({
                    message: 'BBA6',
                    description:
                    'Se cambió valor de BBA6 a ' + BBA,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            ) 
        )}
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
            .then(
                console.log('OKKKKKKKKKKK'),
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de Agitador 1 a ' + Ag,
                    title:'Agitador',
                    data:[{'Ag1':Ag}],
                }),
                notification.open({
                    message: 'Agitador 1',
                    description:
                    'Se cambió valor de Agiador 1 a ' + Ag,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            )
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
            .then(
                db.collection('Equipments')
                .doc(props.data.id)
                .collection('Logs')
                .add({
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    description: 'Se cambia valor de Agitador 1 a ' + Ag,
                    title:'Agitador',
                    data:[{'Ag2':Ag}],
                }),
                notification.open({
                    message: 'Agitador 2',
                    description:
                    'Se cambió valor de Agiador 2 a ' + Ag,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
            )
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
                                <Button type='primary' onClick={() => saveBBA(BBA1On, 'BBA1') }>Encender</Button>
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