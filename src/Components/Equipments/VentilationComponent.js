import React from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';


export default function VentilationComponent(props) {
    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle" >
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card title='Variables' style={{margin:'2%', minHeight:'50vh'}}>
                        <div style={{marginBottom:'5%'}}>
                            <Button>ON</Button>
                            <Button>OFF</Button>
                            <Button>AUTO</Button>
                        </div>
                        <Form
                            layout="horizontal"
                            size="large"
                        >
                            <Form.Item label="Minutos ON">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Minutos OFF">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Encendida">
                                <Button>ON</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>   
            </Row>
        </div>
    )
}