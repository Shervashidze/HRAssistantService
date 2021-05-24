import { selectLoginstatus, login, unlog } from '../../slicers/slicer'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router';


export function CreateWorkerEvent (id) {
    const log = useSelector(selectLoginstatus)
    const [event, setEvent] = useState()
    const params = useParams()

    const fetchdata = useCallback(async () => {
        let result = await fetch('https://hrassistantservice/Learning/GetLearningEvent/' + params.id );
        let event = await result.json();
        setEvent(event)
    }, [])
    
    useEffect(() => {
        fetchdata()
    }, [fetchdata])

    return(<div id="WP">
        <h3>Обучение: {event?.name}</h3>
        <div>
            {event?.description}
            <div></div>Максимально возможная оценка: {event?.maxScore}
            <div></div>Планируемая дата: {event?.plannedDate}
        </div>
        <div>
            <h3>Материалы для изучения:</h3>
            <a href="path_to_file" download="proposed_file_name">Материал 1</a>
            <div></div>
            <a href="path_to_file" download="proposed_file_name">Материал 2</a>
            <div>
            </div>
            <a href="path_to_file" download="proposed_file_name">Материал 3</a>
        </div>
    </div>)
}