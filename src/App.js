import axios from 'axios';
import React,{useEffect,useState} from 'react';
import './App.css';
import {ACCESS_KEY} from "./config/Constants"

function App() {
  const[imageList,setImageList]=useState([])
  const[tempImageList,setTempImageList]=useState([])
  const[isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    axios
    .get(
      `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=30`
    )
    .then((response)=>{
      setImageList(response.data)
      setTempImageList(response.data)
      setIsLoading(false);
    })
  },[]);
  const searchImage=(query)=>{
    if (query==""){
      setImageList(tempImageList)
    }
    else{

    
    const filteredImageList=imageList.filter(image=>{
      image.alt_description= image.alt_description===null?"react":image.alt_description;
     return image.alt_description.includes(query);
    })
    setImageList(filteredImageList);
    
  }

  }
  return (
   <>
   <center>
   <input type="text"
    style={{height:"40px" ,placeholder:"search images",width:"50%"}}
    onChange={(e)=>searchImage(e.target.value)}
    />
    </center>
   {/* image container */}
    
   <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
    {imageList.length>0?imageList.map((image)=>{
      return (
        <div key={image.id}
        style={{padding:"20px",textAlign:"center"}}>
       <img
        src= {image.urls.regular}
        style={{height:"250px", width:"250px", objectFit:"cover"}}
         alt={image.alt_description}
         
         />
         <br/>
         {image.alt_description ? image.alt_description.substring(0,20):"react"}
         </div>
      )
    }):
    isLoading?"loading..":"No Images Found!!"}
   </div>
   hello world!!!
   </>
  );
}

export default App;
