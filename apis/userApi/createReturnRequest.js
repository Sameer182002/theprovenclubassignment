import axios from '../axios'

export default async function createReturnRequest(bodyData){
    return await axios.put('/books/return',bodyData)
}