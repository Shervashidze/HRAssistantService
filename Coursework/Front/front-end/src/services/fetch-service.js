
const address = "https://localhost:8001/"
const worker = "https://localhost:5001/"
const heroku = "https://hrassistantservice.herokuapp.com/"

export const fetchAllLearningEvents = async () => {
    // https://hrassistantservice.herokuapp.com/Learning/GetAll
    return await fetch(address + 'Learning/GetAll')
    .then((data) => {
        return data.json()
    })
}

export const deleteLearningEvent = async (id) => {
    return fetch(address + 'Learning/DeleteEvent/' + id, {method: 'DELETE'})
}

export const fetchLearningEvent = async (id) => {
    return await fetch(address + 'Learning/GetLearningEvent/' + id)
    .then((data) => {
        return data.json()
    })
}

export const fetchWorkerInfo = async (id) => {
    return await fetch(worker + 'api/Workers/Worker/' + id)
    .then((data) => {
        return data.json()
    })
}

export const createLP = async (s) => {
    return await fetch(address + 'Learning/CreateLearningEvent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: s
  })
}

export const uploadFile = async (f, id) => {
    return await fetch(address + '/Learning/UploadFile/' + id, {
        method: 'POST',
        body: f
      })
}

export const getAllWorkers = async () => {
    return await fetch(worker + 'api/Workers/All');
}

export const getWorker = async (id) => {
    return await fetch(worker + 'api/Workers/Worker/' + id);
}

export const getWorkerByEmail = async (id) => {
    return await fetch(worker + 'api/Workers/WorkerByEmail/' + id);
}

export const getFeedbaack = async (eventId, workerId) => {
    return await fetch(address + 'Learning/GetFeedback/' + eventId + "/" + workerId);
}