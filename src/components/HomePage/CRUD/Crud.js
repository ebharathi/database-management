import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import $ from 'jquery';
import { useNavigate,useLocation } from 'react-router-dom';
import Model from './Model';
import './crud.css'
const Crud = ({db}) => {
      const Navigate=useNavigate();
      const locationPath=decodeURI(useLocation().pathname);
      // console.log(locationPath);
      const Userid=locationPath.substring(locationPath.lastIndexOf('user/')+5);
      const [data,setData]=useState([]);
      const [field,setFields]=useState([])
      const [items,setItems]=useState([]);
      const [refresh,setRefresh]=useState(0);
      async function getData()
      {
            // alert("--->",db);
            await axios.get(`http://localhost:9000/table/get/${db}`)
            .then((res)=>{
                   console.log("res from table data in crud.js-->",res);
                   if(res.data?.error==false)
                   {
                        setItems(res?.data?.data?.rows);
                        if(res?.data?.data?.fields)
                         setFields(res?.data?.data?.fields)
                   }
            })
      }
      useEffect(()=>{
            getData();
      },[refresh,db])

    

      const remove=(e)=>{
            let col=$('.deleteCol').val();
            let key=$('.deleteKey').val();
            let array=[];
            e.preventDefault();
            if(col==""||key=="")
            {
                  $('.del-error').show();
                  setTimeout(() => {
                        $('.del-error').hide();
                  }, 2000);
                  return;
            }
            if(true)
            {
                  let q=`DELETE FROM ${db} WHERE ${col}='${key}' `
                  console.log("Delete query--->",q);
            axios.post(`http://localhost:9000/table/remove/row`,{
                  query:q
            })
            .then(response=>{
                  console.log("DELETE RESPONSE---->",response.data)
                  if(response.data?.error==false)
                  {
                        $('.del-success').show();
                       setRefresh(Math.floor(Math.random()*(400-5+1)+5));
                        setTimeout(() => {
                              $('.del-success').hide();
                              Navigate(locationPath);
                              var frm = $('.removeForm')[0];
                              frm.reset();
                        }, 2000);
                  }
                  else
                  {
                        $('.del-error2').show();
                        setTimeout(() => {
                              $('.del-error2').hide();
                        }, 2000); 
                  }
            });
            }
            
      }
  return (
    <div className='crud '>
      <div className='container container-scroll'>
          <div className='row m-1' >
  {
             field.map((s,index)=>index!=0&&
             <div className="my-1 col-scroll" style={{border:'1px solid black',maxWidth:170}}>
                              <table className='text-center' style={{width:'100%'}}>
                                    <tr className='text-center' style={{}}>
                                          <th className=''>{s.name}</th>
                                    </tr>
                                    <hr />
                                    {
                                          // dbc.value.map(val=><tr style={{}}><td>{val}</td><hr /></tr>)
                                          items.map((x,index1)=>x[s.name]&&<tr><td>{x[s.name]}</td><hr/></tr>)
                                    }
                              </table>
               </div>   
             )
  }
                  </div>
          </div>
          <div className="my-2" style={{float:''}}>
                <p style={{marginTop:75,fontSize:12}}>*scroll sideways to see all columns</p>
                <button className='btn btn-primary' style={{width:'100px'}} data-bs-toggle="modal" data-bs-target="#example2">ADD</button>
          </div>
                        {/* <div class="modal fade" id="example2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                <div class="modal-content">
                                                      <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalLabel">ADD DATA</h5>
                                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      </div>
                                                      <div class="modal-body">
                                                            <form action="" className='addForm'>
                                                                  {
                                                                       field.map((s)=>
                                                                            <>
                                                                              <input className={`form-control ${s.name}`} placeholder={`${s.name}`} />
                                                                            </>
                                                                       )
                                                                  }
                                                            </form>
                                                      </div>
                                                      <div className="text-center success" style={{color:'green',fontSize:12,display:'none'}}>Successfully Added!</div>
                                                      <div className="text-center failed" style={{color:'red',fontSize:12,display:'none'}}>Please Enter All the Required Fields!</div>
                                                      <div class="modal-footer">
                                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                      <button type="button" class="btn btn-success" onClick={add}>ADD</button>
                                                      </div>
                                                </div>
                                                </div>
                        </div> */}
        <Model field={field} db={db} setRefresh={setRefresh} />
          <div className="" style={{float:''}}>
                <button className='btn btn-danger' style={{width:'100px'}} data-bs-toggle="modal" data-bs-target="#example3">REMOVE</button>
          </div>                                    

                                     <div class="modal fade" id="example3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                          <div class="modal-dialog">
                                          <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">DELETE A DATA</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                <p>Delete a particular data by selecting its any Unique colum key</p>
                                                <form action="" className="removeForm">
                                                <input placeholder="COLUMN NAME" c className='form-control deleteCol refresh' />
                                                <br />
                                                <input placeholder="COLUMN KEY " className='form-control deleteKey refresh' />
                                                </form>
                                                </div>
                                                <div className="del-error text-center" style={{fontSize:12,display:'none',color:'red'}}>Please Enter The values!!</div>
                                                <div className="del-error2 text-center" style={{fontSize:12,display:'none',color:'red'}}>No Matching key,value found!!!</div>
                                                <div className="del-success text-center" style={{fontSize:12,display:'none',color:'green'}}>Deleted Successfully!</div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-danger" onClick={remove}>REMOVE</button>
                                                </div>
                                          </div>
                                          </div>
                                          </div>
          <div className="" style={{marginTop:30}}></div>
    </div>
  )
}

export default Crud