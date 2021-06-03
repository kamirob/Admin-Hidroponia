import React, {useState, useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import { Modal, Button, PageHeader, Typography, Form, Table, Input, notification, Select, Space, Popconfirm, Col, Row} from 'antd';
import { db } from '../../Config/Firebase';
import {
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    SmileOutlined,
} from '@ant-design/icons';

export default function ActivateEquipment() {
    const history = useHistory();
    const {Title} = Typography
    const { Option } = Select;

    const idEquipment = history.location.state.idEquipment
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [tagsFormConfig, setTagsFormConfig] = useState();
    const [tagsConfig, setTagsConfig] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const originData = [];
    const children = [];
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record === editingKey;

    useEffect(() => {
        setVisible(true);
        tagsForm();
        tagsConfiguration()
    }, [])

    const activateEquipment = () => {
        db.collection('Equipments')
        .doc(idEquipment)
        .update({
            Status: 'active'
        })
        .then(
            notification.open({
                message: 'Equipo activado',
                description:
                'El equipo se activó correctamente',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            }),
            window.history.back(),
        )
    }

    const edit = (record) => {
        form.setFieldsValue({
           [record.e]:'',
           ...record
        });
        setEditingKey(record);
    };

    const save = async (record) => {
        try {
            const row = await form.validateFields();
            console.log(Object.values(row).toString())
            db.collection('Equipments')
            .doc(idEquipment)
            .collection('ConfigurationForm')
            .doc(idEquipment)
            .update({
                [record]: Object.values(row).toString()
            })
            .then(
                setEditingKey(''),
                notification.open({
                    message: 'Etiqueta asignada',
                    description:
                    Object.values(row).toString() + ' se asignó correctamente a ' + record,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                }),
                tagsForm(),
            )
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    
    const tagsForm = async () => {
        db.collection('Equipments').doc(idEquipment)
        .collection('ConfigurationForm').get()
        .then(response => {
        const fetchedNotifications = [];
        const config = [];
        response.forEach(document => {
            const fetchedNotification = {
            ...document.data()
            };
            for (const k in fetchedNotification) fetchedNotifications.push({'e':k, 'f':fetchedNotification[k]}) 
        });
            fetchedNotifications.map((e) => {
                config.push(e)
                console.log(e)
            })
            setTagsFormConfig(config)
            //console.log(fetchedNotifications)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
        });
    }

    const tagsConfiguration = async () => {
        db.collection('Tags').get()
        .then(response => {
        const fetchedTags = [];
        response.forEach(document => {
            const fetchedTag = {
            id: document.ids,
            ...document.data()
            }; 
            fetchedTags.push(fetchedTag)

        });     
            setTagsConfig(fetchedTags)
            //console.log(fetchedTags)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
        });
    }

    const handleOk = () => {
        setConfirmLoading(true);
        setVisible(false)
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

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
        const inputNode = inputType != 'text' ? <Input/> :  <Select style={{ width: '100%' }} onChange={handleChange}>
        {tagsConfig.map((option) => (
            <Option value={option.name}>{option.name}</Option>
        ))}
        </Select>;
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

    const columns = [
        {
            title: 'Variable',
            dataIndex: 'e',
            key: 'e',
            width: '50%',
            align:'center'
        },
        {
            title: 'Etiqueta',
            width: '15%',
            dataIndex: 'f',
            key: 'f',
            align:'center',
            editable: true,
            inputType:'number'
            /**render: () => (
                <Select style={{ width: '100%' }} onChange={handleChange}>
                    {tagsConfig.map((option) => (
                        <Option value={option.name}>{option.name}</Option>
                    ))}
                </Select>
            ), **/
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
                                onClick={() => save(record.e)}
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
                            <a>
                                <EditOutlined style={{ fontSize: '150%'}} onClick={() => edit(record)}/>
                            </a>
                        
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

    return (
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={<Title level={2} style={{marginTop:'4%'}}>{idEquipment}</Title>}
                extra={
                    <Button 
                        onClick={activateEquipment}
                        type='primary' 
                        style={{marginTop:'8%', backgroundColor:'green', borderColor:'green'}} 
                        shape='round' 
                        size='large' 
                        key="1"
                    >
                        Activar
                    </Button>
                }
            />
        
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={tagsFormConfig}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    scroll={{ x: 700 }}
                />
            
            </Form>
         
            <Modal
                title={"Activación de " + idEquipment} 
                visible={visible}
                onOk={handleOk}
            >
                <p>Asigna las etiquetas a las variables de entrada y salida del equipo para poder continuar</p>
            </Modal>
        </div>
    )
}
