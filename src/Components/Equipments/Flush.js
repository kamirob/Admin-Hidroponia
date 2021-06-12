import React from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Switch, Button} from 'antd';


export default function Flush(props) {
    return (
        <div style={{marginBottom:'3%'}}>  
            <Card title='Variables' style={{marginTop:'5%'}}>
                <Row type="flex">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form
                            size="large"
                        >
                            <Form.Item label="Flush (min)">
                                <InputNumber />
                                <Button>Encender</Button>
                                <Button danger>Off</Button>
                            </Form.Item>
                            <Form.Item label="Alarma de nivel">
                                <Button type='primary' style={{backgroundColor:'green', borderColor:'green'}}>Off</Button>
                            </Form.Item>
                        </Form>
                    </Col>   
                </Row>
            </Card>
        </div>
    )
}