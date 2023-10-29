import React from 'react'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';


const Signup = () => {
      const Navigate=useNavigate();
      const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
    useEffect(()=>{
      //     axios.get("http://localhost:5000/user/add")
    },[])
     const submit=(e)=>{
           e.preventDefault();
           if(name=="")
           {
                  $('.name_error').show();
                  setTimeout(() => {
                      $('.name_error').hide();  
                  }, 4000);
           }
           if(email=="")
           {
                  $('.email_error').show();
                  setTimeout(() => {
                      $('.email_error').hide();  
                  }, 4000);
           }
           if(password=="")
           {
                  $('.password_error').show();
                  setTimeout(() => {
                      $('.password_error').hide();  
                  }, 4000);
           }
           if(name!=""&&email!=""&&password!="")
           {
                  axios.post("http://localhost:9000/signup",{
                        name:name,
                        email:email,
                        password:password
                  })
                  .then(response=>{
                        console.log("signup response came")
                        console.log(response.data);
                        // $('.success-msg').show();
                        // setTimeout(() => {
                        //       Navigate('/login');
                        // }, 5000);
                  })
           }
     }
  return (
      <div className='signup'>
      <div className="" style={{marginTop:160}}>
         <div className="row">
               <div className="col-sm-4"></div>
               <div className="col-sm-4">
                     <div className="box p-4 mx-2" style={{backgroundColor:'#fff',borderRadius:8}}>
                           <div className="row">
                                 <div className="col-6 text-center">
                                       <a href="/login" className="loginBtn details" style={{textDecoration:'none',color:'grey',fontWeight:'bold'}}>LOGIN</a>
                                 </div>
                                 <div className="col-6 text-center">
                                       <a href='/signup' className="signupBtn details" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>SIGNUP</a>
                                 </div>
                           </div>
                           <form action="" className="loginForm my-3">
                                 {/* <input type="text" className="form-control" placeholder='USERNAME' style={{border:'1px solid black'}} />
                                 <div className="name_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter Username</div>
                                 <br />
                                 <input type="text" className="form-control mainLoginInput" placeholder='&#61475;' style={{border:'1px solid black'}} />
                                 <div className="name_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter Username</div> */}
                                <div className="container">
                                <div className="combinedInput" style={{border:'1px solid black',height:40,borderRadius:4}}>
                                           <div className="a text-center">
                                           <span className=""><i className="fas fa-2x   fa-user" ></i></span>
                                           </div>
                                           <div className="b" style={{borderLeft:'1px solid black'}}>
                                                 <input type="text" className='' placeholder='USERNAME' style={{width:'100%',height:'100%',border:'none'}} onChange={(e)=>setName(e.target.value)} />
                                                 <div className="name_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter the Name</div>
                                           </div>
                                 </div>
                                 <br />
                                <div className="combinedInput" style={{border:'1px solid black',height:40,borderRadius:4}}>
                                           <div className="a text-center">
                                           <span className=""><i className="fas fa-2x   fa-envelope"></i></span>
                                           </div>
                                           <div className="b" style={{borderLeft:'1px solid black'}}>
                                                 <input type="email" className='' placeholder='EMAIL' style={{width:'100%',height:'100%',border:'none'}} onChange={(e)=>setEmail(e.target.value)} />
                                                 <div className="email_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter the Email</div>
                                           </div>
                                 </div>
                                 <br />    
                                <div className="combinedInput" style={{border:'1px solid black',height:40,borderRadius:4}}>
                                           <div className="a text-center">
                                           <span className=""><i className="fas fa-2x   fa-lock"></i></span>
                                           </div>
                                           <div className="b" style={{borderLeft:'1px solid black'}}>
                                                 <input type="password" className='' placeholder='PASSWORD' style={{width:'100%',height:'100%',border:'none'}} onChange={(e)=>setPassword(e.target.value)} />
                                                 <div className="password_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter the Password</div>
                                           </div>
                                 </div>
                                  <br />
                                  <div className="text-center success-msg" style={{fontSize:12,color:'green',display:'none'}}>
                                        SUCCEFULLY SIGNED UP! PLEASE WAIT WHILE REDIRECTING 
                                  </div>
                                  
                                  <div className="text-center">
                                  <button className='btn btn-dark' onClick={submit}>SIGN UP</button>
                                  </div>
                                </div>
                           </form>
                     </div>
               </div>
               <div className="col-sm-4"></div>
         </div>
      </div>
</div>
  )
}

export default Signup