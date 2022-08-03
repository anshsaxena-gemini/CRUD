
import { useFormik } from 'formik'
import { SetStateAction, useState } from 'react';
import * as yup from 'yup';
import styles from './Form.module.css'
const { default: Axios } = require('axios');
function Login() {

    const formik = useFormik(
         {
            initialValues : {
                email : "",
                password :""
            },
            validationSchema : yup.object({
                email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: yup.string().required("Required")
            }
            ),
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
         }
    );

    const [foodList,setFoodList] = useState<any[]>([])
 
    const handleSubmit =(event: { preventDefault: () => void; }) =>{
          event.preventDefault();
         
        if(formik.values.email.length===0 || formik.values.password.length===0){
            return;
        }
        Axios.post('http://localhost:3003/insert',{
           email:formik.values.email,
           password:formik.values.password,
          })
      
        alert("success")
       
          
    }
  
  return (
    <div className={styles.Container}>
        <h1 className={styles.heading}>Sign In</h1>
     <form onSubmit={handleSubmit}>
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
     <button type='submit' className={styles.btn}>Login</button>
     </form>

    </div>
  )
}

export default Login