import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import $ from 'jquery';
import { useNavigate,useLocation } from 'react-router-dom';

const Crud = ({db}) => {
      const Navigate=useNavigate();
      const locationPath=decodeURI(useLocation().pathname);
      // console.log(locationPath);
      const Userid=locationPath.substring(locationPath.lastIndexOf('user/')+5);
      const [data,setData]=useState([]);
      const [refresh,setRefresh]=useState(0);
      useEffect(()=>{
            axios.get("https://database-management-serversie.herokuapp.com/database")
                 .then((res)=>setData(res.data))
      },[refresh,db])

      const add=(e)=>{
            e.preventDefault();
            let arr=[];
            let Busid="";
            data.map(d=>d.creator==Userid?d.dbname==db?d.dbcolumn.map(dbc=>{
                   Busid=d._id;
                    let cname=dbc.columnName;
                    let valArr=[];
                    dbc.value.map(val=>valArr.push(val));
                    arr.push({
                          columnName:cname,
                          value:valArr
                    });
            }):'':'')
            // console.log(arr);
            let proceed=0;
            arr.map(a=>{
                 var val=$(`.${a.columnName}`).val();
                 if(val=="")
                 {
                          $('.failed').show();
                          setTimeout(() => {
                          $('.failed').hide();
                          }, 5000);
                          proceed=1;
                 }
                 a.value.push(val);
            })
            // console.log(arr);
           if(proceed==0)
           {
            axios.post(`https://database-management-serversie.herokuapp.com/database/update/${Busid}`,{
                  dbcolumn:arr
            })
            .then(res=>{
                  setRefresh(Math.floor(Math.random()*(400-5+1)+5));
             //      console.log(res.data)
                 $('.success').show();
                 setTimeout(() => {
                       $('.success').hide();
                       Navigate(locationPath);
                       setTimeout(() => {
                         var frm = $('.addForm')[0];
                         frm.reset(); 
                   //     setRefresh(99);
                       }, 2000);
                 }, 1000);
            });
           }
      }

      const remove=(e)=>{
            let col=$('.deleteCol').val();
            let key=$('.deleteKey').val();
            let index=-1;
            let array=[];
            e.preventDefault();
            data.map(d=>d.creator==Userid?d.dbname==db?d.dbcolumn.map(dbc=>
                    dbc.columnName.toLowerCase()==col.toLowerCase()?
                    dbc.value.map((val,ind)=>
                          val.toLowerCase()==key.toLowerCase()?
                          index=ind
                          :''
                    )
                    :''
            ):'':'')
            if(index==-1)
            {
                  $('.del-error').show();
                  setTimeout(() => {
                        $('.del-error').hide();
                  }, 2000);
            }
            if(index!=-1)
            {
                  console.log(index);
                  let Busid="";
                  data.map(d=>d.creator==Userid?d.dbname==db?d.dbcolumn.map(dbc=>{
                  Busid=d._id;
                        let newCol=dbc.columnName;
                        let newVal=[];
                        dbc.value.map((val,i)=>{
                              if(i!=index)
                              {
                                    newVal.push(val);
                              }
                        })
                        array.push({
                              columnName:newCol,
                              value:newVal
                        })
                  }):'':'')
            // console.log(array);  
            axios.post(`https://database-management-serversie.herokuapp.com/database/update/${Busid}`,{
                  dbcolumn:array
            })
            .then(response=>{
                  $('.del-success').show();
                 setRefresh(Math.floor(Math.random()*(400-5+1)+5));
                  setTimeout(() => {
                        $('.del-success').hide();
                        Navigate(locationPath);
                        var frm = $('.removeForm')[0];
                        frm.reset();
                  }, 2000);
            });
            }
            
      }
  return (
    <div className='crud'>
          <div className="row m-1">
               {
                     data.map(d=>d.creator==Userid?d.dbname==db?d.dbcolumn.map(dbc=>
                        <div className="col-3 my-1" style={{border:'1px solid black'}}>
                              <table className='text-center' style={{width:'100%'}}>
                                    <tr className='text-center' style={{}}>
                                          <th className=''>{dbc.columnName}</th>
                                    </tr>
                                    <hr />
                                    {
                                          dbc.value.map(val=><tr style={{}}><td>{val}</td><hr /></tr>)
                                    }
                              </table>
                        </div>
                        ):'':'')
               }
          </div>
          <div className="my-2" style={{float:''}}>
                <button className='btn btn-primary' style={{width:'100px'}} data-bs-toggle="modal" data-bs-target="#example2">ADD</button>
          </div>
                                                      <div class="modal fade" id="example2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                <div class="modal-content">
                                                      <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalLabel">ADD DATA</h5>
                                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      </div>
                                                      <div class="modal-body">
                                                            <form action="" className='addForm'>
                                                                  {
                                                                    data.map(d=>d.creator==Userid?d.dbname==db?d.dbcolumn.map(dbc=>
                                                                          <>
                                                                          <input className={`form-control ${dbc.columnName}`} placeholder={`${dbc.columnName}`} />
                                                                          <br />
                                                                          </>
                                                                        ):'':'')
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
                                                </div>
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
                                                <div className="del-error text-center" style={{fontSize:12,display:'none',color:'red'}}>No Match Found !</div>
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