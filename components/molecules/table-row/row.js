import { useState } from "react"
import Modal from "../modal/modal"
import styles from "./row.module.css"

export default function Row({
    data = [],
    isButtonRequired = true,
    customStyle,
    bookId,
    setCheckoutCreated=()=>{}
}){
    const [isModalOpen,setIsModalOpen]= useState(false)
    const [isReturnRequest,setIsReturnReq]= useState(false)

   

    return (
        <>
        <div className={`${styles.mainWrapper} ${customStyle}`}>
            {data.map((item,index)=>    
                <p key={index}>{item}</p>
            )}
            {
                isButtonRequired && 
                <div className={styles.btnWrapper}>
                    <button className={styles.btn} onClick={()=>setIsModalOpen(true)}>Checkout</button>
                    <button className={styles.btn} onClick={()=>{
                        // setIsReturnReq{true}
                        setIsModalOpen(true)
                    }}>Return</button>
                </div>
            }
        </div>
        <Modal
            bookId={bookId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setCheckoutCreated = {setCheckoutCreated}
            // isReturnRequest = {}
        />
        </>

    )
}