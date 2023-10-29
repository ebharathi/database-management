import React from 'react'
import {useState,useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import $ from 'jquery'
import axios from 'axios';
import './Home.css'
import Crud from './CRUD/Crud'
let i=0;
const Home = () => {
      const Navigate=useNavigate();
      const locationPath=decodeURI(useLocation().pathname);
      // console.log(locationPath);
      const Userid=locationPath.substring(locationPath.lastIndexOf('user/')+5);
      // console.log(Userid);
//    const [noc,setNOC]=useState(0);
   const [db,setDB]=useState("");
   const [refresh,setRefresh]=useState(0);
   const [data,setData]=useState([]);
   const [flag,setFlag]=useState(0);
   useEffect(()=>{
         axios.get("https://database-management-serversie.herokuapp.com/database")
              .then((response)=>setData(response.data));
   },[refresh])
   const [col,setCOL]=useState([])
  //addcolumn
//needed DATAS

  const addColumn=(e)=>{
        e.preventDefault();
       setCOL(curr=>[...curr,col.length+1])
  }
  const removeColumn=(e)=>{
        e.preventDefault();
      //  setTodos(todos.slice(0, -1)));
      setCOL((previousArr) => (previousArr.slice(0, -1)));
      }
  const databaseCreation=(e)=>{
        e.preventDefault();
        let dbname=$('.dbname').val();
      //   console.log(dbname);
        if(col.length==0)
        {
              $('.error').show();
              setTimeout(() => {
              $('.error').hide();
              }, 3000);
        }
        if(dbname=="")
        {
            $('.dberror').show();
            setTimeout(() => {
            $('.dberror').hide();
            }, 3000);
        }
        if(dbname!=""&&col.length>0)
        {
              let flag=0;
             data.map(d=>{
                  if(d.creator==Userid)
                  {
                        if(d.dbname==dbname)
                        {
                              $('.dbnameerror').show();
                              setTimeout(() => {
                                   $('.dbnameerror').hide(); 
                              }, 4000);
                              flag=1;
                        }
                  }
             })
             if(flag==0)
             {
                  let proceed=0;
                  let arr=[];
                  col.map((c,index)=>{
                        let cN=$(`.column-${c}`).val();
                        if(cN=="")
                        {
                          proceed=1;
                          $('.fielderror').show();
                          setTimeout(() => {
                          $('.fielderror').hide();
                          }, 4000);
                        }
                        if(cN.length>10)
                        {
                              proceed=1;
                              $('.charerror').show();
                              setTimeout(() => {
                              $('.charerror').hide();
                              }, 4000);  
                        }
                        arr.push({
                              columnName:cN,
                              value:[]
                        })
                  })
                //   console.log(arr);
                 if(proceed==0)
                 {
                  console.log("--->",dbname,"-->",arr)
                  let cols=[]
                  arr.map((s)=>{
                        cols.push(s.columnName)
                  })
                  axios.post(`http://localhost:9000/table/create`,{
                        creator:Userid,
                        tableName:dbname,
                        cols:cols
                   })
                   .then((resp)=>{
                        console.log("CREATE TABLE RESPONSE FROM BACKEND--->",resp)
                        if(resp.data.error==false)
                        {
                               setRefresh(Math.floor(Math.random()*(400-5+1)+5));
                               $('.success').show();
                               Navigate(locationPath);
                               setTimeout(()=>{
                               $('.success').hide();
                               var frm = $('.addDatabase')[0];
                               frm.reset();
                               
                               },3000)
                        }
                        else{
                              $('.db-err').show();
                              setTimeout(() => {
                              $('.db-err').hide();
                              }, 4000);  
                        }
                   }) 
                 }     
             }
      
        }
  }
  //removing Database
  const removeDB=(e)=>{
      console.log(e.target.className);
      data.map(d=>{
            if(d.creator==Userid)
            {
                  if(d.dbname==e.target.className)
                  {
                        axios.delete(`https://database-management-serversie.herokuapp.com/database/delete/${d._id}`)
                             .then(()=>{
                              setRefresh(Math.floor(Math.random()*(400-5+1)+5));
                             });
                  }
            }
      })
  }

  const load=(db)=>{
         setDB(db);
         setFlag(1);
  }
  return (
    <div className='home'>
          <nav className='navbar navbar-dark bg-dark'>
               <div className="container">
               <a href="#" className="navbar-brand">
                      <span className='details'>DATAbase</span>
                </a>
                <ul className="navbar-nav">
                      <li className="nav-item"><a href="/login" className="nav-link">LOGOUT</a></li>
                </ul>
               </div>
          </nav>
          <br />
          <div className="container" style={{border:'1px solid white',backgroundColor:'#fff',borderRadius:4}}>
                       <button className='btn btn-dark dashboard'>DASHBOARD</button>
                       <button className='btn ' style={{float:'right',backgroundColor:'#123475',color:'#fff'}} data-bs-toggle="modal" data-bs-target="#example" onClick={()=>setCOL([])}>new</button>
                       <hr style={{color:'black'}} />
                       {/* <br /> */}
          
                                                <div className="modal fade" id="example" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                      <div className="modal-dialog">
                                                      <div className="modal-content">
                                                            <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">NEW DATABASE</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                              <form action="" className='addDatabase'>
                                                                     <input type="text" placeholder='Database Name' className='form-control dbname' />
                                                                     <br />
                                                                     {/* <input type="text" placeholder='Column-1 Name' className='form-control column-1' /> */}
                                                                     {
                                                                         col!=""?col.map(c=><><br/><input type="text" placeholder={`Column-${c} name`} className={`form-control column-${c}`}></input><br/></>)  :''
                                                                     }
                                                                     <div className='text-right'><button className='btn btn-primary' style={{backgroundColor:'#123475'}} onClick={addColumn} >ADD COLUMN</button></div>
                                                                    <br />
                                                                     {
                                                                           col.length>0?<div><button className='btn btn-primary text-right' style={{backgroundColor:'#123475',float:''}} onClick={removeColumn}>REMOVE COLUMN</button></div>:''
                                                                     }
                                                                     <div className="error text-center" style={{fontSize:12,color:'red',display:'none'}}>Atleast One Column Must be Selected!</div>
                                                                     <div className="dberror text-center" style={{fontSize:12,color:'red',display:'none'}}>Please Enter Database Name!</div>
                                                                     <div className="dbnameerror text-center" style={{fontSize:12,color:'red',display:'none'}}>Database Name Already Exists!</div>
                                                                     <div className="fielderror text-center" style={{fontSize:12,color:'red',display:'none'}}>Please Enter all the Required Fields!</div>
                                                                     <div className="charerror text-center" style={{fontSize:12,color:'red',display:'none'}}>Max.10 Characters Only Allowed!</div>
                                                                     <div className="db-err text-center" style={{fontSize:12,color:'red',display:'none'}}>Database name already Exists!!</div>
                                                                     <div className="success text-center" style={{fontSize:12,color:'green',display:'none'}}>Successfully Created </div>
                                                              </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={databaseCreation}>CREATE</button>
                                                            </div>
                                                      </div>
                                                      </div>
                                                </div>
            
            <div className="row m-1" style={{border:'1px solid black',borderRadius:3}}>
                 <div className="col-sm-2 text-center" style={{borderRight:'',backgroundColor:'black'}}>
                      <span className='big-screen'>
                      <br />
                        <h6 style={{color:'#fff',fontSize:13,cursor:'pointer'}}>CREATED DATABASES</h6>
                        <hr />
                        {
                              data.map(d=>d.creator==Userid?<><a onClick={()=>load(d.dbname)} className='details big' style={{cursor:'pointer',textDecoration:'none',fontWeight:'lighter',color:'#fff'}}>{d.dbname}<span style={{fontSize:10,float:'right'}} className={d.dbname} onClick={removeDB}> X</span></a><hr/></>:'')
                        }
                      </span>
                       <div className="accordion my-1 small-screen" id="accordionExample">
                              <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne" >
                                    <button className="accordion-button"   type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                     <span style={{fontSize:14}}>CREATED DATABASES</span>
                                    </button>
                              </h2>
                              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                    {
                                          data.map(d=>d.creator==Userid?<><a onClick={()=>load(d.dbname)} className='details small' style={{cursor:'pointer',color:'black',textDecoration:'none',fontWeight:'lighter'}}>{d.dbname}<span style={{fontSize:10,float:'right'}} className={d.dbname} onClick={removeDB}> X</span></a><hr/></>:'')
                                    }
                                     </div>
                              </div>
                              </div>
                        </div>
                 </div>
                 <div className="col-sm-10">
                         {
                               flag==0?<h4 className='text-center details my-5'>SELECT A DATABASE TO PREVIEW</h4>:<Crud db={db} />
                         }
                 </div>
            </div>
            <div className="" style={{marginTop:100}}></div>
            </div>
            
    </div>
  )
}

export default Home