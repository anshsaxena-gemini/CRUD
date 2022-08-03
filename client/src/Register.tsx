
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetStateAction, useState } from 'react';
import * as yup from 'yup';
import styles from './Form.module.css'
// const sgMail = require('@sendgrid/mail')
const { default: Axios } = require('axios');


function Register() {

    const formik = useFormik(
         {
            initialValues : {
                name : "",
                email : "",
                password :""
            },
            validationSchema : yup.object({
                name: yup.string().required("Name is required !").matches(/^[a-zA-Z ]*$/,"Name is not valid"),
                email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: yup.string().required("Required")
            }
            ),
            onSubmit: values => {
                alert(JSON.stringify(values, null, 1));
            },
         }
    );

    const [foodList,setFoodList] = useState<any[]>([])

//     const API = "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";

// sgMail.setApiKey(API)

// const message ={
//   to: "ansh.saxena@gla.ac.in",
//   from : "ansh562000@gmail.com",
//   subject:"Welcome to CRUD!",
//   text:"Hello form Ansh Saxena",
//   html:"<h1>Hello form Ansh Saxena</h1>"
// }

 
    const handleSubmit =(event: { preventDefault: () => void; }) =>{
          event.preventDefault();
        
        // if(formik.values.name.length ===0 || formik.values.email.length===0 || formik.values.password.length===0){
        //     return;
        // }
      
        
         Axios.post('http://localhost:3003/insert',{
           name:formik.values.name,
           email:formik.values.email,
           password:formik.values.password,
          }).then((response: any)=>{
             if(response.data.error === "User exists"){
              toast("You are Already Registered")
              formik.values.name=""
              
            }
          else{
              toast("Regsitered Successfully!");
          }

            
          })
          
          // localStorage.setItem("email",formik.values.email);
        //   sgMail.send(message)
        //   .then((response: any) => console.log("Email Sent"))
        //   .catch((console.error()));
        // alert("success")
       
          
    }
  
  return (
    <div className={styles.Container}>
      <ToastContainer 
      />
        <h1 className={styles.heading}>Sign up</h1>
     <form onSubmit={handleSubmit}>
     <input
     type="text"
     className={styles.input}
     placeholder='Enter your name'
     name='name'
     value={formik.values.name}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur} /> 
     <div className={styles.error}>
        {formik.touched.name ? formik.errors.name : ""}
     </div>
     <br></br>
    <input
    className={styles.input}
     type="text"
     name='email'
     placeholder='Enter your Email'
     value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur} />
      <div className={styles.error}>
        {formik.touched.email ? formik.errors.email : ""}
     </div>
     <br></br>
     <input
    className={styles.input}
     type="password"
     name='password'
     placeholder='Create a password'
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur} />
      <div className={styles.error}>
        {formik.touched.password ? formik.errors.password : ""}
     </div>
     <br></br>
     <button type='submit' className={styles.btn}>Register</button>
     </form>

    </div>
  )



}



export default Register