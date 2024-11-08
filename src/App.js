
import { useState } from 'react';
import './App.css';
import Comment from './Comment';
function App() {
  const commentobj=[
    //first comment
    {
      id:1,
      display:'Hello',
      children:[
        
      ]
      
    }
    //Second Comment
    ,{
      id:3,
      display:'Awesome',
      children:[]
    },
    
    // Third Comment
    {
      id:4,
      display:'Cool',
      children:[]
    }
  ]
  
  const [value,setvalue]=useState('');

  const [comment,setcomment]=useState(commentobj)
  const addcomment=(text)=>{
    
    

    const obj={
      id:Date.now(),
      display:text,
      children:[],
    }
    
    setcomment((prev)=>[...prev,obj]);
    setvalue('');
    
    console.log(comment);
    

  }

  
  const handleclick=()=>{
    if(value===''){
      alert('Please enter your comment')
      return;
    }

    addcomment(value);




  }

  const addReply = (text, parentId) => {
    const updateComments = (comment) => {
      return comment.map((com) => {
        if (com.id === parentId) {
          const newId = Date.now(); // Unique ID for the reply
          return {
            ...com,
            children: [{ id: newId, display: text, children: [] }, ...com.children],
          };
        } else if (com.children.length > 0) {
          return {
            ...com,
            children: updateComments(com.children), // Recursively update child comments
          };
        }
        return com;
      });
    };

    setcomment(updateComments(comment));
  };

  return (
    <div className="App">
      <h1>Nested Comments</h1>
      <input type="text"className='input-box' placeholder='Enter your Comments...' value={value}  onChange={(e)=>setvalue(e.target.value)}/>
  
      <button className='comment-btn' onClick={handleclick}>Comment</button>

      <div className="comments">
        {
          comment.map((com)=>(
            <>
            {console.log(com)}
            <div com={com.id}><Comment comment={com} addReply={addReply}></Comment> </div>
            </>

            
          ))
        }
       

      </div>
     
    </div>
  );
}

export default App;
