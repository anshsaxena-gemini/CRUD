
import { useFormik } from 'formik'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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

    // const [foodList,setFoodList] = useState<any[]>([])
    const navigate = useNavigate();
 
    const handleSubmit =(event: { preventDefault: () => void; }) =>{
          event.preventDefault();
         
        if(formik.values.email.length===0 || formik.values.password.length===0){
            return;
        }
        Axios.post('http://localhost:3003/login',{
           email:formik.values.email,
           password:formik.values.password,
          }).then((res: any)=>{
         
            
            if(res.data.status === "ok"){
              navigate("./Home")
            }
            if(res.data.error === "Invalid Password"){
              toast("Invalid Password!", { autoClose: 1500 });
            }
            else{
             toast("User not found !",{ autoClose: 1500 })
            }
            formik.resetForm();
          })
      
    
       
          
    }
  
  return (
    
    <div className={styles.Container}>
<ToastContainer/>
        <h1 className={styles.heading}>Sign In</h1>
     <form onSubmit={handleSubmit}>
    <input
    className={styles.input}
     type="text"
     name='email'
     placeholder='Enter your email'
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
     placeholder='Enter your password'
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur} />
      <div className={styles.error}>
        {formik.touched.password ? formik.errors.password : ""}
     </div>
     <br></br>
     <button type='submit' className={styles.btn}>Login</button>
     </form>
     <p>Not Registered? <Link to='/' className={styles.link}>Register Now</Link></p>
    </div>
  )
}

export default Login