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
  const [login, setLogin] = useState(false);
  //const [newAttr, setNewAttr] = useState(null);

  let content = null  
  let attr = GetAttrDic()
  let key = GetKeyDic()
  let loginOut = null

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

    async function deleteAttrToScanTable(props){
      const item = props
      await axios.delete('/delete/attr', {data: {name : item}})
      window.location.replace('/')
    }
  
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
            <td onClick={()=>
              deleteAttrToScanTable(t.attr_name)
            }>{t.attr_name}</td>
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

  //db connect
  const onSubmitLoginHandler = async(e) =>{
    e.preventDefault();
    const host = e.target.host.value
    const port = e.target.port.value
    const db = e.target.db.value
    const user = e.target.user.value
    const pw = e.target.pw.value
    const response = await axios.post('/db/connect', 
    { host : host, port : port, db : db, user : user, pw : pw })
    if(response.data){
      setLogin(true)
    }else{
      setLogin(false)
    }

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

  //db 연결 상태 확인 login
  if(login){
    loginOut = <h4>디비 연결된 상태</h4>
  }else{
    loginOut = <h4>디비 연결 안 된 상태</h4>
  }
  
  return (
    <div className="App">
      db-workspace
      {loginOut}
      <form onSubmit={onSubmitLoginHandler}>
        HOST <input name = "host"/>
        PORT <input name="port"/>
        DB <input name="db"/>
        USER <input name="user"/>
        PW <input name="pw"/>
        <input type="submit" value="Connect"/>
      </form>
      <GetScanTable></GetScanTable>
      <div>
        <p>scan table</p>
      </div>
    
      {content}
      

    </div>
    
  );
}

export default App;
