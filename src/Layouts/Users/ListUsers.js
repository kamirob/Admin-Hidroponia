import React from 'react'
import { Button, Col, Row, Table, Typography } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';

export default function ListUsers() {
    const {Title} = Typography;

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'EEE',
          key: 'EEE',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'SSS',
          key: 'SS',
          responsive: ['md'],
        },
        {
          title: 'Rol',
          dataIndex: 'SS',
          key: 'SS',
          responsive: ['lg'],
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
      ];
    return (
        <div>
          <Row style={{ alignContent:'center', marginBottom:'1%'}}>
            <Col xs={24} sm={18} md={20} lg={20} xl={20} xxl={22}>
              <Title>Usuarios</Title>
            </Col>
            <Col xs={24} sm={6} md={4} lg={4} xl={4} xxl={2} >
              <Button type="primary" shape="round" icon={<PlusOutlined />} size='large'>Nuevo</Button>
            </Col>
          </Row>
          
          <Table columns={columns} dataSource={data} />
        </div>
    )
}