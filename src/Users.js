import {
    Card,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Spinner,
    Table,
    Offcanvas,
    Container,
    Navbar
  } from "react-bootstrap";
  import { FaEdit,FaTrashAlt } from "react-icons/fa";
  import { useState, useEffect } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import { db } from "./firebase-config";
  import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import ConfirmDialog from "./ConfirmDialog";
  
  
  const Users = () => {
    const usersCollectionRef = collection(db, "users");
    const [user, setUser] = useState({});
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
  
  
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            console.log(data);
            setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
      
          getUsers();
    }, [toggle]);

    const handleDialogNo=()=>{
        setShowDialog(false);
    };

    const handleDialogYes =()=>{
        deleteUser(user.id);
        setShowDialog(false);
    }
  
    const handleClose = () => {
      setShowCanvas(false);
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setUser({ ...user, [name]: value });
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        setToggle(!toggle);
      };
  
    const saveUser = async (e) => {
      e.preventDefault();
  
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }
      setLoading(true);
      if(!user.id){
        const response = await addDoc(usersCollectionRef, user); 
        setLoading(false);
        setValidated(false);
       setToggle(!toggle);
      }else{
        const userDoc = doc(db, "users", user.id);
        await updateDoc(userDoc, user);
        setLoading(false);
        setValidated(false);
       setToggle(!toggle);
      }
    };
  
    return (
      <div>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">FIREBASE-CRUD</Navbar.Brand>
    
    </Container>
  </Navbar>
    <Container>
       
        <div align="right" className="mt-3">
        <Button variant="primary" onClick={()=>{setShowCanvas(true);setUser({});}} className="d-flex justify-content-end">Add New</Button>
        </div>

        <Row className="mt-2">
          <Col>
          
            <Card>
              <Table responsive striped borderless>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((item, index) => (
                    <tr
                      onClick={() => {
                        setUser(item);
                      }}
                      key={index}
                      className={item.id === user.id ? "table-active" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>
                <Button variant="primary" className='me-2' onClick={()=>setShowCanvas(true)} >
                    <FaEdit/>  
                </Button>
                <Button variant="danger" onClick={()=>setShowDialog(true)} >
                    <FaTrashAlt/>
                </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Offcanvas
          show={showCanvas}
          onHide={handleClose}
          placement="end"
          style={{ width: "40%" }}
          scroll="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={saveUser}
              method="POST"
            >
              <Row className="mb-3">
                <FormGroup as={Col}>
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={user.firstName}
                    required
                  ></FormControl>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={user.lastName}
                    required
                  ></FormControl>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel>User Name</FormLabel>
                  <FormControl
                    name="userName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={user.userName}
                    required
                  ></FormControl>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col}>
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    name="email"
                    onChange={(e) => handleChange(e)}
                    type="email"
                    value={user.email}
                    required
                  ></FormControl>
                </FormGroup>
                
              </Row>
              
              {loading ? (
                <Button variant="primary" disabled className="float-end mt-2">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="float-end mt-2"
                >
                  {user.id ? "Update" : "Register"}
                </Button>
              )}
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
    </Container>
        <ToastContainer autoClose={2000} />
        <ConfirmDialog
        showDialog={showDialog}
        handleDialogYes={handleDialogYes}
        handleDialogNo={handleDialogNo}
        />
      </div>
    );
  };
  
  export default Users;