import Axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Admin.css"
import userImg from "./user.png"
import carbook from './carbook.png'


export default function Admin(){

    const navigate = useNavigate()

    const [sessionUser, setSessionUser] = useState("")

    const [users, setUser] = useState([])
    const [car, setCar] = useState([])
    const [bookings, setBooking] = useState([])

    const [carInput, setCarInput] = useState(["", "", "", ""])



    useEffect(()=>{
        if(sessionStorage.getItem("UserID") == null){
            
            navigate("/")
        }else{

            if(sessionStorage.getItem("Admin") != "Admin"){
                navigate("/")
            }

            console.log("hello")
            console.log(sessionStorage.getItem("UserID"))
            setSessionUser({
                "UserID": sessionStorage.getItem("UserID"),
                "Name": sessionStorage.getItem("Name"),
                "Phone": sessionStorage.getItem("Phone")
            })
            console.log(sessionUser )
        }

        

    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/getUserDetails").then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/getCarDetails").then((res)=>{
            console.log(res.data)
            setCar(res.data)
        })
    },[])


    useEffect(()=>{
        Axios.get("http://localhost:3001/getBookings").then((res)=>{
            console.log(res.data)
            setBooking(res.data)
        })
    },[])

    const onRemoveBooking =(bookingiD) =>{
        Axios.post("http://localhost:3001/removeBooking", {
            BookingID: bookingiD
        }).then((res)=>{
            console.log(res)
        })
    }

    const UserView=()=>{


        return(
            <div className='adminUserDetails'>
                <h1 style={{color: "blue"}}>User Details</h1>
                <ul className='adminUserDetailsList'>
                    <h3>UserID</h3>
                    <h3>Name</h3>
                    <h3>Username</h3>
                    <h3>UserPassword</h3>
                    <h3>Phone</h3>
                    <h3>Admin</h3>
                </ul>

                {
                    users.map((u)=>{

                        return(
                            <ul className='adminUserDetailsList'>
                                <h3>{u["UserID"]}</h3>
                                <h3>{u["Name"]}</h3>
                                <h3>{u["Username"]}</h3>
                                <h3>{u["UserPassword"]}</h3>
                                <h3>{u["Phone"]}</h3>
                                <h3>{u["Admin"]}</h3>
                            </ul>
                        )
                    })
                }
        
            </div>
        )
    }

    const BookingView=()=>{


        return(
            <div className=' adminBookingDetails'>
                <h1 style={{color: "blue"}}>Booking Details</h1>
                <ul className='adminBookingDetailsList'>
                    <h3>BookingID</h3>
                    <h3>UserID</h3>
                    <h3>CarID</h3>
                    <h3>Start Date</h3>
                    <h3>Start Time</h3>
                    <h3>End Date</h3>
                    <h3>End Time</h3>
                </ul>

                {
                    bookings.map((u)=>{
                        let startdatetime = new Date(u["StartDate"])
                        let enddatetime = new Date(u["EndDate"])
                        startdatetime = startdatetime.toLocaleString().split(", ")
                        enddatetime = enddatetime.toLocaleString().split(", ")
                        return(
                            <ul className='adminBookingDetailsList'>
                                <h3>{u["BookingID"]}</h3>
                                <h3>{u["UserID"]}</h3>
                                <h3>{u["CarID"]}</h3>
                                <h3>{startdatetime[0]}</h3>
                                <h3>{startdatetime[1]}</h3>
                                <h3>{enddatetime[0]}</h3>
                                <h3>{enddatetime[1]}</h3>
                                <button onClick={()=>{onRemoveBooking(u["BookingID"])}}></button>
                            </ul>
                        )
                    })
                }
        
            </div>
        )
    }

    const CarView=()=>{
        
        return(
            <div className='adminCarDetails'>
                
                <h1 style={{color: "blue"}}>User Details</h1>
                <ul className='adminCarDetailsList'>
                    <h3>CarID</h3>
                    <h3>Name</h3>
                    <h3 >Features</h3>
                    <h3>Type</h3>
                    <h3>Description</h3>
                </ul>

                {
                    car.map((u)=>{

                        return(
                            <ul className='adminCarDetailsList'>
                                <h3>{u["CarID"]}</h3>
                                <h3>{u["Name"]}</h3>
                                <h3 style={{width: "150px"}}>{u["Features"]}</h3>
                                <h3>{u["Type"]}</h3>
                                <h3 style={{width: "150px"}}>{u["Description"]}</h3>
                            </ul>
                        )
                    })
                }
        
            </div>
        )
    }

    const addCar=()=>{
        let allfilled = true
        for(let i=0; i<carInput.length; i++){
            if(carInput[i] == ""){
                alert("All the fields must be filled up")
                allfilled = false
                break;
            }
        }

        if(allfilled){
            Axios.post("http://localhost:3001/addCar", {
                Name: carInput[0],
                Description: carInput[1],
                Features: carInput[2],
                Type: carInput[3]

            }).then((res)=>{
                console.log("Done")
            })
        }
    }

    const CarInput=()=>{


        return(
            <div className='adminCarInput'>
                <h1>Provide Car Details</h1>
                <h3>Name</h3>
                <input onChange={(e)=>{let a = carInput; a[0] = e.target.value; setCarInput(a);}}/>
                <h3>Description</h3>
                <input onChange={(e)=>{let a = carInput; a[1] = e.target.value; setCarInput(a);}} />
                <h3>Features</h3>
                <input onChange={(e)=>{let a = carInput; a[2] = e.target.value; setCarInput(a);}} />
                <h3>Type</h3>
                <input onChange={(e)=>{let a = carInput; a[3] = e.target.value; setCarInput(a);}} />

                <button onClick={addCar}>Add Car</button>
            </div>
        )
    }


    return(
        <div className='container'>
            <h1 style={{backgroundColor: "#3454d1"}}>WELCOME KING {sessionUser["Name"]}</h1>

            <div className='logout'>
                <h3 >{sessionUser["Name"]}</h3>
                <button onClick={()=>{sessionStorage.clear(); navigate("/")}}>Logout</button>
            </div>
            
            {/*User */}
            <div className=' adminUserView'>
                <img src={userImg} style={{marginLeft: "1%", borderRadius: "10px"}}/>
                <UserView />
                
            </div>
            

            {/* Booking Details */}
            <div className='adminBookingView'>
                <img src={carbook} style={{width: "40%", borderRadius: "10px"}}/>
                <BookingView />
                
            </div>

            {/* Car Details */}
            <div className='admincarView'>
                <CarView />
                <CarInput />
            </div>

        </div>
    )
}