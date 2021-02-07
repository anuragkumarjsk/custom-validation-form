import React,{useState,useEffect} from 'react'

import './form.css'
import './order.css'
function Order(props) {
    //............bank details...................
    const initial_bnk = {
                            Deposit_Date:'',
                            Deposit_Amount:0,
                            Deposit_UTRNo:'',
                            Deposit_Bank:''  
                        }
    const [bnk,setbnk] = useState(initial_bnk)

    const [bnk_count,set_bnk_count] = useState(0)
    const [del_bnk_count,set_del_bnk_count]=useState(0)

        function handle_bnk_input(e){
            var name = e.target.name
            var value= e.target.value
            validate_form(name, value) 
            setbnk((prevState)=>({
                ...prevState,
                [name]:value
            })) 
        }

        function add_bnk(e){
            e.preventDefault()
            set_bnk_count(bnk_count+1)
            var payload = {
                Deposit_Date:bnk.Deposit_Date,
                Deposit_Amount:bnk.Deposit_Amount,
                Deposit_UTRNo:bnk.Deposit_UTRNo,
                Deposit_Bank:bnk.Deposit_Bank 
            }
            var f1=async(payload)=>{
               await props.sv.DepositTable.push(payload)
            }
            f1(payload);
            // props.sv.DepositTable.push(payload)
            alert(JSON.stringify(payload))
            setbnk(initial_bnk)
        }
        function delete_bnk(e,indx){
            e.preventDefault()
            set_del_bnk_count(del_bnk_count+1)
            var data = [...props.sv.DepositTable];
            data.splice(indx, 1);
            props.ssv({DepositTable:data})
        }

    //............Order details...................
    
const initial_order =  {
        Order_Details:'',
        Order_Quantity:0,
        Order_Rate:0,
        Order_Amount:0 }     

const [ordr,setordr] = useState(initial_order)

const [ordr_count,set_ordr_count]=useState(0)   
const [del_count,set_del_count]=useState(0)

    function handle_ordr_input(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        setordr((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    function handle_state_input(e){
        var name = e.target.name
        var value= e.target.value
        validate_form(name, value) 
        // props.ssv({...props.sv, [e.target.name]: e.target.value})
        props.ssv((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
  
    
    function add_ordr(e){
        e.preventDefault()
        set_ordr_count(ordr_count+1)  

        var payload = {
            Order_Details:ordr.Order_Details,
            Order_Quantity:ordr.Order_Quantity,
            Order_Rate:ordr.Order_Rate,
            Order_Amount:ordr.Order_Amount
         }

         var f2 = async(payload)=>{
            await props.sv.OrderTable.push(payload)
         }
         f2(payload);
        // props.sv.OrderTable.push(payload)
        alert(JSON.stringify(payload))
        setordr(initial_order)
    }
    function delete_order(event,indx){
        event.preventDefault()
        set_del_count(del_count+1)
        var data = [...props.sv.OrderTable];
        data.splice(indx, 1);
        props.ssv({OrderTable:data})
    }



     useEffect(() => {
        // OrderCount:0,  
       //   DepositCount:0, 
    console.log('props are changing') 
    // var bill_amt =0;
    // if(ordr_count >= 1){
    // props.sv.OrderTable.map((k,indx)=>{
    //                 bill_amt = (parseInt(bill_amt) + parseInt(k.Order_Amount))
    //                 // console.log(indx,k.Order_Amount,bill_amt)
    //                 })   
    // }
    // props.sv.BillAmt=bill_amt 
    // props.ssv({OrderCount:ordr_count })
    },[props])

//.............. above this line logic of the orders page and below it lies error validation code............................................

const [err,seterr]=useState({
    err_Order_Details:{ show:true , message:'' },
    err_Order_Quantity:{ show:true , message:'' },
    err_Order_Rate:{ show:true , message:'' },
    err_Order_Amount:{ show:true , message:'' },
    err_DeliveryDate:{ show:true , message:'' },
    err_DeliveryPlace:{ show:true , message:'' },
    err_Deposit_Date  :{ show:true , message:''},
    err_Deposit_Amount :{ show:true , message:''},
    err_Deposit_UTRNo :{ show:true , message:''},
    err_Deposit_Bank:{show:true, message:''}
})
function field_is_empty(value)
{
    if(value === '' || value === null)
    {return true}
    else
    {return false}
}  
    function validate_form(name,value){
    console.log(name,value)
    switch (name) {

        case 'Order_Details': if(field_is_empty(value) && ordr_count===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Details  :{
                                    ...prevState.err_Order_Details ,
                                    show:true ,
                                    message:'order details cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Details  :{
                                    ...prevState.err_Order_Details ,
                                    show:false ,
                                    message:''    
                                    }
                                }))
                            }
            break;

        case 'Order_Quantity':if(field_is_empty(value) && ordr_count===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Quantity  :{
                                    ...prevState.err_Order_Quantity ,
                                    show:true ,
                                    message:'Quantity cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Quantity:{
                                    ...prevState.err_Order_Quantity ,
                                    show:false ,
                                    message:''    
                                    }
                                }))
                            }
            break;

        case 'Order_Rate':if(field_is_empty(value) && ordr_count===0)
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Rate  :{
                                    ...prevState.err_Order_Rate ,
                                    show:true ,
                                    message:'Rate cant be blank'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Order_Rate  :{
                                    ...prevState.err_Order_Rate ,
                                    show:false,
                                    message:''    
                                    }
                                }))
                            }
            break;

        case 'Order_Amount':
            break;

        case 'DeliveryDate':if(field_is_empty(value) ){
                        seterr((prevState)=>({
                            ...prevState,
                            err_DeliveryDate:{
                            ...prevState.err_DeliveryDate,
                            show:true,
                            message:'Delivery Date cant be blank!'    
                            }
                        }))
                        }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_DeliveryDate:{
                                    ...prevState.err_DeliveryDate,
                                    show:false,
                                    message:''    
                                    }
                                }))

                        }
            break;
            case 'DeliveryPlace':if(field_is_empty(value)){
                seterr((prevState)=>({
                    ...prevState,
                    err_DeliveryPlace:{
                    ...prevState.err_DeliveryPlace,
                    show:true,
                    message:'Delivery Place cannot be blank!'    
                    }
                }))
                }
                    else{
                        seterr((prevState)=>({
                            ...prevState,
                            err_DeliveryPlace:{
                            ...prevState.err_DeliveryPlace,
                            show:false,
                            message:''    
                            }
                        }))
                }
                break;
                case 'Deposit_Date':if(field_is_empty(value) && bnk_count === 0){
                    seterr((prevState)=>({
                        ...prevState,
                        err_Deposit_Date:{
                        ...prevState.err_Deposit_Date,
                        show:true,
                        message:'Deposit Date cannot be blank!'    
                        }
                    }))
                    }
                        else{
                            seterr((prevState)=>({
                                ...prevState,
                                err_Deposit_Date:{
                                ...prevState.err_Deposit_Date,
                                show:false,
                                message:''    
                                }
                            }))
                    }
            break;

            case 'Deposit_Amount':if(field_is_empty(value) && bnk_count === 0){
                seterr((prevState)=>({
                    ...prevState,
                    err_Deposit_Amount:{
                    ...prevState.err_Deposit_Amount,
                    show:true,
                    message:'Deposit Amount cannot be blank!'    
                    }
                }))
                }
                    else{
                        seterr((prevState)=>({
                            ...prevState,
                            err_Deposit_Amount:{
                            ...prevState.err_Deposit_Amount,
                            show:false,
                            message:''    
                            }
                        }))
                }
        break;

        case 'Deposit_UTRNo':if(field_is_empty(value) && bnk_count === 0){
            seterr((prevState)=>({
                ...prevState,
                err_Deposit_UTRNo:{
                ...prevState.err_Deposit_UTRNo,
                show:true,
                message:' UTR/IMPS/RTGS/Ref no number  cannot be blank!'    
                }
            }))
            }
                else{
                    seterr((prevState)=>({
                        ...prevState,
                        err_Deposit_UTRNo:{
                        ...prevState.err_Deposit_UTRNo,
                        show:false,
                        message:''    
                        }
                    }))
            }
    break;
    case 'Deposit_Bank':if(field_is_empty(value) && bnk_count === 0){
        seterr((prevState)=>({
            ...prevState,
            err_Deposit_Bank:{
            ...prevState.err_Deposit_Bank ,
            show:true,
            message:' Bank Name cannot be blank!'    
            }
        }))
        }
            else{
                seterr((prevState)=>({
                    ...prevState,
                    err_Deposit_Bank:{
                    ...prevState.err_Deposit_Bank,
                    show:false,
                    message:''    
                    }
                }))
        }
break;

        default:alert('unknown case encountered');
            break;
    }
    }

    return (
        <div className="frame">
            {JSON.stringify(props.sv.OrderTable)}
            <h1>Order</h1>
            <table>
             {/*    
                <tr className="tablebox">
                    <th className="tablecell"><span>[+/-]</span></th>
                    <th className="tablecell"><span>Detail</span></th>
                    <th className="tablecell"><span>Quantity</span></th>
                    <th className="tablecell"><span>Rate</span></th>
                    <th className="tablecell"><span>Amount</span></th>
                </tr>

                <tr className="tablebox">
                    <td className="tablecell">{}</td>
                    <td className="tablecell">{err.err_Order_Details.show ? err.err_Order_Details.message :''}</td>
                    <td className="tablecell">{err.err_Order_Quantity.show ? err.err_Order_Quantity.message :''}</td>
                    <td className="tablecell">{err.err_Order_Rate.show ? err.err_Order_Rate.message :''}</td>
                    <td className="tablecell">{}</td>
                </tr>

                <tr className="tablebox" >
                    <th className="tablecell">
                        <button className="btn_add" onClick={add_ordr}>+</button>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Details" value={ordr.Order_Details} onChange={handle_ordr_input} placeholder="Details"  className="inp" type="text"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Quantity" value={ordr.Order_Quantity} onChange={handle_ordr_input} placeholder="Quantity"  className="inp" type="number"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Rate" value={ordr.Order_Rate} onChange={handle_ordr_input} placeholder="Rate" className="inp" type="number"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Amount" value={ ordr.Order_Amount=ordr.Order_Quantity*ordr.Order_Rate   }  placeholder="Amount" disabled className="inp"  type="number"/>
                    </th>
                </tr>
                     {
                     props.sv.OrderTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={indx}>
                           <td className="tablecell" key={indx}><button className="del_btn" onClick={(e)=>delete_order(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Order_Details}</td>
                           <td className="tablecell">{k.Order_Quantity}</td>
                           <td className="tablecell">{k.Order_Rate}</td>
                           <td className="tablecell">{k.Order_Amount}</td>
                       </tr>)
                     })
                    

                     }
                <tr className="tablebox">
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">Bill Amount</td>
                    <td className="tablecell">{props.sv.BillAmt}</td>
                </tr>  
                <tr className="tablebox">
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">Transport Charges</td>
                    <td className="tablecell">{0}</td>
                </tr>   
                <tr className="tablebox">
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">Total Amount</td>
                    <td className="tablecell">{0}</td>
                </tr>    
                <tr className="tablebox">
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">Advance Payment</td>
                    <td className="tablecell">{0}</td>
                </tr>        
                <tr className="tablebox">
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">.</td>
                    <td className="tablecell">Due Amount</td>
                    <td className="tablecell">{0}</td>
                </tr> 
                */}     
            </table>  
            <table>
                <tr className="tablebox">
                    <th className="tablecell"><span>[+/-]</span></th>
                    <th className="tablecell"><span>Detail</span></th>
                    <th className="tablecell"><span>Quantity</span></th>
                    <th className="tablecell"><span>Rate</span></th>
                    <th className="tablecell"><span>Amount</span></th>
                </tr>

                <tr className="tablebox">
                    <td className="tablecell">{}</td>
                    <td className="tablecell">{err.err_Order_Details.show ? err.err_Order_Details.message :''}</td>
                    <td className="tablecell">{err.err_Order_Quantity.show ? err.err_Order_Quantity.message :''}</td>
                    <td className="tablecell">{err.err_Order_Rate.show ? err.err_Order_Rate.message :''}</td>
                    <td className="tablecell">{}</td>
                </tr>

                <tr className="tablebox" >
                    <th className="tablecell">
                        <button className="btn_add" onClick={add_ordr}>+</button>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Details" value={ordr.Order_Details} onChange={handle_ordr_input} placeholder="Details"  className="inp" type="text"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Quantity" value={ordr.Order_Quantity} onChange={handle_ordr_input} placeholder="Quantity"  className="inp" type="number"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Rate" value={ordr.Order_Rate} onChange={handle_ordr_input} placeholder="Rate" className="inp" type="number"/>
                    </th>
                    <th className="tablecell">
                        <input name="Order_Amount" value={ ordr.Order_Amount=ordr.Order_Quantity*ordr.Order_Rate   }  placeholder="Amount" disabled className="inp"  type="number"/>
                    </th>
                </tr>
             </table>   
             <table>
             {/* {         props.sv.OrderTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={"k"+indx}>
                           <td className="tablecell" ><button className="del_btn" onClick={(e)=>delete_order(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Order_Details}</td>
                           <td className="tablecell">{k.Order_Quantity}</td>
                           <td className="tablecell">{k.Order_Rate}</td>
                           <td className="tablecell">{k.Order_Amount}</td>   
                       </tr>)
                     })
                     } */}
             </table>

            <table>
            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Bill Amount</td>
                                <td className="tablecell">{props.sv.BillAmt}</td>
                            </tr>  
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Transport Charges</td>
                                <td className="tablecell">{0}</td>
                            </tr>   
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Total Amount</td>
                                <td className="tablecell">{0}</td>
                            </tr>    
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Advance Payment</td>
                                <td className="tablecell">{0}</td>
                            </tr>        
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Due Amount</td>
                                <td className="tablecell">{0}</td>
                            </tr> 
                        </table>
            
            <hr></hr>

            <tr className="del_cont">  
            <div className="del_dat">
            <td>Delivery Date :</td>  
             <td ><input name="DeliveryDate" value={props.sv.DeliveryDate} onChange={handle_state_input}    type="date"/></td>
             {err.err_DeliveryDate.show ? <td>{err.err_DeliveryDate.message}</td>:''   }
            </div>
            <div className="del_add">
            <td>Delivery Address :</td>  
             <td ><input  name="DeliveryPlace" value={props.sv.DeliveryPlace} onChange={handle_state_input}    placeholder="Delivery Address" type="text"/></td> 
             {err.err_DeliveryPlace.show ? <td>{err.err_DeliveryPlace.message}</td>:''   }
            </div>
            </tr>

            <hr></hr>

            <table>
                {JSON.stringify(props.sv.DepositTable)}
                <tr className="tablebox">
                    <th className="tablecell"><span>[+/-]</span></th>
                    <th className="tablecell"><span>Deposit Date</span></th>
                    <th className="tablecell"><span>Amount</span></th>
                    <th className="tablecell"><span>UTR/RTGS/IMPS</span></th>
                    <th className="tablecell"><span>Bank Name</span></th>
                </tr>
                <tr className="tablebox">
                    <td className="tablecell">{}</td>
                    <td className="tablecell">{err.err_Deposit_Date.show ?<span>{err.err_Deposit_Date.message}</span>:''}</td>
                    <td className="tablecell">{err.err_Deposit_Amount.show ?<span>{err.err_Deposit_Amount.message}</span>:''} </td>
                    <td className="tablecell">{err.err_Deposit_UTRNo.show ?<span>{err.err_Deposit_UTRNo.message}</span>:''}</td>
                    <td className="tablecell">{err.err_Deposit_Bank.show ?<span>{err.err_Deposit_Bank.message}</span>:''}</td>
                </tr>  
                <tr className="tablebox" id="sdfh">
                    <td className="tablecell">
                        <button className="btn_add" onClick={add_bnk}>+</button>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_Date" value={bnk.Deposit_Date} onChange={handle_bnk_input} placeholder="Deposit Date"  className="in" type="date"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_Amount" value={bnk.Deposit_Amount} onChange={handle_bnk_input} placeholder="Deposit Amount"  className="inp" type="number"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_UTRNo" value={bnk.Deposit_UTRNo} onChange={handle_bnk_input} placeholder="UTR/IMPS/RTGS/REF No" className="inp" type="text"/>
                    </td>
                    <td className="tablecell">
                        <input name="Deposit_Bank" value={ bnk.Deposit_Bank}  onChange={handle_bnk_input} placeholder="Bank Name"  className="inp"  type="text"/>
                    </td>
                </tr>
                {
                     props.sv.DepositTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={"indx"+indx}>
                           <td className="tablecell" ><button className="del_btn" onClick={(e,indx)=>delete_bnk(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Deposit_Date}</td>
                           <td className="tablecell">{k.Deposit_Amount}</td>
                           <td className="tablecell">{k.Deposit_UTRNo}</td>
                           <td className="tablecell">{k.Deposit_Bank}</td>
                       </tr>)
                     })
                     }
            </table>    
            {ordr_count}
            {bnk_count}
        </div>
    )
}

export default Order
