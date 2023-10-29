import React from 'react'
import {useState,useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import $ from 'jquery'
import axios from 'axios'

import './Login.css'
const Login = () => {
      const Navigate=useNavigate();
     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
 
      const [data,setData]=useState([]);
// useEffect(()=>{
//     axios.get("https://database-management-serversie.herokuapp.com/user")
//          .then((response)=>setData(response.data));
// },[])
  const submit=async(e)=>{
        e.preventDefault();
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
        if(email!=""&&password!="")
        {
              await axios.post('http://localhost:9000/login',{
                  email:email,
                  password:password
              })
              .then((resp)=>{
                  console.log("LOGIN RESPONSE--->",resp)
                  if(resp.data.error==false)
                  {
                         Navigate(`/user/${resp.data.userId}`)
                  }
                  else
                  {
                             $('.match').show();
                               setTimeout(() => {
                                      $('.match').hide();
                               }, 3000);     
                  }
              })
        }
  }
  return (
    <div className='login'>
                 <div className="" style={{marginTop:160}}>
                    <div className="row">
                          <div className="col-sm-4"></div>
                          <div className="col-sm-4">
                                <div className="box p-4 mx-2" style={{backgroundColor:'#fff',borderRadius:8}}>
                                      <div className="row">
                                            <div className="col-6 text-center">
                                                  <a href="/login" className="loginBtn details" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>LOGIN</a>
                                            </div>
                                            <div className="col-6 text-center">
                                                  <a href='/signup' className="signupBtn details" style={{textDecoration:'none',color:'grey',fontWeight:'bold'}}>SIGNUP</a>
                                            </div>
                                      </div>
                                      <form action="" className="loginForm my-3">
                                            {/* <input type="text" className="form-control" placeholder='USERNAME' style={{border:'1px solid black'}} />
                                            <div className="name_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter Username</div>
                                            <br />
                                            <input type="text" className="form-control mainLoginInput" placeholder='&#61475;' style={{border:'1px solid black'}} />
                                            <div className="name_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter Username</div> */}
                                           <div className="container">
                                           {/* <div className="combinedInput" style={{border:'1px solid black',height:40,borderRadius:4}}>
                                                      <div className="a text-center">
                                                      <span className=""><i className="fas fa-2x   fa-user" ></i></span>
                                                      </div>
                                                      <div className="b" style={{borderLeft:'1px solid black'}}>
                                                            <input type="text" className='' placeholder='USERNAME' style={{width:'100%',height:'100%',border:'none'}} />
                                                      </div>
                                            </div> */}
                                            {/* <br /> */}
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
                                            <br />
                                           <div className="combinedInput" style={{border:'1px solid black',height:40,borderRadius:4}}>
                                                      <div className="a text-center">
                                                      <span className=""><i className="fas fa-2x   fa-lock"></i></span>
                                                      </div>
                                                      <div className="b" style={{borderLeft:'1px solid black'}}>
                                                            <input type="password" className='' placeholder='PASSWORD' style={{width:'100%',height:'100%',border:'none'}} onChange={(e)=>setPassword(e.target.value)} />
                                                            <div className="password_error text-center" style={{fontSize:10,color:'red',display:'none'}}>*Please Enter Password</div>
                                                      </div>
                                            </div>
                                            <br />
                                            <div className="text-center match" style={{fontSize:12,color:'red',display:'none'}}>Invalid User!</div>
                                            <div className="text-center">
                                                      <button className='btn btn-dark' onClick={submit}>LOGIN</button>
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

export default Login