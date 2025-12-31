import DeleteIcon from "@mui/icons-material/Delete";

function Notes(props){
    return <div className="note">
        <h4>{props.name}</h4>
        <p>{props.body}</p>
        <button onClick={
            ()=>{
                props.deleteNode(props.id)
            }
        }><DeleteIcon/></button>
    </div>
}

export default Notes;