import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllCheeses = () => {
    return axios(`${apiUrl}/cheeses`)
}

// READ -> Show
export const getOneCheese = (id) => {
    return axios(`${apiUrl}/cheeses/${id}`)
}

// Create (create a cheese)
export const createCheese = (user, newCheese) => {
    return axios({
        url: `${apiUrl}/cheeses`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { cheese: newCheese }
    })
}

// Update (update a cheese)
export const updateCheese = (user, updatedCheese) => {
    return axios({
        url: `${apiUrl}/cheeses/${updatedCheese._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { cheese: updatedCheese }
    })
}

// Delete (delete a cheese)
export const removeCheese = (user, cheeseId) => {
    return axios({
        url: `${apiUrl}/cheeses/${cheeseId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}