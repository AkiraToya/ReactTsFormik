import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Formik, FormikErrors, FormikProps } from 'formik';

interface FormModel{
  name: string,
  username: string,
  email: string,
  dob: Date | undefined,
  password: string
}

function App() {
  return (
    <div className="App">
      <Formik<FormModel> 
      initialValues={{
        name: "",
        username: "",
        email: "",
        dob: undefined,
        password: ""
      }}

      validate={(values) => {
        var hasError: boolean = false

        var errors: FormikErrors<FormModel> = {
          name: undefined,
          username: undefined,
          email: undefined,
          password: undefined
        }

        if (values.name == ""){ errors.name = "Name is required"; hasError = true }
        if (values.username == "") { errors.username = "Username is required"; hasError = true }
        if (values.email == "") { errors.email = "Email is required"; hasError = true }
        if (values.password == "") { errors.password = "Password is required"; hasError = true }

        return (hasError) ? errors : undefined
      }}

      onSubmit={(values) => {
        alert(JSON.stringify(values))
      }}

      component={RegistrationForm}
      />
      
    </div>
  );
}

let RegistrationForm: (props: FormikProps<FormModel>) => JSX.Element = 
({ handleSubmit, values, errors, handleChange, setFieldValue, touched }) => {
    let dateOnChange = (date: Date | null) => {
      setFieldValue("dob", date)
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Type your name here"
          value={values.name} onChange={handleChange}
        />
        { touched.name && errors.name && <div className="error">{errors.name}</div> }

        <label>Username</label>
        <input type="text" name="username" placeholder="Type your username here"
          value={values.username} onChange={handleChange}
        />
        { touched.username && errors.username && <div className="error">{errors.username}</div>}

        <label>Email</label>
        <input type="email" name="email" placeholder="I need your email"
          value={values.email} onChange={handleChange}
        />
        { touched.email && errors.email && <div className="error">{errors.email}</div>}

        <label>Date of Birth</label>
        <DatePicker name="dob" placeholderText="This is where you set your Date of Birth"
          value={values.dob?.toLocaleDateString()}
          selected={values.dob}
          onChange={dateOnChange} />

        <label>Password</label>
        <input type="password" name="password" placeholder="Give me your password!"
          value={values.password} onChange={handleChange}
        />
        { touched.password && errors.password && <div className="error">{errors.password}</div>}

        <button type="submit">Give me your info and like this video please :)</button>

      </form>
    )
}

export default App;
