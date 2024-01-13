import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const url = 'http://localhost:9001/createuser'

const Register = () => { 

    const initialValues = {
        name : "",
        email : "",
        address : "",
        state : "",
        country : "",
        dateofbirth : "",
        phonenumber : "",
        password : "",
      }
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setIsSubmit] = useState(false);
     const [alertMessage, setAlertMessage] = useState('');

     useEffect(() => {
      if (alertMessage) {
        const timeoutId = setTimeout(() => {
          setAlertMessage('');
        }, 5000); 
  
        return () => clearTimeout(timeoutId);
      }
    }, [alertMessage]);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
        console.log(formValues)
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        try {
            const response = await axios.post(url, {
              fullName: formValues.name,
              address: formValues.address,
              state: formValues.state,
              country: formValues.country,
              dateOfBirth: formValues.dateofbirth,
              password: formValues.password,
              email: formValues.email,
              phoneNumber: formValues.phonenumber,
            });
      
            setAlertMessage(response.data.message);
          } catch (error) {
            if(error.response){

              setAlertMessage(`${error.response.data.error}`);
            }
          }
        
      };
 

    const validate = (values)=>{
        const errors = {};
        const corremail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const correaddress = /^[a-zA-Z0-9\s,'-]*$/
        
        if ( !values.name ) {
          errors.name = "Name is required!"
        }
        if ( !values.email ) {
          errors.email = "email is required!"
        } else if (!corremail.test(values.email)) {
          errors.email = "This is not a valid email format!"
        }
        if ( !values.address ) {
          errors.address = "address is required!"
        }else if (!correaddress.test(values.address)) {
            errors.address = "invalid address format"
        }
        if ( !values.state ) {
          errors.state = "state is required!"
        }
        if ( !values.country ) {
          errors.country = "country is required!"
        }
        if ( !values.dateofbirth ) {
          errors.dateofbirth = "date of birth is required!"
        }
        if ( !values.phonenumber ) {
          errors.phonenumber = "phone number is required!"
        }
        if ( !values.password ) {
          errors.password = "password is required!"
        } else if ( values.password.length < 8) {
            errors.password = "password should not be less than 8 characters!"
          } 
    
        return errors;
      }
    

  return (
    <>
        <div className='Register'>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className='divider'></div>

                <div className='theform'>
                    <div className="field">
                        <label>Name</label>
                        <input 
                        type='text' 
                        name='name' 
                        placeholder='Name'
                        value={ formValues.name }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.name}</p>
                    </div>
                    
                    <div className="field">
                        <label>Email</label>
                        <input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        value={ formValues.email }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.email}</p>

                    </div>
                    
                    <div className="field">
                        <label>Address</label>
                        <input 
                        type='address' 
                        name='address' 
                        placeholder='Address' 
                        value={ formValues.address }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.address}</p>

                    </div>
                    <div className="field">
                        <label>State</label>
                        <input 
                        type='state' 
                        name='state' 
                        placeholder='State' 
                        value={ formValues.state }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.state}</p>

                    </div>
                    <div className="field">
                        <label>Country</label>
                        <input 
                        type='country' 
                        name='country' 
                        placeholder='Country'
                        value={ formValues.country }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.country}</p>

                    </div>
                    <div className="field">
                        <label>date of birth</label>
                        <input 
                        type='date' 
                        name='dateofbirth'  
                        placeholder='Date of birth'
                        value={ formValues.dateofbirth }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.dateofbirth}</p>

                    </div>
                    <div className="field">
                        <label>phone number</label>
                        <input  
                        name='phonenumber' 
                        type='text'
                        placeholder='Phone number' 
                        value={ formValues.phonenumber }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.phonenumber}</p>

                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        value={ formValues.password }
                        onChange={ handleChange } 
                        />
                        {formErrors?<p>{ formErrors.password}</p>: null}

                        {alertMessage && (
                          <div className={`alert centered-alert ${formErrors ? 'error' : 'success'}`}>
                           {alertMessage}
                            </div>
                             )}

                    </div>
                    
                    <button className='submitbtn'>Submit</button>
                </div>
                <p>Already have an Account?<Link to="/Login" className='thelink'>Login</Link></p>
            </form>
        </div>
    </>
  )
}

export default Register