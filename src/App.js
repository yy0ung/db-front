import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GetAttrDic() {
  const [attr, setAttr] = useState(null);
  useEffect(() => {
    const attr = async() =>{
      const response = await axios.get(
        '/attr/dic'
      );
      setAttr(response.data)
    }
    
    attr()
    
  }, []);
  
  return attr
}

function GetKeyDic(){
  const [key, setKey] = useState(null);
  useEffect(()=>{
    const key = async() =>{
      const response = await axios.get(
        '/key/dic'
      );
      setKey(response.data)
      
    }
    key()
  }, []);
  return key
}

function UserAddAttr(){
  
  return "aa"
}


function App() {
  const [showA, setshowA] = useState(false);
  const [showK, setshowK] = useState(false);
  //const [newAttr, setNewAttr] = useState(null);

  let content = null  
  let attr = GetAttrDic()
  let key = GetKeyDic()

  const onSubmitHandler = async (e) =>{
    const item = e.target.text.value
    await axios.post('/post/attr/dic', { id:null, attr: item })
    console.log('fin')

  }
  

  //click 했을 때 attribute dic 보여주기
  if(showA==true){
    if(attr===null){
      content=null
    }else{
      content = <ul>
      {attr.map(d => (
        <li key={d.attr} onClick={() => console.log(d.attr)}>
          {d.attr} 
        </li>
      ))}
      <li onClick={() => console.log(UserAddAttr())}>사용자 추가</li>
      <li><form onSubmit={onSubmitHandler}>
        <input name="text"/>
        <input type="submit" value="추가"/>
      </form></li>
    </ul>
  }
  }

  //click 했을 때 key dic 보여주기
  if(showK==true){
    if(key===null){
      content=null
    }else{
      content = <ul>
      {key.map(d => (
        <li key={d.key} onClick={() => console.log(d.key_attr)}>
          {d.key_attr} 
        </li>
        
      ))}
      <li>사용자 추가</li>
    </ul>
  }
  }
  
  return (
    <div className="App">
      db-workspace
      <p onClick={()=>{
        setshowA(true);
        setshowK(false);
      }}>속성사전 읽어오기</p>
      <p onClick={()=>{
        setshowK(true);
        setshowA(false);
      }}>결합키사전 읽어오기</p>
      {content}
    </div>
  );
}

export default App;
