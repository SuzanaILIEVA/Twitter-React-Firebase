import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const ResetButton = ({email}) => {
    // sifre sifirlama epostasi gonder
    const handleReset =() => {
        sendPasswordResetEmail(auth , email)
        .then(()=> toast.info("A password reset email has been sent. Check your mail box."))
        .catch((err)=> toast.error("Something went wrong : " + err.code))
    }


  return (

    <button onClick={handleReset} className='text-red-500'>Forgot your password?</button>
  )
}

export default ResetButton
