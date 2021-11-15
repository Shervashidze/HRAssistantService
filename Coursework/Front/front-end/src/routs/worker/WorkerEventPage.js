import { selectLoginstatus, login, unlog } from '../../slicers/slicer'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router';
import { getConfigFileParsingDiagnostics } from 'typescript';


export function CreateWorkerEvent (id) {
    const log = useSelector(selectLoginstatus)
    const [event, setEvent] = useState()
    const [materials, setMaterials] = useState([])
    const params = useParams()

    const fetchdata = useCallback(async () => {
        let result = await fetch('https://localhost:8001/Learning/GetLearningEvent/' + params.id );
        let mat = await fetch('https://localhost:8001/Learning/GetListOfTasks/' + params.id);
        let m = await mat.json();
        console.log(m.pathsToD)
        let event = await result.json()
        setEvent(event)
        let and = m.pathsToD.map(material => <li><button className="btn btn-light"  onClick={() => 
            getFile(params.id, material)
        }>{material}</button></li>);
        console.log(and)
        setMaterials(and)
    }, [])
    
    useEffect(() => {
        fetchdata()
    }, [fetchdata])

    
    async function getFile(id, material) {
        var ans = await fetch('https://localhost:8001/Learning/GetFile/' + id + "/" + material)
        console.log(ans.body)
        const link = document.createElement('a');
        link.href = ans.url;
        link.setAttribute('download', material);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return(
    <div id="WP">
        <h3>Обучение: {event?.name}</h3>
        <div>
            {event?.description}
            <div></div>Максимально возможная оценка: {event?.maxScore}
            <div></div>Планируемая дата: {event?.plannedDate}
        </div>
        <div>
            {materials}
        </div>
    </div>)
}