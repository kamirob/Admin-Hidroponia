import React, { useState, useEffect } from 'react'
import { Input, Form, Typography, Button, PageHeader, InputNumber, Popconfirm, Space, Table, Col, Row, Modal, notification} from 'antd';
import {db} from '../../Config/Firebase'
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    SmileOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import { normalize } from '../../Utils/Normalize';
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function ConfigFormEquipment() {

    const idLocale = require('dayjs/locale/es');
    const LocalizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.locale('es', idLocale);
    dayjs.extend(LocalizedFormat)
    const {Title} = Typography;
    let history = useHistory();

    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const originData = [];
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const isEditing = (record) => record.id === editingKey;

    useEffect(() => {
      getTags()
      console.log(tags.map(x => (x.name)))
    },[]);

    const getTags= async() => {
      try{
        db.collection('Tags').onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { 
              name,
              dateCreate
            } = doc.data();
            list.push({
              id: doc.id,
              name,
              dateCreate
            });
          })
          setTags(list)
        });

      }catch(e){
        console.log(e)
      }  
    } 

    const edit = (record) => {
        form.setFieldsValue({
          name: '',
          ...record,
        });
        setEditingKey(record.id);
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
  
        if(name === 'tag') {
          setTag(value);
        }
        
    };

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
      setRequiredMarkType(requiredMarkValue);
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };

    const save = () => {
      if (normalize(tag) != tags.map(x => (x.name))){
        db.collection('Tags')
        .add({
          name: normalize(tag),
          dateCreate: new Date()
        })
        .then(() => {
          notification.open({
            message: 'Etiqueta creada',
            description:
              'La etiqueta se creó correctamente.' ,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
          setTag('')
        })
      } else {
        notification.open({
          message: 'Etiqueta ya existe',
          description:
            'La etiqueta que quieres crear ya existe' ,
          icon: <CloseOutlined style={{ color: 'red' }} />,
        });
      } 
    }

    const editTag = async(record)=> {
      try {
        const row = await form.validateFields();
        console.log(Object.values(row).toString())
        db.collection('Tags')
        .doc(record.id)
        .update({
            name: Object.values(row).toString()
        })
        .then(
          setEditingKey(''),
        )
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    }

    const deleteTag = async(record) => {
      try {
        const row = await form.validateFields();
        console.log(Object.values(row).toString())
        db.collection('Tags')
        .doc(record.id)
        .delete()
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    }

    const showModal = () => {
      setVisible(true);
    };

    const columns = [
        {
          title: 'Etiqueta',
          dataIndex: 'name',
          key: 'name',
          editable: true,
          width: '50%',
          align:'center'
        },
        {
          title: 'Agregado',
          dataIndex: 'dateCreate',
          key: 'dateCreate',
          width: '50%',
          align:'center',
          render: (record) => {
            return <p style={{marginTop:'1%'}}>{dayjs(record.dateCreate).format('LLL')}</p>
          }
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
                    onClick={() => editTag(record)}
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
                
                    <>
                        <a><EditOutlined style={{ fontSize: '150%'}} onClick={() => edit(record)}/></a>
        
                        <DeleteOutlined style={{ fontSize: '150%', color:'red'}} onClick={() => deleteTag(record)} />
                    </>
                    
                
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

    return (
        <div>
          <PageHeader
              className="site-page-header-responsive"
              onBack={() => window.history.back()}
              title={<Title level={2} style={{marginTop:'3%'}}>Configuración de Etiquetas</Title>}
              extra={[
                <Button 
                  key="1" 
                  type="primary" 
                  shape='round' 
                  size='large' 
                  onClick={showModal}
                >  
                  Nuevo
                </Button>
              ]}
          >
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                      cell: EditableCell,
                  },
                }}
                dataSource={tags}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ pageSize: 7 }}
                scroll={{ x: 700 }}
              />
            </Form>
          </PageHeader>

          <Modal
            title={<h2>Etiqueta</h2>}
            centered
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancelar
              </Button>
            ]}
          >
            <Form
              form={form}
              layout="vertical"
              onValuesChange={onRequiredTypeChange}
              requiredMark={requiredMark}
            >
              
              <Form.Item  required tooltip="Ej: Consignación bancaria">
                <Input 
                  placeholder="Agregar etiqueta" 
                  onChange = {(event) => onChangeHandler(event)}
                  name="tag"
                  id="tag"
                  value = {tag}
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  style={{width:'100%', marginTop:'5%'}}
                  onClick={save}
                  type="primary"
                >
                  Guardar
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
    )
}
