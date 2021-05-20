import React, {useEffect, useState} from 'react'
import {useHistory } from 'react-router-dom'
import { PageHeader, Typography, Tag } from 'antd';

export default function DetailsEquipment() {
    const { Title, Text} = Typography;
    const history = useHistory();

    const idEquipment = history.location.state.idEquipment
    const name = history.location.state.name
    const grow= history.location.state.grow
    const state = history.location.state.state
    
    const [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return(
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={<Title style={{marginTop:'5%', alignItems:'center'}} level={2}>{name}</Title>}
                subTitle={"Cultivo de " + grow}
                tags={state == 'active' ? <Tag color="green">{state}</Tag> : <Tag color="red">{state}</Tag>}
            />
            <p>{date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}</p>
        </div>
    )
}
