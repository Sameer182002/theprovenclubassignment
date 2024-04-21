import getAllBooks from "@/apis/userApi/getAllBooks"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./homepage.module.css"
import Row from "../molecules/table-row/row"

export default function Homepage(){

    const [booksData, setBooksData] = useState([])
    const [isChckoutCreated ,setCheckoutCreated] = useState(false)

    const router = useRouter()

    const getBooks = async()=>{
        try{
            const data = await getAllBooks()
            setBooksData(data)
        }catch(error){
            console.log(error?.message)
        }
    }

    useEffect(()=>{
        if(!router?.isReady){
            return
        }
        getBooks()
    },[router?.isReady,isChckoutCreated])

    return (
        <div className={styles.mainWrapper}>
            <div>
                <p>Welcome to Books Library</p>
                <div className={styles.table}>
                    <Row
                        data={[
                            "Book Id","Book Name","Number Of Copies"
                        ]}
                        isButtonRequired={false}
                        customStyle={styles.headingRow}
                    />
                    {
                        booksData.map(({BookID='',BookName='',NumberOfCopies='',_id=''},index)=>
                            <Row
                                data={[
                                    BookID,BookName,NumberOfCopies
                                ]}
                                bookId= {_id}
                                setCheckoutCreated={setCheckoutCreated}
                            />
                    )
                    }
                </div>
                
            </div>
        </div>
    )
}