import axios from 'axios';
import $ from 'jquery';

const Model=({field=[],db,setRefresh})=>{
    const insertQuery=async(q)=>{
        await axios.post('https://database-manager-backend-nodejs.vercel.app/table/add/row',{
            query:q
        })
        .then((resp)=>{
              console.log("INSERT QUERY RESPONSE=--->",resp.data)
              if(resp.data.error==false)
                {
                    $('.success').show()
                    setTimeout(() => {
                        $('.success').hide()
                        setRefresh(Math.floor(Math.random()*(400-5+1)+5));
                        var frm = $('.addForm')[0];
                        frm.reset(); 
                    }, 1000);
                }
                else
                {
                    $('.failed').show();
                    setTimeout(() => {
                        $('.failed').hide();
                    }, 3000);
                }
        })
    }
    const add=async(e)=>{
        e.preventDefault()
        console.log("clicked insertion btn")
        let q=`INSERT INTO ${db}(`
        let vals=`VALUES(`
        field.map((s,i)=>{
          if(i!=0)
          {
              if(i!=field.length-1)
              {
                  q+=s.name+','
                  let classname=$(`.${s.name}`).val()
                  vals+="'"+classname+"'"+','
                }  
                else
                {
                    q+=s.name+')'
                    let classname=$(`.${s.name}`).val()
                    vals+="'"+classname+"'"+')'
    
              }
          }  
        })
        console.log("query--?",q+vals)
        insertQuery(q+vals);
        
        return;
    }
    console.log("fields----?",field)
    return (
    <div class="modal fade" id="example2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">INSERT A NEW ROW</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                    <form action="" className='addForm' onSubmit={add}>
                          {
                               field.map((s,index)=>index!=0&&
                                    <>
                                      <input className={`form-control ${s.name}`} placeholder={`${s.name}`} required /><br/>
                                    </>
                               )
                          }
                    <div className="text-center success m-3" style={{color:'green',fontSize:12,display:'none'}}>Successfully Added!</div>
                    <div className="text-center failed m-3" style={{color:'red',fontSize:12,display:'none'}}>Failed to insert new row!</div>
                    <div style={{textAlign:'center'}}>
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success mx-2">INSERT</button>
                    </div>
                    </form>
              </div>
              {/* <div class="modal-footer"> */}
              {/* </div> */}
        </div>
        </div>
</div>
    )
}
export default Model;