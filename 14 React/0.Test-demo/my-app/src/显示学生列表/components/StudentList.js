import React from 'react';
import Student from './Student'

export default function (prop) {

    console.log(prop)

    const StudentAll = prop.allStu.map(item => <Student key={item.id} {...item}></Student>)
    return (<ul>
        {StudentAll}
    </ul>)
}
