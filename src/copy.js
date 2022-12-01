import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header(props){
  return <header>
    <p>{ props.name }</p>
  </header>
}

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setUsers(null);
        setLoading(true);
        const response = await axios.get(
          '/attr/dic'
        );
        setUsers(response.data);
        console.log(response.data) 
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.attr} 
        </li>
      ))}
    </ul>
  );
}


function App() {

  
  return (
    <div className="App">
      db-workspace
      <Header 
      name="데이터 읽어오기"></Header>
      <Header name="데이터 보내기"></Header>
      <Users></Users>
    </div>
  );
}

export default App;