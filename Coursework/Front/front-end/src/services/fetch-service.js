
export const fetchAllLearningEvents = async () => {
    return await fetch('https://hrassistantservice.herokuapp.com/Learning/GetAll')
    .then((data) => {
        return data.json()
    })
}

export const deleteLearningEvent = async (id) => {
    return fetch('https://hrassistantservice.herokuapp.com/Learning/DeleteEvent/' + id, {method: 'DELETE'})
}

export const fetchLearningEvent = async (id) => {
    return await fetch('https://hrassistantservice.herokuapp.com/Learning/GetLearningEvent/' + id)
    .then((data) => {
        return data.json()
    })
}

export const fetchWorkerInfo = async (id) => {
    return await fetch('https://hrassistantservice.herokuapp.com/api/Workers/Worker/' + id)
    .then((data) => {
        return data.json()
    })
}