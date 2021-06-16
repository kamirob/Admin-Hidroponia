import React, {useEffect, useState} from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Space, Row, Col, Tag, Button } from 'antd';
import {db} from '../../Config/Firebase'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom'

export default function ListEquipments() {
    const {Title} = Typography;
    let history = useHistory();

    const [ loading, setLoading ] = useState(true);
    const [ equipments, setEquipments ] = useState([]);
    const [ error, setError ] = useState();
    const originData = [];
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
  
    const isEditing = (record) => record.key === editingKey;
  
    useEffect(() => {
      getEquipments()
    }, [])

    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    const getEquipments = async () => {
      try {
          const list = [];
          var snapshot = await db.collection("Equipments").get();
            snapshot.forEach(doc => {
              const { 
                id,
                name,
                ubication,
                lastLog,
                LastData,
                dateLastLog,
                Status,
                grow
              } = doc.data();
              list.push({
                id: doc.id,
                id,
                name,
                ubication,
                lastLog,
                LastData,
                dateLastLog,
                Status,
                grow
              });
            });
          setEquipments([...list]);
          setLoading(false)
          return () => snapshot()
      } catch (e) {
        setError(
          "There's nae bleeding restaurants, I told you to upload them!"
        );
      }
    };

    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

    
    const cancel = () => {
      setEditingKey('');
    };

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const columns = [
      {
        title: 'Identificador',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        align:'center'
      },
      {
        title: 'Equipo',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: '15%',
        align:'center'
      },
      {
        title: 'Estado',
        dataIndex: 'Status',
        key: 'Status',
        width: '5%',
        render: (record) => (
          record == 'active' ? (
            <Tag color='Green'>Activo</Tag>
          ):(
            <Tag color='Red'>Inactivo</Tag>
          )
        ),
        align:'center',

      },
      {
        title: 'Cultivo',
        dataIndex: 'grow',
        key: 'grow',
        editable: true,
        width: '20%',
        align:'center'
      },
      {
        title: 'Fecha último dato',
        dataIndex: 'LastData',
        key: 'LastData',
        width: '30%',
        align:'center'
      },
      {
        title: 'Último Log',
        dataIndex: 'lastLog',
        key: 'lastLog',
        width: '30%',
        align:'center'
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (

          <Row>
            <Col>
              <CheckOutlined 
                style={{ fontSize: '150%', color:'green'}}
                  href="javascript:;"
                  onClick={() => save(record.key)}
              />
            </Col>
            
            <Col>
              <Popconfirm title="Desea cancelar?" onConfirm={cancel}>
                <CloseOutlined style={{ fontSize: '150%', color:'red'}}/>
              </Popconfirm>
            </Col>
          </Row>
          ) : (
            <Space size="middle">
              {record.Status == 'active' ? (
                <>
                <EyeOutlined 
                  style={{ fontSize: '150%'}} 
                  onClick={() => history.push({
                    pathname: 'equipments/' + record.id + '/details', 
                    state: { 
                        idEquipment: record.id,
                        name: record.name,
                        grow: record.grow,
                        status: record.Status
                    }
                  })} 
                />
                <a>
                  <EditOutlined style={{ fontSize: '150%'}} onClick={() => edit(record)}/>
                </a>
                
                <DeleteOutlined style={{ fontSize: '150%', color:'red'}} />
              </>
              ):(
                <Button 
                  onClick={() => history.push({
                    pathname: '/equipments/' + record.id + '/activate', 
                    state: { 
                      idEquipment: record.id,
                    }
                  })} 
                  type="primary" 
                  style={{backgroundColor:'green', borderColor:'green'}} 
                  shape="round" 
                  icon={<CheckCircleOutlined />} 
                  size='middle' 
                >
                  Activar
                </Button>
              )}
              
            
            </Space>
          );
        },
      },
    ];
      
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
      
    return (
      <div>
        <Row type="flex" style={{alignItems:'center', marginBottom:'2%'}}>
          <Col xs={22} sm={22} md={23} lg={23} xl={23} xxl={23}>
            <Title style={{marginTop:'1%'}}>Equipos</Title>
          </Col>
          <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
            <SettingOutlined onClick={() => history.push('/equipments/config')} style={{fontSize:'160%'}} />
          </Col>
        </Row>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
      
            dataSource={equipments}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
            scroll={{ x: 700 }}
          />
        </Form>
        {/**<Table style={{marginTop:'3%'}} columns={columns} dataSource={equipments} size='large' scroll={{ x: 600 }} sticky bordered />**/}
      </div>
    )
}
