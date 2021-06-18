import React, {useEffect, useState} from 'react'
import {Table, Typography} from 'antd';
import {db} from '../../Config/Firebase'
import dayjs from 'dayjs'
import 'dayjs/locale/es' 

export default function LogsList(props) {
    
    const {Title} = Typography;
    const idLocale = require('dayjs/locale/es');
    const LocalizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.locale('es', idLocale);
    dayjs.extend(LocalizedFormat)

    const [dataLogs, setDataLogs] = useState([])

    useEffect(() => {
        getDataLogs()
    }, [])

    const getDataLogs = async() => {
        try{
            db.collection('Equipments').doc(props.idEquipment).collection('Logs').orderBy('date', 'desc').onSnapshot(querySnapshot => {
                const logs = [];
                querySnapshot.forEach(doc => {
                    const {
                        title,
                        description,
                        date
                    } = doc.data();
                    logs.push({
                        id: doc.id,
                        title,
                        description,
                        date
                    })
                    setDataLogs([...logs])
                })
            });
        }catch(e){
            console.log(e)
        }  
    } 

    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Log',
            dataIndex: 'description',
            key: 'description',
            responsive: ['md'],
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            responsive: ['lg'],
            defaultSortOrder:'descend',
            sorter:(a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
        },
    ];


    return (
        <div>
            <Table columns={columns} dataSource={dataLogs} />
        </div>
    )
}