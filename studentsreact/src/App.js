import {useState, useEffect} from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import logoRegister from './Assets/cadastro.png';  

function App() {

  const baseUrl="https://localhost:44357/api/students";

  const [data, setData]= useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalInclude, setModalInclude] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedStudent, setSelectedStudent]=useState({
    id: '',
    name: '',
    email: '',
    age: ''
  })

  const selectStudent = (student, option) =>{
    setSelectedStudent(student);
    (option === "Edit") ?  
      openCloseModalEdit() : openCloseModalDelete();
  }

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

  const openCloseModalEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const openCloseModalDelete =()=>{
    setModalDelete(!modalDelete);
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
      setUpdateData(true);
      openCloseModalInclude();
    }).catch(error=>{
      console.log(error);
    })
  }

  const requestPut = async () => {
    selectedStudent.age = parseInt(selectedStudent.age);
    await axios.put(baseUrl+"/"+selectedStudent.id, selectedStudent)
    .then(response=>{
      var responseData = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(student=>{
        if(student.id === selectedStudent.id){
          student.name = responseData.name;
          student.email = responseData.email;
          student.age = responseData.age;
        }
      });
      setUpdateData(true);
      openCloseModalEdit();
    }).catch(error=>{
      console.log(error);
    })
  
  }
  const requestDelete = async () => {
    await axios.delete(baseUrl+"/"+selectedStudent.id)
    .then(response=>{
      setData(data.filter(student=>student.id !== response.data));
      setUpdateData(true);
      openCloseModalDelete();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    if(updateData){
      requestGet();
      setUpdateData(false);
    }
  },[updateData])


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
                <button type="button" className="btn btn-primary" onClick={()=>selectStudent(student, "Edit")}>Edit</button> {"  "}
                <button type="button" className="btn btn-danger" onClick={()=>selectStudent(student, "Delete")}>Delete</button>
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

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit Student</ModalHeader>

        <ModalBody>
          <div className="form-group">
            <label>Id: </label>
            <input type="text" className="form-control" readOnly value = {selectedStudent && selectedStudent.id} /> <br/>
            <label>Name: </label> <br/>
            <input type="text" className="form-control" name='name' onChange={handleChange} value = {selectedStudent && selectedStudent.name} /> <br/>
            <label>Email: </label> <br/>
            <input type="text" className="form-control" name='email' onChange={handleChange} value = {selectedStudent && selectedStudent.email}/> <br/>
            <label>Age: </label> <br/>
            <input type="text" className="form-control" name='age' onChange={handleChange} value = {selectedStudent && selectedStudent.age}/> <br/>
          </div>
        </ModalBody>

        <ModalFooter>
          <button type="button" className="btn btn-primary" onClick={()=>requestPut()}>Edit</button>
          <button type="button" className="btn btn-danger"  onClick={()=>openCloseModalEdit()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Are you sure you want to delete the student {selectedStudent && selectedStudent.name} ?
        </ModalBody>

        <ModalFooter>
          <button type="button" className="btn btn-danger" onClick={()=>requestDelete()}>Yes</button>
          <button type="button" className="btn btn-secondary" onClick={()=>openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
