import {useState, useEffect} from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import logoRegister from './Assets/cadastro.png';  

function App() {

  const baseUrl="https://localhost:44357/api/students";

  const [data, setData]= useState([]);
  const [modalInclude, setModalInclude] = useState(false);

  const [selectedStudent, setSelectedStudent]=useState({
    id: '',
    name: '',
    email: '',
    age: ''
  })

  const handleChange =e =>{
    const {name, value}=e.target;

    setSelectedStudent({
      ...selectedStudent,
      [name]: value
    });

    console.log(selectedStudent);
  }
  
  const openCloseModalInclude=()=>{
    setModalInclude(!modalInclude);
  }

  const requestGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const requestPost = async () => {
    delete selectedStudent.id;

    selectedStudent.age = parseInt(selectedStudent.age);
      await axios.post(baseUrl, selectedStudent)
    .then(response=>{
      setData(data.concat(response.data));
      openCloseModalInclude();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    requestGet();
  })


  return (
    <div className="students-container">
      <br />
      <h3>Students Register</h3>

      <header>
        <img src={logoRegister} alt="logo" />
        <button type="button" className="btn btn-succes" onClick={()=>openCloseModalInclude()}>Add Student</button>
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

      <Modal isOpen={modalInclude}>
        <ModalHeader>Add Student</ModalHeader>

        <ModalBody>
          <div className="form-group">
            <label>Name: </label>
            <br/>
            <input type="text" className="form-control" name='name' onChange={handleChange} />
            <br/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name='email' onChange={handleChange} />
            <br/>
            <label>Age: </label>
            <br/>
            <input type="text" className="form-control" name='age' onChange={handleChange} />
            <br/>
          </div>
        </ModalBody>

        <ModalFooter>
          <button type="button" className="btn btn-primary" onClick={()=>requestPost()}>Add</button>
          <button type="button" className="btn btn-danger"  onClick={()=>openCloseModalInclude()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
