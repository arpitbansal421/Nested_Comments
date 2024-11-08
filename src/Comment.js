import React, { useRef, useState } from 'react'

function Comment({comment,addReply}) {
    const [isclicked, setisclicked]=useState(false);
    const [value,setvalue]=useState('');

    const currentref=useRef();
    const handleclick=()=>{
        setisclicked(true);
        setTimeout(()=>{

            currentref.current.focus();
        },0)
    }

    const handleclickcancel=()=>{
        setisclicked(false);

    }
    const handlekeydown=(e)=>{
        if(e.key==='Enter'){
            if(value===''){
                alert('Please Enter your Comment');
                return;
            }else{
                addReply(value,comment.id);
             
                setvalue('');
                handleclickcancel();
            }
            

        }else if(e.key==='Escape'){
            handleclickcancel();
        }

    }

    const handlechange=(e)=>{
        setvalue(e.target.value)

    }
  return (
    <div className='comments'>
        {/* Parent comments */}

        
          
                 <>
                <li key={comment.id}>{comment.display}

                    <button className='btn' onClick={handleclick}>Reply</button>
                    {
                     
                        isclicked && <><br /><input type="text"  placeholder='Enter your Comment...'  value={value} onKeyDown={handlekeydown} ref={currentref}
                        onChange={handlechange}/></>
                    }
                    <button className='btn' onClick={handleclickcancel}>Cancel</button>
                </li>


                {
                    
                    //child rendering
                   comment.children&& comment.children.length>0 && comment.children.map((com)=>{
                         return <div className='children-comment'><Comment comment={com} addReply={addReply} /></div> 

                     })
                }
              
                </>
                
                

            
        
      
    </div>
  )
}

export default Comment
