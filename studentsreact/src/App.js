import {useState, useEffect} from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import logoRegister from './Assets/cadastro.png';  

function App() {

  const baseUrl="https://localhost:44357/api/students";

  const [data, setData]= useState([]);

  const requestGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    requestGet();
  })


  return (
    <div className="App">
      <br />
      <h3>Students Register</h3>

      <header className="App-header">
        <img src={logoRegister} alt="logo" />
        <button type="button" className="btn btn-succes">Add Student</button>
      </header>

      <table className="table table-bordered">
        <thead> 
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student=>(
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button type="button" className="btn btn-primary">Edit</button> {"  "}
                <button type="button" className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
