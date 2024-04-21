import axios from '../axios'

export default async function createCheckout(bodyData){
    return await axios.put('/books/checkout',bodyData)
}