import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /molds/:cheeseId
export const createMold = (cheeseId, newMold) => {
    return axios({
        url: `${apiUrl}/molds/${cheeseId}`,
        method: 'POST',
        data: { mold: newMold }
    })
}

// UPDATE
// /molds/:cheeseId/:moldId
export const updateMold = (user, cheeseId, updatedMold) => {
    return axios({
        url: `${apiUrl}/molds/${cheeseId}/${updatedMold._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { mold: updatedMold }
    })
}

// DELETE
// /molds/:cheeseId/:moldId
export const deleteMold = (user, cheeseId, moldId) => {
    // console.log('this the moldId', moldId)
    return axios({
        url: `${apiUrl}/molds/${cheeseId}/${moldId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}