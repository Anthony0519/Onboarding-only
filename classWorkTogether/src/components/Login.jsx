import React, {useState, useEffect} from "react"; 
import {Link} from 'react-router-dom';
import axios from "axios"




const Login = ()=>{

  const url = "http://localhost:9001/login"
    const initialValues = {
        email : "",
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
        // setFormErrors(validate(formValues));
        setIsSubmit(true);

        try {
          const response = await axios.post(url, {
          
            emailOrPhone: formValues.email,
            password: formValues.password,
           
          });
    
          setAlertMessage(response.data.message);
        } catch (error) {
          if(error.response){

            setAlertMessage(`Error submitting form: ${error.response.data.error}`);
          }
        }
      };

    // const validate = (values)=>{
    //     const errors = {};
    //     const corremail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     const correaddress = /^[a-zA-Z0-9\s,'-]*$/
        
    //     if ( !values.name ) {
    //       errors.name = "Name is required!"
    //     }
    //     if ( !values.email ) {
    //       errors.email = "email is required!"
    //     } else if (!corremail.test(values.email)) {
    //       errors.email = "This is not a valid email format!"
    //     }
    //     if ( !values.address ) {
    //       errors.address = "address is required!"
    //     }else if (!correaddress.test(values.address)) {
    //         errors.address = "invalid address format"
    //     }
    //     if ( !values.state ) {
    //       errors.state = "state is required!"
    //     }
    //     if ( !values.country ) {
    //       errors.country = "country is required!"
    //     }
    //     if ( !values.dateofbirth ) {
    //       errors.dateofbirth = "dateofbirth is required!"
    //     }
    //     if ( !values.phonenumber ) {
    //       errors.phonenumber = "phonenumber is required!"
    //     }
    //     if ( !values.password ) {
    //       errors.password = "password is required!"
    //     } else if ( values.password.length < 8) {
    //         errors.password = "password should not be less than 8 characters!"
    //       } 
    
    //     return errors;
    //   }

    return (
        <>
                <form onSubmit={handleSubmit}>
        <div className='containerlogin > p'>
        <h1>Login Form</h1>
          <p>{formErrors.Username}</p>
          <div className='field'>
            <label>Email</label>
            <input type='email' name='email' placeholder='Email or phone number'value ={ formValues.email} onChange={handleChange}/>
          </div>
          <p>{formErrors.email}</p>
          <div className='field'>
            <label>Password</label>
            <input type='password' name='password' placeholder='Password'value = { formValues.password}onChange={handleChange}/>
          </div>
          <p>{formErrors.Password}</p>
          {alertMessage && (
            <div className={`alert centered-alert ${formErrors ? 'error' : 'success'}`}>
            {alertMessage}
            </div>
           )}

          <button className='submitbtn'>Login</button>
          <p>You don't have an account? <Link to='/'>Register</Link></p>

        </div>

      </form>
        </>
    )
}
export default Login 