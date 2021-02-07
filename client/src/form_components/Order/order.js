import React,{useState,useEffect} from 'react'
import '../form.css'
import '../order.css'
function Order(props) {

    // console.log('rendering order')

    const [err,seterr]=useState({
        err_Order_Details:{ show:true , message:'' },
        err_Order_Quantity:{ show:true , message:'' },
        err_Order_Rate:{ show:true , message:'' },
        err_Order_Amount:{ show:true , message:'' },
        err_Trasport_Chrg:{ show:true , message:'' },
        err_Advance:{ show:true , message:'' }
    })


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

    function field_is_empty(value)
    {
        if(value === '' || value === null)
        {return true}
        else
        {return false}
    }  
        function validate_form(name,value){
        // console.log(name,value)
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

            case 'TransportChrg':if(field_is_empty(value))
                                {
                                    seterr((prevState)=>({
                                        ...prevState,
                                        err_Trasport_Chrg  :{
                                        ...prevState.err_Trasport_Chrg ,
                                        show:true ,
                                        message:'Enter Transport Charge or enter 0'    
                                        }
                                    }))
                                }
                                else{
                                    seterr((prevState)=>({
                                        ...prevState,
                                        err_Trasport_Chrg  :{
                                        ...prevState.err_Trasport_Chrg ,
                                        show:false ,
                                        message:''    
                                        }
                                    }))
                                }
            break;
            case 'Advance':if(field_is_empty(value))
                            {
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Advance:{
                                    ...prevState.err_Advance,
                                    show:true ,
                                    message:'Enter Advance Amount'    
                                    }
                                }))
                            }
                            else{
                                seterr((prevState)=>({
                                    ...prevState,
                                    err_Advance:{
                                    ...prevState.err_Advance,
                                    show:false ,
                                    message:''    
                                    }
                                }))
                            }
            break;
            default:alert('unknown case encountered');
            break;
    }
    }


    function table_len(){
        var len = props.sv.OrderTable.length;
        if (len >=1 )
        return true
        else
        return false
        }    
    useEffect(() => {
        if(table_len())
       {
           console.log('setting show b1 to true')
           props.show(true)
       }
       else{
           props.show(false)
           console.log('setting show b1 to false')
       }

       var sum = 0.0;
        props.sv.OrderTable.map((kk)=>{
        console.log(kk.Order_Amount)
        sum =sum+kk.Order_Amount
        })
        console.log(sum,props.sv.TotalAmt)
        props.ssv({...props.sv,BillAmt:sum })

    },[ordr_count,del_count])


     useEffect(() => {

        // var sum = 0.0;
        //     props.sv.OrderTable.map((kk)=>{
        //     console.log(kk.Order_Amount,props.sv.TransportChrg)
        //     sum =sum+kk.Order_Amount
        //     })

        // // props.ssv({...props.sv,TotalAmt: parseFloat(props.sv.BillAmt)+parseFloat(props.sv.TransportChrg)+ sum})

        props.ssv({...props.sv,TotalAmt: props.sv.BillAmt + props.sv.TransportChrg })
    }, [props.sv.TransportChrg])

    useEffect(() => {
        props.ssv({...props.sv,DueAmt: props.sv.TotalAmt - props.sv.Advance})
    }, [props.sv.BillAmt, props.sv.TransportChrg,props.sv.Advance])


   

    return (
        <div className = "frame1">
            <table>
            {/* {JSON.stringify(props.sv)} */}
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
             {         props.sv.OrderTable.map((k,indx)=>{
                       return (<tr className="tablebox" key={"k"+indx}>
                           <td className="tablecell" ><button className="del_btn" onClick={(e)=>delete_order(e,indx)}>delete{' '}{indx+1}</button></td>
                           <td className="tablecell">{k.Order_Details}</td>
                           <td className="tablecell">{k.Order_Quantity}</td>
                           <td className="tablecell">{k.Order_Rate}</td>
                           <td className="tablecell">{k.Order_Amount}</td>   
                       </tr>)
                     })
                     }

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
                                <td className="tablecell">{err.err_Trasport_Chrg.show? err.err_Trasport_Chrg.message:'' }</td>
                                <td className="tablecell">Transport Charges</td>
                                <td className="tablecell">{
                                <input name="TransportChrg" value={props.sv.TransportChrg} onChange={handle_state_input} placeholder="Transport chrg"  className="inp" type="number"/>
                                }</td>
                            </tr>   
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Total Amount</td>
                                <td className="tablecell">{props.sv.TotalAmt}</td>
                            </tr>    
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">{err.err_Advance.show? err.err_Advance.message:'' }</td>
                                <td className="tablecell">Advance Payment</td>
                                <td className="tablecell">{
                                <input name="Advance" value={props.sv.Advance} onChange={handle_state_input} placeholder="Advance"  className="inp" type="number"/>
                                }</td>
                            </tr>        
                            <tr className="tablebox">
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">.</td>
                                <td className="tablecell">Due Amount</td>
                                <td className="tablecell">{props.sv.DueAmt}</td>
                            </tr> 
                        </table>

        </div>
    )
}

export default  React.memo(Order)
