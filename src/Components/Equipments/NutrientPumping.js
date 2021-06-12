import React from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';


export default function NutrientPumping(props) {
    return (
        <div style={{marginBottom:'3%'}}>  
            <Card title='Variables' style={{marginTop:'5%'}}>
                <Row type="flex">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="BBA1 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="BBA2 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="BBA3 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="Agitador1 (min)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                        </Form>
                    </Col>   
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="BBA4 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="BBA5 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="BBA6 (seg)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="Agitador2 (min)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                        </Form>
                    </Col> 
                </Row>
            </Card>
        </div>
    )
}