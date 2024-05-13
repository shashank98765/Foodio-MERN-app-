import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
export default function MyOrder() {


    const [orderData,setOrderData] = useState("");
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    
    useEffect(() => {
        fetchMyOrder()
    }, [])


  return (
    <>
    <div>
      <Navbar />
    </div>

    
    <div className='container'>
                <div className='row'>

                    {orderData.length !== null ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_Date ? <div className='m-auto mt-5 col-12 col-md-6 col-lg-3 text-danger'>

                                                        {data = arrayData.Order_Date}
                                                        <hr />
                                                    </div> :

                                                        <div className='m-auto mt-5 col-12 col-md-6 col-lg-3 border border-primary' >
                                                            <div className="card mt-3 " style={{ width: "16rem", maxHeight: "360px" }}>
                                                               { /*<img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body border border-warning">
                                                                    <h5 className="card-title text-warning">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1 '>{arrayData.size}</span>
                                                                        <span className='m-1 mx-3'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5 fw-bold text-success' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>


    <div>
      <Footer/>
    </div>
    </>
  )
}
