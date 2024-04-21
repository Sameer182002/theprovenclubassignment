import axios from '../axios'

export default async function getAllBooks(){
    return await axios.get('/books')
}