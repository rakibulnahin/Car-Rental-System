import Axios from 'axios'
import {useState, useEffect, useLayoutEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./UserView.css"


export default function UserView(){

    const navigate = useNavigate()

    const [sessionUser, setSessionUser] = useState("")

    const [bookingID, setBookingID] = useState("")

    const [userBookingDetails, setUserBookingDetails] = useState([])


    useEffect(()=>{
        if(sessionStorage.getItem("UserID") == null){
            navigate("/")
        }else{
            // console.log("userID "+sessionStorage.getItem("UserID"))
            // console.log("Name "+sessionStorage.getItem("Name"))
            // console.log("Phone "+sessionStorage.getItem("Phone"))
            setSessionUser({
                "UserID": sessionStorage.getItem("UserID"),
                "Name": sessionStorage.getItem("Name"),
                "Phone": sessionStorage.getItem("Phone")
            })
            console.log(sessionUser )
        }

        

    },[])


    useEffect(()=>{
        console.log(sessionUser )
        Axios.get("http://localhost:3001/getUserBookings", {
            params: {UserID: sessionUser["UserID"]}
        }).then((res)=>{
            // console.log(res)
            setUserBookingDetails(res.data)
        })
        console.log(userBookingDetails)
    },[sessionUser])

    
    const BookingsView=()=>{
        console.log("rendering"+typeof(userBookingDetails)+ userBookingDetails.length)
        if(userBookingDetails.length >0){
            return(
                userBookingDetails.map((b)=>{
                    let startdatetime = new Date(b["StartDate"])
                    let enddatetime = new Date(b["EndDate"])
                    startdatetime = startdatetime.toLocaleString().split(", ")
                    enddatetime = enddatetime.toLocaleString().split(", ")
                    console.log(startdatetime)
                    return(
                        <div className='bookingList'>
                            <h3>{b["BookingID"]}</h3>
                            <h3>{startdatetime[0]}</h3>
                            <h3>{startdatetime[1]}</h3>
                            <h3>{enddatetime[0]}</h3>
                            <h3>{enddatetime[1]}</h3>
                        </div>
                    )
                }
                )
            )
            
        }
        
    }

    const onRemove =()=>{
        let users = false
        for(let i=0; i<userBookingDetails.length; i++){
            if(userBookingDetails[i]["BookingID"] == bookingID){
                users = true
                break
            }
        }
        if(users){

            Axios.post("http://localhost:3001/removeBooking", {
                BookingID: bookingID
            }).then((res)=>{
                console.log("Done")
            })
        }else{
            alert("Wrong Booking ID")
        }
    }

    return(
        <div>
            <div className='logout' style={{marginTop: "-3.5%"}}>
                <h3 >{sessionUser["Name"]}</h3>
                <button onClick={()=>{sessionStorage.clear(); navigate("/")}}>Logout</button>
            </div>

            <div style={{display: "flex"}}>
                <div className='bookings'>
                    <h3 className='h'>Booking</h3>
                    <div className='headers'>
                        <h3>Booking ID</h3>
                        <h3>Start-Date</h3>
                        <h3>Start-Time</h3>
                        <h3>End-Date</h3>
                        <h3>End-Time</h3>
                        
                    </div>
                    
                    <BookingsView />

                </div>

                <div className='updateCard'>
                    {/* remove booking */}
                    <h1 style={{backgroundColor: "unset"}}>Remove you booking</h1>
                    <h3 style={{backgroundColor: "unset", marginTop: "-5%"}}>Booking ID</h3>
                    <input onChange={(e)=>{setBookingID(e.target.value)}} />
                    <button onClick={onRemove}>Remove</button>

                </div>


            </div>
            

            


            
        </div>
    )


}

