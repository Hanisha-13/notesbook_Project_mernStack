  import React ,{useState,useEffect} from "react";
  import axios from "axios";

  function App() {
    const [contact,setContact] = useState({name:"",email:"",phonenumber:""});
    const[data,setData] = useState([]);
    const [error,setError]= useState({name:"",email:"",phonenumber:""});
    const[editIndex,setEditIndex]=useState(null)


    const getContacts=async()=>{
      try{
          const response = await axios.get("http://localhost:5000/contacts");
          setData(response.data);
      }catch(err){
            console.error("Error fetching contacts:", err);
      }
    }
  useEffect(()=>{
      getContacts();
    },[])
    
    const OnChangeHandler=(e)=>{
      setContact({...contact,[e.target.name]:e.target.value});
      setError({...error,[e.target.name]:""});
    }
    

    const SubmitHandler=async(e)=>{
      e.preventDefault();
      const emailRegex= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if(contact.name.trim()===""){
        return setError({...error,name:"Name is required"})
      }
      else if(contact.name.length<3){
        return setError({...error,name:"Name should be at least 3 characters"})
      }else if(contact.email.trim()===""){
        return  setError({...error,email:"Email is required"});
      }else if(!emailRegex.test(contact.email)){
        return setError({...error,email:"Please enter a valid email"});
      }else if(contact.phonenumber.trim()===""){
        return setError({...error,phonenumber:"phonenumber must be required"});
      }else if(contact.phonenumber.length!==10){
        return   setError({...error,phonenumber:"Phonenumber should be 10 digits"});
      }
      if(editIndex !==null){
        try{
          const id = data[editIndex]._id;
          const response = await axios.put(`http://localhost:5000/contact/${id}`,contact)
          const updatedData=data.map((item,index)=>index===editIndex?response.data.contact:item);
        setData(updatedData);
        setEditIndex(null);
        setError({name:"",email:"",phonenumber:""});
        setContact({name:"",email:"",phonenumber:""});
        }catch(err){
          console.error("Error updating contact:", err);
        }  
        
      }
      else{
        try{
        const response=  await axios.post("http://localhost:5000/contacts",contact);
        setData([...data,response.data.contact]);
        setError({name:"",email:"",phonenumber:""});
        setContact({name:"",email:"",phonenumber:""});
      }catch(err){
          console.error("Error adding contact:", err);
      }
    }
  }

    const deleteHandler=async(indextodelete)=>{
      const id = data[indextodelete]._id;
      const response = await axios.delete(`http://localhost:5000/contact/${id}`)
      const updatedData=data.filter((item,index)=> index !== indextodelete);
      setData(updatedData);
    }

    const EditHandler=(index)=>{
      setEditIndex(index);
     setContact({
    name: data[index].name,
    email: data[index].email,
    phonenumber: String(data[index].phonenumber)
  });
    }
    return(
      <div>
        <h1>Contact Form</h1>
        <form onSubmit={SubmitHandler}>
          <input type="text" placeholder="Enter your name"  name="name"value={contact.name} onChange={OnChangeHandler}/><br/>
          {error.name && <span style={{color:"red"}}>{error.name}</span>}<br/>
          <input type="email" placeholder="Enter your Email" name="email" value={contact.email} onChange={OnChangeHandler}/><br/>
          {error.email && <span style={{color:"red"}}>{error.email}</span>}<br/>
          <input type="tel" placeholder="Enter Your phone number" name="phonenumber"value={contact.phonenumber} onChange={OnChangeHandler}   maxLength={10}/><br/>
          {error.phonenumber && <span style={{color:"red"}}>{error.phonenumber}</span>}<br/>
          <button>{editIndex !==null?"update User" :"Add user"}</button>
          </form>
          <div>
            <ul>
              {data.map((contact,index)=>(<li key={index}>{contact.name}{"  "}--{contact.email}{"  "}--{contact.phonenumber}{"  "} <button onClick={()=>EditHandler(index)}>Edit</button>{"  "}<button onClick={()=>deleteHandler(index)}>Delete</button> </li>))}
            </ul>
          </div>
        </div>
    )
  }

  export default App;