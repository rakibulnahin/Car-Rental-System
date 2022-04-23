import './Showroom.css';
import {useState, useEffect, useLayoutEffect} from 'react'
import Axios from 'axios'
import searchIcon from "../icons/search.png"
import rightIcon from '../icons/right.png'
import {useLocation, useNavigate} from 'react-router-dom'
// getting all car images



function Showroom() {

  const navigate = useNavigate()
  const location = useLocation()

  const [sessionUser, setSessionUser] =  useState("")
  const [authorized, setAuthorized] = useState(false)

  const [carImage, setCarImage] = useState([])
  const [carDetails, setCarDetails] = useState([])
  const [showFilter, setShowFilter] = useState("none")
  const [filterValue, setFilterValue] = useState("")
  const [filteredValues, setFilteredValues] = useState([])




  useLayoutEffect(()=>{

    // if(location.state!= null){
    //   if (location.state.authorized== true){
    //     setAuthorized(true)
    //     setSessionUser(location.state.sessionUser)
    //   }else{
    //     console.log("not authorized")
    //   }
    // }

    if(sessionStorage.getItem("UserID") != null){
      console.log("hello")
      setAuthorized(true)
      setSessionUser({
        "UserID": sessionStorage.getItem("UserID"),
        "Name": sessionStorage.getItem("Name"),
        "Phone": sessionStorage.getItem("Phone")
    })

    
    }
    console.log("state is "+sessionUser["UserID"])


    // getting all the car images
    function importAll(r) {
      return r.keys().map(r);
    }
    const imgs = importAll(require.context('../car pics/', false, /\.(png|jpe?g|svg)$/))
    setCarImage(imgs);
    console.log(carImage)
    //

    // getting car details from the database
    Axios.get("http://localhost:3001/getCarDetails").then((response)=>{
      console.log(response)
      setCarDetails(response.data)
    })
    //
    
  }, [authorized])

  const filterShowButton =()=>{
    if(showFilter == "none"){
      setShowFilter("block")
    }else{
      setShowFilter("none")
    }
  }


  const showroom =()=>{
    console.log("Welcome to show room")
    if(filterValue=="" || showFilter=="none"){
      return(
        carDetails.map((car)=>(
          <div className='slider'>
            <img src={carImage[car["CarID"]-1]} />
            <div className='content'>
              <h1>{car['Name']}</h1>
              <h3>{car['Description']}</h3>
              
              <ul>
                {car['Features'].split(",").map((feature)=>(
                  <li>{feature}</li>
                ))}
                
              </ul>

              <button onClick={()=>subscribeBtn(car)}><h3 style={{backgroundColor: "inherit"}}>Subscribe</h3> 
                <img src={rightIcon} style={{width: "20px", height: "20px", position: 'relative'}}/>
                <img src={rightIcon} style={{width: "20px", height: "20px", position: 'relative'}}/>
              </button>

            </div>
          </div>
        ))
    
      )
    }else if(filteredValues.length>0){
      return(
        filteredValues.map((car)=>(
          <div className='slider'>
            <img src={carImage[car["CarID"]-1]} />
            <div className='content'>
              <h1>{car['Name']}</h1>
              <h3>{car['Description']}</h3>
              
              <ul>
                {car['Features'].split(",").map((feature)=>(
                  <li>{feature}</li>
                ))}
                
              </ul>

              <button onClick={()=>subscribeBtn(car)}><h3 style={{backgroundColor: "inherit"}}>Subscribe</h3> 
                <img src={rightIcon} style={{width: "20px", height: "20px", position: 'relative'}}/>
                <img src={rightIcon} style={{width: "20px", height: "20px", position: 'relative'}}/>
              </button>

            </div>
          </div>
        ))
      )
    }
    
  }

  const findFilter =()=>{
    console.log(filterValue)
    console.log(carDetails)
    let a = []
    carDetails.map((car)=>{
      if(car["Type"].includes(filterValue) || car['Name'].includes(filterValue)){
        a.push(car)
      }
    })

    if(a.length>0){
      setFilteredValues(a)
      console.log("---------------------------------")
      console.log(a)
      console.log(filteredValues)
      console.log("---------------------------------")
    }else{
      console.log("filter hoy nai")
    }
  }

  const subscribeBtn=(car)=>{
    if(authorized){
      sessionStorage.setItem("car", JSON.stringify(car))
      console.log(JSON.stringify(car))
      navigate("/Subscribe")
      // , {state: {authorized: authorized, sessionUser: sessionUser, car: car}}
    }else{
      alert("NOT LOGGED IN !!!! GET OUT TRESSPASSER")
      navigate("/")
    }
  }
  
  

  return (
    <div className="App">
      <h1 style={{color: "white", margin: "30px", marginTop: "50px"}}>SHOWROOM</h1>

      <div style={{display: "flex", marginLeft: "10%", right: "0px", marginBottom: "5px"}}>
        <img className='searchIcon' src={searchIcon} onClick = {filterShowButton}/>
        <input className='filter' onChange={(e)=>{setFilterValue(e.target.value)}} style={{display: showFilter}} placeholder="Type or Name"></input>
        <button className='filter' onClick={findFilter} style={{width: "70px", marginLeft: "8px", display: showFilter}} >Submit</button>
      </div>
      
      <div className='PRO'>

        {
          showroom()
        }

        
      </div>


    </div>
  );
}

export default Showroom;
