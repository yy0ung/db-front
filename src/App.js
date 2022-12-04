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




function App() {
  const [showA, setshowA] = useState(false);
  const [showK, setshowK] = useState(false);
  const [showT, setShowT] = useState(false);
  const [aName, setAName] = useState(null);
  //const [newAttr, setNewAttr] = useState(null);

  let content = null  
  let attr = GetAttrDic()
  let key = GetKeyDic()

  function GetScanTable() {
    const [tables, setTables] = useState(null);
    
    useEffect(() => {
      const fetchTables = async () => {
        try {
          
          setTables(null);
          const response = await axios.get(
            '/scan'
          );
          setTables(response.data);
        } catch (e) {
          console.log(e)
        }
       
      };
  
      fetchTables();
    }, []);
  
    if (!tables) return null;
    return (
      <table>
        <tr>
          <th>속성명</th>
          <th>속성타입</th>
          <th>대표속성</th>
          <th>대표결합키</th>
        </tr>
        {tables.map(t =>
          <tr key={t.attr_name}>
            <td>{t.attr_name}</td>
            <td onClick={()=>{
              setshowA(false);
              setshowK(false);
              setShowT(true);
              setAName(t.attr_name)
            }}>{t.attr_type}</td>
            
            <td onClick={()=>{
              setshowA(true);
              setshowK(false);
              setShowT(false);
              setAName(t.attr_name)
            }}>{t.head_attr}</td>

            <td onClick={()=>{
              setshowA(false);
              setshowK(true);
              setShowT(false);
              setAName(t.attr_name)
            }}>{t.head_key}</td>
          </tr>
          )}
        
      </table>
    
    );
  }

  //scan table 대표속성값 업데이트
  async function putAttrToScanTable(props){
    const item = props
    const name = aName
    console.log(aName)
    await axios.put('/put/attr', { attr : item, name : name})
    window.location.replace('/')
  }

  //scan table 대표결합키값 업데이트
  async function putKeyToScanTable(props){
    const item = props
    const name = aName
    console.log(aName)
    await axios.put('/put/key', { key : item, name : name})
    window.location.replace('/')
  }
  
  //attr dic에 사용자가 추가한 대표속성값 추가 + scan table에 해당 값으로 업데이트
  const onSubmitAttrHandler = async (e) =>{
    const item = e.target.text.value
    await axios.post('/post/attr/dic', { id:null, attr: item })
    putAttrToScanTable(item)
    console.log('fin')
  }

  //key dic에 사용자가 추가한 대표속성값 추가 + scan table에 해당 값으로 업데이트
  const onSubmitKeyHandler = async (e) =>{
    const item = e.target.text.value
    await axios.post('/post/key/dic', { id:null, key: item })
    putKeyToScanTable(item)
    console.log('fin')
  }

  //scan table의 attr_type 값 업데이트
  const onSubmitEditTypeHandler = async (e) =>{
    const item = e.target.text.value
    await axios.put('/edit/type', { type : item, name : aName })
    console.log('fin')
  }


  //click 했을 때 attribute dic 보여주기
  if(showA===true){
    if(attr===null){
      content=null
    }else{
      content = <ul>
      {attr.map(d => (
        <li key={d.attr} onClick={() => putAttrToScanTable(d.attr)}>
          {d.attr} 
        </li>
      ))}
      <li>사용자 추가  <form onSubmit={onSubmitAttrHandler}>
        <input name="text"/>
        <input type="submit" value="속성 추가"/>
      </form></li>
      
    </ul>
  }
  }

  //click 했을 때 key dic 보여주기
  if(showK===true){
    if(key===null){
      content=null
    }else{
      content = <ul>
      {key.map(d => (
        <li key={d.key_attr} onClick={() => putKeyToScanTable(d.key_attr)}>
          {d.key_attr} 
        </li>
        
      ))}
      <li>사용자 추가  <form onSubmit={onSubmitKeyHandler}>
        <input name="text"/>
        <input type="submit" value="키 추가"/>
      </form></li>
    </ul>
  }
  }

  // click 했을 때 edit type
  if(showT===true){
    content = <form onSubmit={onSubmitEditTypeHandler}>
    <input name="text"/>
    <input type="submit" value="속성편집"/>
  </form>
  }
  
  return (
    <div className="App">
      db-workspace
      <GetScanTable></GetScanTable>
      <div>
        <p>scan table</p>
      </div>
    
      {content}
      

    </div>
    
  );
}

export default App;
