import React from 'react'
import { Formik, Field, Form } from 'formik';
import "./../../assets/css/style.css";
import {getRegistrationDetails} from "./authHandler/authHandler";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
function Registration() {
    const navigate = useNavigate();

    return (
        <div className='container '>
            <div className="row container-login d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-5 mb-3">
                        <h3 className='text-center'>Registration</h3>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            cpassword:'',
                            role:'option1'
                        }}
                        onSubmit={async (values) => {
                            if(values.password!=values.cpassword){
                                swal("password and conform password must be same",{
                                    icon:"info",
                                    buttons:{},
                                    timer:3000
                                })
                            }else{
                               await getRegistrationDetails(values.name,values.email,values.password,values.role)
                               .then(response => {
                                
                                  swal("user added succeffully", {
                                    icon: "success",
                                    buttons: false,
                                    timer: 3000,
                                  }).then(navigate('/login'));
                                
                               
                              })
                              .catch(error => {
                                swal({
                                  title: "Error",
                                  text: error.response.data.error,
                                  icon: "error",
                                  buttons: false,
                                  dangerMode: true,
                                  timer: 3000,
                                });
                               
                              });
                             
                            }
                        }}
                    >
                        <Form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="name">Name</label>
                                    <Field type="text" id="name" name="name" className="form-control" placeholder="Enter Your Name" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" id="email" name="email" className="form-control" placeholder="Enter Your mail" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="password">password</label>
                                    <Field type="password" id="password" name="password" className="form-control" placeholder="Password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <label htmlFor="cpassword">Conform Password</label>
                                    <Field type="password" id="cpassword" name="cpassword" className="form-control" placeholder="Conform Password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                                    <label htmlFor="cpassword">Role</label>
                                    <Field name="role" component="select" className="form-control">
                                        <option value="option1" disabled>Please Select Your Role</option>
                                        <option value="professional">Professional</option>
                                        <option value="user">User</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="row mt-3 text-center">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <button type="submit" className='btn btn-primary btn-block'>Registration</button>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Registration