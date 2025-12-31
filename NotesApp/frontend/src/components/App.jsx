import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import axios from 'axios';
import CreateArea from "./CreateArea";
import { useState } from "react";
import { useEffect } from "react";




function  App(){
   
     const [state,setstate]=useState([]);
    useEffect( ()=>{
        async function fetchdata(){
        try {
      const response = await axios.get('/api/home');
      setstate(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };
    fetchdata();
},[]);
   
    function newitem(tit,cont){
        var id;
        setstate(prev=>{
            id=prev.length+1
            return [...prev,{nid: id,
                title:tit,content:cont}];
        })

    addtodb(id,tit,cont);

    }

    async function addtodb(id,tit,cont){
    try {
      const response = await axios.post('/api/home', {
        nid:id,
        title: tit,         
        content: cont      
      });
      console.log(response)
    } catch (error) {
      console.error('Error sending data:', error);
    
  };
    }



    function deletetimes(id){
        deletetodb(id);
        setstate( prev=>{
            return prev.filter((item)=> item.nid!==id)
        })
      }   
    async function deletetodb(id){
    try {
      const response = await axios.post('/api/homee', {
        nid:id     
      });
      console.log(response);
    } catch (error) {
      console.error('Error sending data:', error);
    
    };
    }

    return <div>
        <Header/>
     
      <CreateArea additem={newitem}/>

        {console.log(state)}
       {state.map((item)=>{
            return <Notes key ={item.nid} id ={item.nid} name={item.title} body={item.content} deleteNode={deletetimes}/>
        })}
  
       
        


        <Footer/>
    </div>
}


export default App;