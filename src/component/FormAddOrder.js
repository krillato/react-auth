import React,{ useState,useEffect,useContext } from "react";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  Form,

  Container,
  Row
} from "react-bootstrap";






const FormAddOrder = () => {

    const { currentUser } = useContext(AuthContext);
    const EmailUser = currentUser.email;
    //console.log("ผู้ใช้ที่ใช้งานอยู่ : ", EmailUser);

    const [amount, setAmount] = useState(0);
    const [nameorder, setNameOrder] = useState("");

    const [employeeList, setEmployeeList] = useState([]);

    const addOrderAndAmount =(e)=>{
        e.preventDefault();

        axios.post('http://localhost:3001/AddOrder',{
            email:EmailUser, amount:amount, nameorder:nameorder
        })
        .then(() => {
            setEmployeeList([
                ...employeeList,
                {
                    email:EmailUser, 
                    amount:amount, 
                    nameorder:nameorder
                }
            ])
            
        })
        console.log("ค่าที่จะถูกส่ง : (mail)=>" ,EmailUser, "  (ชื่อรายการ)=>",nameorder, "(เงิน)=>",amount)
    }

    

  return (
    <div>
      <Container>
        <Form bg="dark" variant="dark" className="my-4" >
          <Container className="">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                {" "}
                <h2>ชื่อรายการจ้า</h2>
              </Form.Label>
              <Form.Control
                type="text"
                name="nameOrder"
                placeholder="ระบุรายการสิ"
                onChange={(event)=>{
                    setNameOrder(event.target.value);
                    //console.log(nameorder);
                }}
              />
              <Form.Text className="text-muted">*กรุณาใส่ชื่อรายการ</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <h2>จำนวนเงิน</h2>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="ระบุจำนวนเงิน"
                name="amount"
                onChange={(event)=>{
                    setAmount(event.target.value);
                    //console.log(amount);
                }}
                
              />
              <Form.Text className="text-muted">
                * รายการเครื่องหมาย ( - คือรายจ่าย, ไม่ใส่คือรายรับ)
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              className="btn "
              type="submit"
              onClick={addOrderAndAmount}
            >
              
              เพิ่มข้อมูล
            </Button>
          </Container>
        </Form>

        <Row>
          <Card className="text-center bg-success text-white my-4 py-3 ">
            <Card.Body>
              <h2>แสดงรายรับรายจ่ายทั้งหมด ทุกรายการ</h2>
            </Card.Body>
            <div className="Container mt-5">
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.email}</p>

                <br></br>
                
                
              </div>
            </div>
          );
        })}
      </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default FormAddOrder;
