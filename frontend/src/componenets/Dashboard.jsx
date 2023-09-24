import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [over,setOver] = useState(false)
  const [put,setPut] = useState(false)
  const [lits,setLits] = useState([])
  const [namee,setName] = useState('')
  const [namee2,setName2] = useState('')
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('all');
  const [getMark,setMark] = useState()
  const [globalId,setGlobalId] = useState()
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/')
}
    const ls = localStorage.getItem('token'); //returns token
    const obj = JSON.parse(ls)
    const name = obj.name;
    const token = obj.token;

      const callResponse =async()=>{
      try {
        const response = await axios.get('/api/task/', {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        setLits(filterList(response.data))
        } catch (error) {
          console.log(error)
        }
    }

    function filterList(list){
      if(selectedOption2 === 'all'){return list}
      else if(selectedOption2 === 'pend'){
        return list.filter((task)=>!task.mark)
      }
      else{
        return list.filter((task)=>task.mark)
      }
    }

    const fortask = async(e)=>{
      e.preventDefault()
      try {
        const final = getPrior(selectedOption)
        let  object={
          title:namee,
          description:namee2,
          mark:"false",
          priority:final
        }
        const response = await axios.post('/api/task/',object,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        callResponse()
        revert()
      } catch (error) {
        console.log(error)
        revert()
      }
    }

    function revert(){
      setOver(false)
      setName('')
      setName2('')
      setSelectedOption("")
      setPut(false)
      setGlobalId()
      setMark()
    }

    function getPrior(selectedOption){
      let final
      if(selectedOption === "High" ){final=3}
        else if(selectedOption === "Normal" ){final=2}
        else if(selectedOption === "Low" ){final=1}
        else{final=2}
        return final
    }

    function getPriorRev(selectedOption){
      let final
      if(selectedOption === 3 ){final="High"}
        else if(selectedOption === 2 ){final="Normal"}
        else if(selectedOption ===1){final= "Low" }
        else{final= "Normal" }
        return final
    }

    const handleDel = async(id)=>{
      try {
        const response = await axios.delete(`/api/task/${id}`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        callResponse()
      } catch (error) {
        console.log(error)
      }
    }

    const handleUpd = (id,title,description,priority,mark)=>{
      setGlobalId(id)
      setMark(mark)
      setPut(true)
      setOver(true)
      setName(title)
      setName2(description)
      setSelectedOption(getPriorRev(priority))
    }

    const forupdatetask = async(e)=>{
      e.preventDefault()
      try {
        const final = getPrior(selectedOption)
        let  object={
          title:namee,
          description:namee2,
          mark:"false",
          priority:final
        }
        const response = await axios.put(`/api/task/${globalId}`,object,{
          headers:{
            'Authorization': `Bearer ${token}`
          }})
          callResponse()
        revert()
      } catch (error) {
        console.log(error)
        revert()
      }
    }

    const markdone = async(id)=>{
      try {
        const response = await axios.put(`/api/task/mark/${id}`,null,{
          headers:{
            'Authorization': `Bearer ${token}`

      }})
      callResponse()
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      callResponse()
    },[])

    useEffect(()=>{
      callResponse()
    },[selectedOption2])

  return (
    <>
    {over ? <div className="over">
      <form className="addtask" onSubmit={!put ? fortask : forupdatetask}>
      <div className="closebtn" onClick={()=>{setOver(false);revert()}}>x</div>
        <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select Priority Level</option>
        <option value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
        <input type="text" placeholder='Enter Title' className='inp' value={namee} onChange={(e) => setName(e.target.value)}/>
        <textarea type="text" placeholder='Enter Description' className='inp2' value={namee2} onChange={(e) => setName2(e.target.value)}/>
      <button type='submit' className='btn2' >{!put ? "Add Task" : "Update Task"}</button>
      </form>
    </div> : ''}
      <div className="containerr">
        <div className="nav2">
        <h2>Welcome {name}</h2>
      <button onClick={logout}>Logout</button>
      </div>
      <div className="dash">
        <div className="dash-header">
          <p>Total Tasks: {lits.length}</p>
          <div>
            <select value={selectedOption2} onChange={handleOptionChange2}>
        <option value="all">All</option>
        <option value="pend">Pending</option>
        <option value="norm">Completed</option>
        </select>
          </div>
          <div className="add" onClick={()=>setOver(true)}>+</div>
        </div>
        <div className="tasks-holder">
          {lits.length !== 0 ? lits.map((task)=>(
            <div className='tasks-holder-main' key={task._id}>
              <div className="tasks-holder-1">
                <h2 className='h2'>{task.title}</h2>
                <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
                <p className='p-mark'>{task.mark ? "Completed" : "Pending"}</p>
                <p className='p-mark' style={{color:"green"}}>{task.priority === 3 ? "High Priority" : (task.priority === 2 ? "Normal Priority" : "Low Priority")}</p>
                </div>
                <p className='desc'>{task.description}</p>
              </div>
              <div className="tasks-holder-2">
                <button className="del" onClick={()=>handleDel(task._id)}>Delete</button>
                <button className="upd" onClick={()=>handleUpd(task._id,task.title,task.description,task.priority,task.mark)}>Update</button>
                <button className='mark' onClick={()=>markdone(task._id)}>Mark as {!task.mark ? "Done" : "Pending"}</button>
              </div>
            </div>
          )) : <div className='centre'>No taks right now...</div>}
        </div>
      </div>
      </div>
    </>

  )
}

export default Dashboard