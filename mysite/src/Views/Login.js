import './Login.css'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(){

    const navigate = useNavigate()

    const[userDetails, setUserDetails] = useState("") // user details from database
    const[isAuthnticated, setisAuthnticated] = useState("")

    const[loginUsername, setloginUsername] = useState("")
    const[loginPassword, setloginPassword] = useState("")

    const[registerName, setregisterName] = useState("")
    const[registerPhone, setregisterPhone] = useState("")
    const[registerUsername, setregisterUsername] = useState("")
    const[registerPassword, setregisterPassword] = useState("")

    useEffect(()=>{
    
        // getting user details from the database
        Axios.get("http://localhost:3001/getUserDetails").then((response)=>{
          console.log(response)
          setUserDetails(response.data)
        })
        //
        
    }, [])


    const onLoginPress=()=>{
        let authorized = false
        let sessionUser = ""
        userDetails.map((user)=>{
            if(user['Username'] == loginUsername && user['UserPassword'] == loginPassword){
                authorized = true;
                sessionUser = user;
                return
            }
        })

        console.log("authorized is "+authorized)
        console.log(sessionUser)

        if(authorized){
            sessionStorage.setItem("UserID", sessionUser["UserID"])
            sessionStorage.setItem("Name", sessionUser["Name"])
            sessionStorage.setItem("Phone", sessionUser["Phone"])
            sessionStorage.setItem("Admin", sessionUser["Admin"])
            
            setisAuthnticated("Successfull Verification")
            navigate("/Showroom", {state: {authorized: authorized, sessionUser: sessionUser}})
        }else{
            return(
                setisAuthnticated("Wrong Verification. Please Try Again")
            )
        }
        

    }



    const onRegsiterPress=()=>{
        Axios.post("http://localhost:3001/setUserDetails", {
            name: registerName,
            phone: registerPhone,
            username: registerUsername,
            password: registerPassword,

        }).then((res)=>{
            console.log("the response of register is "+res)
        })
    }


    return(
        <div className="login">
            <div className="logincard card">

                <h1>Login</h1>

                <h4>Username</h4>
                <input onChange={(e)=>{setloginUsername(e.target.value)}} />

                <h4>Password</h4>
                <input onChange={(e)=>{setloginPassword(e.target.value)}} />

                <button onClick={onLoginPress}>Login</button>
                <h2 style={{backgroundColor: "inherit"}}>{isAuthnticated}</h2>

            </div>

            <div className="register card">

                <h1>Register</h1>

                <h4>Name</h4>
                <input onChange={(e)=>{setregisterName(e.target.value)}} />

                <h4>Phone Number</h4>
                <input onChange={(e)=>{setregisterPhone(e.target.value)}} />

                <h4>Username</h4>
                <input onChange={(e)=>{setregisterUsername(e.target.value)}} />

                <h4>Password</h4>
                <input onChange={(e)=>{setregisterPassword(e.target.value)}} />

                <button onClick={onRegsiterPress}>Register</button>

            </div>

        </div>
    )
}

export default Login