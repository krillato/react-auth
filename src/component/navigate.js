import React from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Jumbotron,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

export const Nevigate = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            บันทึกรายรับ-รายจ่าย
          </a>
          
            <Navbar
              className="justify-content-between navbar-dark bg-dark"
              id="navBackground"
              expand=""
            >
              <div style={{ display: "flex" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas
                  id="basic-navbar-nav"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                >
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-2 pe-4">
                      <Nav.Link
                        className="badge bg-primary text-wrap"
                        Style="width: 8rem;"
                        href="https://www.youtube.com"
                        target="_blank"
                      >
                        Register
                      </Nav.Link>
                      <br />
                      <Nav.Link
                        className=""
                        Style="Color:black"
                        href="https://www.youtube.com"
                        target="_blank"
                      >
                        หน้าแรก
                      </Nav.Link>
                      <Nav.Link
                        Style="Color:black"
                        href="https://www.youtube.com"
                        target="_blank"
                      >
                        รายการของคุณ
                      </Nav.Link>
                      <NavDropdown
                        Style="Color:black"
                        title="การทำงาน"
                        id="offcanvasNavbarDropdown"
                      >
                        <NavDropdown.Item href="#action3">
                          เพิ่มรายการ
                        </NavDropdown.Item>
                        
                      </NavDropdown>
                    </Nav>
                    <br />
                    <Form className="d-flex">
                      <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </Navbar>
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  หน้าแรก
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  รายการของคุณ
                </a>
              </li>
              <li class="nav-item dropdown">
               
                  <NavDropdown
                        Style="Color:black"
                        title="การทำงาน"
                        id="offcanvasNavbarDropdown"
                      >
                        <NavDropdown.Item href="#action3">
                          เพิ่มรายการ
                        </NavDropdown.Item>
                        
                      </NavDropdown>
                    
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
