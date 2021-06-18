import React, { useState, useLayoutEffect } from 'react'
import { Card, Row, Col, Form, Input, InputNumber, notification, Button} from 'antd';
import {Electricity} from 'react-environment-chart';
import {db} from '../../Config/Firebase'
import {SmileOutlined} from '@ant-design/icons';

export default function EcpHComponent(props) {
    return (
        <div style={{marginBottom:'3%'}}>  
            <Row type="flex" justify="space-between" align="middle"> 
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Card title='Electroconductividad' style={{margin:'2%', minHeight:'50vh'}}>     
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                            <Electricity
                                height={180}  
                                value={props.datarpi.EC} 
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{props.datarpi.EC}</h1>
                    </Card>
    
                </Col>   
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Card title='pH' style={{margin:'2%', minHeight:'50vh'}}>     
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> 
                            <Electricity
                                height={180}  
                                value={props.datarpi.PH}  
                            />  
                        </div> 
                        <h1 style={{textAlign:'center'}}>{props.datarpi.PH}</h1>
                    </Card>
    
                </Col>     
            </Row>
        </div>
    )
}
