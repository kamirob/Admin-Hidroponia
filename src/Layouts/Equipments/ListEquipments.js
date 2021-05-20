import React, {useEffect, useState} from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Space, Row, Col } from 'antd';
import {db} from '../../Config/Firebase'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
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
          snapshot.forEach((doc) => {
              const { 
                idEquipment,
                name,
                ubication,
                lastLog,
                dateLastLog,
                state,
                grow
              } = doc.data();
              list.push({
                  id: doc.id,
                  idEquipment,
                  name,
                  ubication,
                  lastLog,
                  dateLastLog,
                  state,
                  grow
              });

          });
          setEquipments([...list]);
          setLoading(false)

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
        dataIndex: 'idEquipment',
        key: 'idEquipment',
        width: '15%',
      },
      {
        title: 'Equipo',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: '30%',
      },
      {
        title: 'Cultivo',
        dataIndex: 'grow',
        key: 'grow',
        editable: true,
        width: '30%',
      },
      {
        title: 'Fecha último Log',
        dataIndex: 'dateLastLog',
        key: 'dateLastLog',
        width: '30%',
      },
      {
        title: 'Último Log',
        dataIndex: 'lastLog',
        key: 'lastLog',
        width: '30%',
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

              <EyeOutlined 
                style={{ fontSize: '150%'}} 
                onClick={() => history.push({
                  pathname: 'equipments/' + record.id + '/details', 
                  state: { 
                      idEquipment: record.id,
                      name: record.name,
                      grow: record.grow,
                      state: record.state
                  }
                })} 
              />
              <a>
                <EditOutlined style={{ fontSize: '150%'}} onClick={() => edit(record)}/>
              </a>

              <DeleteOutlined style={{ fontSize: '150%', color:'red'}} />
            
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
        <Title>Equipos</Title>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
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
