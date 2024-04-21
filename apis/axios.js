
import axios from 'axios';
import {cookie} from './cookies'

function getAxios() {
    const axiosInstance = axios.create({
        baseURL:'http://localhost:3003',
    });

    function onRequestFulfilled(request) {
        const authToken = cookie?.['x-auth-token'] || ''
        if(authToken)
            request.headers['x-auth-token'] = authToken
        return request;
    }

    function onRequestRejected(error) {
        return Promise.reject(error);
    }

    function onResponseFulfilled(response) {
        const {
            data: { 
                data, status, token , 
                message = false
            },
            config: { url },
        } = response || {data:{}, config:{}};

        if (url === '/verify-otp') {
            cookie.authToken = token
        }
        
        if (!status) {
            return Promise.reject(new Error(message || 'Something went wrong, Please try again later'));
        }
        return data;
    }


    function onResponseRejected(error) {
        const { 
            message = '', 
            // isErrorForUser = false,
            msg = ''
        } = error?.response?.data || error || {}

        const errorMessage = message || msg ;
        const unAuthorisedMsgs = [
            'TOKEN_NOT_FOUND',
            'INVALID_TOKEN_CONTENT',
            'UNAUTHORISED_USER',
            'INVALID_TOKEN'
        ]

        return Promise.reject(new Error(message || 'Something went wrong, Please try again later'));
    }

    axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected, {synchronous: true })
    axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected, { synchronous: true })

    return axiosInstance
}

let axiosInstance = null

if (!axiosInstance) {
    axiosInstance = getAxios()
}
    
export default axiosInstance

