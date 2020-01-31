import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cards from "./Cards";
import styled from "styled-components";

const FormContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin: 2% 5%;
`

const PersonForm = ({values, errors, touched, status}) => {
    const [person, setPerson] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setPerson( animals =>
            [...person, status])
    }, [status]);
    return (
        <div className="person-form">
            <Form>
                <FormContainer>
                <label htmlFor="name">
                    Name: 
                    <Field
                    id="name"
                    type="text"
                    name="name"
                    />
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>
                </FormContainer>
                <FormContainer>
                <label htmlFor="email">Email: 
                <Field id ="email" type="email" name="email" />
                {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>
                </FormContainer>
                <FormContainer>
                <label htmlFor="password">Password: 
                <Field id ="password" type="password" name="password" />
                {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>
                </FormContainer>
                <FormContainer>
                <label className="checkbox-container" htmlFor="service">
                    Agree to Terms of Service?
                    <Field
                    id="service"
                    type="checkbox"
                    name="service"
                    check={values.service}
                    />
                    <span className="checkmark" />
                </label>
                </FormContainer>
                <button>Submit</button>
            </Form>
            <Cards person={person} />
        </div>
    )

}

const FormikPersonForm = withFormik({
    mapPropsToValues({ name, email, password, service}) {
        return {
            name: name || "",
            email: "",
            password: "",
            service: false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Name must be longer than 3 characters').max(20, 'Name must be shorter than 20 characters').required('Name is required'),
        email: Yup.string().email('Invalid email style').required('Email is required'),
        password: Yup.string().min(6, 'Password must consist of 6 or more characters').max(15, 'Password must be shorter than 16 characters').required('Password is required'),
        service: Yup.boolean().oneOf([true], "Must Agree to Terms of Service")
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting", values);
        axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
            console.log("success", response);
            setStatus(response.data);
            resetForm();
        })
        .catch(error => console.log(error.response));
    }
})(PersonForm);

export default FormikPersonForm;