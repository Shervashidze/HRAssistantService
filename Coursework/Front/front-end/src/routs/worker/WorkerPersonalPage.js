import { CreateTopBar} from './Topbar'
import { selectLoginstatus, login, unlog } from '../../slicers/slicer'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import AccountPage from '../../pages/AccountPage'
import emptyAvatar from '../../imgs/avatar_1.png'
import './style.css'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';

export function CreateInfoPage() {
    const log = useSelector(selectLoginstatus)
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [department, setDepartmenr] = useState("")
    const [post, setPost] = useState("")
    const [staffCategory, setStaffCategory] = useState("")
    const [factory, setFactory] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [mail, setMail] = useState("")
    const [staffType, setStaffType] = useState("")
    const [id, setId] = useState(0)
    

    const fetchdata = useCallback(async () => {
        console.log(log)
        if (log.username === '') {
            return
        }
        let r = await fetch('https://hrassistantservice/api/Workers/WorkerByEmail/' + log.username)
        let a = await r.json()
        let result = await fetch('https://hrassistantservice/api/Workers/Worker/' + a.id);
        let worker = await result.json();
        setName(worker.name)
        setPhoneNumber(worker.phoneNumber)
        setDepartmenr(worker.department)
        setPost(worker.post)
        setStaffCategory(worker.staffCategory)
        setFactory(worker.factory)
        setDateOfBirth(worker.dateOfBirth)
        setMail(log.username)
        setStaffType(worker.staffType)
        setId(worker.id)
    }, [])

    useEffect(() => {
        fetchdata()
    }, [fetchdata])


    return(<div>
        <div id="parent">
            <div id="name">{name}</div>
            <img src={emptyAvatar} id ="pic"/>
            <div id="list">
                <li className=''>Должность: {post}</li>
                <li className=''>Телефон: {phoneNumber}</li>
                <li className=''>Дата рождения: {dateOfBirth}</li>
                <li className=''>Производство: {factory}</li>
                <li className=''>Подразделение: {department}</li>
                <li className=''>Категория персонала: {staffCategory}</li>
                <li className=''>Тип персонала: {staffType}</li>
                <li className=''>Почта: {mail}</li>
            </div>
        </div>
    </div>)
}