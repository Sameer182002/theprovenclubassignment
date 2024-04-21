import createCheckout from '@/apis/userApi/createCheckout';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import styles from "./modal.module.css"

export default function Modal({
    isModalOpen = false,
    bookId='',
    setIsModalOpen = ()=>{},
    setCheckoutCreated = ()=>{}
}){

    const [memberId, setMemberId] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    setCheckoutCreated(false)
    async function handleSubmit(){
        try{
            if(!memberId || memberId?.length<4){
                setErrorMsg('Pls enter a valid member id')
                return
            }
            setIsSubmitting(true)
            const data = await createCheckout({
                bookId,
                userId : memberId
            })
            setCheckoutCreated(true)
            alert('Checkout created successfully')
            setIsModalOpen(false)
        }catch(error){
            setErrorMsg(error?.message)
            console.log(error?.message)
        }finally{
            setIsSubmitting(false)
        }
    }

    async function createReturnRequest(){
        try{
            setIsSubmitting(true)
        }catch(error){
            console.log(error?.message)
            alert(error?.message)
        }
    }

    
    return (
        <Dialog open={isModalOpen}
            fullWidth={true}
        >
            <div className={styles.mainWrapper}>
                <p className={styles.Closebtn} onClick={()=>{
                    setIsModalOpen(false)
                    setErrorMsg('')
                    }}>X</p>
                <input
                    type ='text'
                    onChange={(e)=>setMemberId(e.target.value)}
                    maxLength={4}
                    className={styles.input}
                    placeholder='Enter Member Id'
                ></input>
                {errorMsg && <p>{errorMsg}</p>}
                <button onClick={()=>handleSubmit()} className={styles.btn}>{isSubmitting ? 'Proceeding...' :'Confirm'}</button>
            </div>
        </Dialog>
    )
}