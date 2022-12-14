
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import * as yup from 'yup';
import styles from './Form.module.css'
import { useMutation } from 'react-query';
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


   const addUserData = async (data: any) =>{
     return await Axios.post('http://localhost:3003/insert',data);
   }

   const {mutate} = useMutation(addUserData,{
       onSuccess(response:any){
        console.log(response);
        if(response.data.error === "User exists"){
          toast("You are Already Registered",{ autoClose: 1500 })  
        }
        else{
          toast("Regsitered Successfully!",{ autoClose: 1500 });
      }
      formik.resetForm();
       }
   })
 
   const handleSubmit =()=>{
    const formData = {
      name:formik.values.name,
      email:formik.values.email,
      password:formik.values.password
    }
    mutate(formData);
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
    
     <p>Already Registered? <Link to='/Login' className={styles.link}>Sign In</Link></p>

    </div>
  )



}



export default Register

function resetForm(arg0: {}) {
  throw new Error('Function not implemented.');
}
