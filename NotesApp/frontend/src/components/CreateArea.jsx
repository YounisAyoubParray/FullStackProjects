import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
function CreateArea(props) {
  const [foc,setfoc]=useState(false);
  const [data,setdata]=useState({title:"",content:""});

  function letsgo(){
     setfoc(true);
  }

  function newdata(e){
    const {name,value}=e.target;
     setdata(prev=>{
      return{...prev,[name]:value};
    })



  }

  return (
    <div>
      <form className="create-note "
      onSubmit={(e)=>{ 
          e.preventDefault();
          props.additem(data.title,data.content);
          setdata({title:"",content:""});
        }}
      >
        {foc &&<input name="title" value={data.title} placeholder="Title" onChange={newdata} required/>}
        
        <textarea name="content" value={data.content} placeholder="Take a note..." rows={foc?"3":"1"} onChange={newdata} onFocus={letsgo} required/>
        <Zoom in={foc}><Fab type="Submit"><AddIcon/></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
