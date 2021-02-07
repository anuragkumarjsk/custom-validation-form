import React,{useState,useEffect} from 'react'

import './form.css'

import Status from './statusbar'
import Personal from './personal'
import Order    from './Order/order' 
import Delivery from './Order/delivery' 
import Deposit  from './Order/deposit' 
import Bank  from './bank'



export default function Form() {
    console.log('rerendering form')

        const [personal,setpersonal]=useState(true)
        const [order,setorder]=useState(false)
        const [bank,setbank]=useState(false)
        
        function personal_next(){
                setpersonal(false)
                setorder(true)
        }
        function order_previous(){
            setorder(false)
            setpersonal(true)
        }
        function order_next(){
            setorder(false)
            setbank(true)  
        }
        function bank_previous(){
            setbank(false)
            setorder(true)
        }
        function submit_clicked(){
            const f={...a,...b1,...b2,...b3,...c}
            alert('submit clicked'+ JSON.stringify(f))
            seta(initial_a)
            setb1(initial_b1)
            setb2(initial_b2)
            setb3(initial_b3)
            setc(initial_c)

            setshow_a(false)
            setshow_b1(false)
            setshow_b2(false)
            setshow_b3(false)
            setshow_c(false)
            set_is_valid('')

            setpersonal(true)
            setorder(false)
            setbank(false)
        }

        const initial_a = {
                            OrderNo:'',
                            Date:'',
                            Name:'',
                            AadharNo:null,
                            Address:'',
                            Tehsil:'',
                            District:'',
                            PinCode:null,
                            State:'',
                            Watsapp:null,
                            Contact:null,
                            CompanyName:''
                        }  
        const [a,seta] = useState(initial_a)
       
        const initial_b1={
                            OrderTable:[],
                            OrderCount:0, 
                            TotalAmt:0,
                            Advance:0, 
                            BillAmt:0,
                            TransportChrg:0,
                            DueAmt:0
                          }
        const [b1,setb1]=useState(initial_b1)

        const initial_b2 = {
                                DeliveryDate:'',
                                DeliveryPlace:'',
                            }
        const [b2,setb2]=useState(initial_b2)

        const initial_b3 = {
                                DepositTable:[],
                                DepositCount:0 
                            }
        const [b3,setb3]=useState(initial_b3)
         

        const initial_c={Ac:'',
                        AcHolder:'',
                        AcNo:null,
                        IFSC:'',
                        DealerName:'',
                        DealerContact:null}
        const [c,setc]=useState(initial_c)

        const [show_a,setshow_a]=useState(false)
        const [show_b1,setshow_b1]=useState(false)
        const [show_b2,setshow_b2]=useState(false)
        const [show_b3,setshow_b3]=useState(false)
        const [show_c,setshow_c]=useState(false)
        const [is_valid,set_is_valid]=useState('')
   
        useEffect(() => {
        console.log('form validation was altered') 
        if(show_a && show_b1 && show_b2 && show_b3 && show_c)
        {
           set_is_valid('form is valid')
        }  

        }, [show_a,show_b1,show_b2,show_b3,show_c])


    return (
        <div className="form_container">
        <Status arr={[show_a,show_b1,show_b2,show_b3,show_c]} />
        {personal &&
        <div className="f" >
        <Personal sv={a} ssv={seta} show={setshow_a}/>
        <div className="bottom_bar row">
            <button onClick={personal_next} className="btn col" >Next</button>            
        </div>
        </div>}
        
        {order &&
        <div className="f" >
        {/* <Order sv={b} ssv={setb} show={setshow_b}/>  */}

        <Order   sv ={b1} ssv={setb1} show={setshow_b1}/>
        <Delivery sv={b2} ssv={setb2} show={setshow_b2}/>
        <Deposit sv ={b3} ssv={setb3} show={setshow_b3}/>
        <div className="bottom_bar row">
            <button onClick={order_previous} className="btn col" >Previous</button>
            <button onClick={order_next} className="btn col" >Next</button>            
        </div>
        </div>}

         { bank &&  
        <div className="f" >
        <Bank sv={c} ssv={setc} show={setshow_c}/>
        <div className="bottom_bar row">
            <button onClick={bank_previous} className="btn col" >Previous</button>
            <button onClick={submit_clicked} className="btn col" disabled={!`${is_valid}`} >Submit</button>            
        </div>
        </div>}

        {JSON.stringify({...a,...b1,...b2,...b3,...c})}

        </div>
    )
}
