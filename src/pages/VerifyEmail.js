import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { useState } from 'react';
import OtpInput from 'react-otp-input';
import {useNavigate,useNavigation} from "react-router-dom"
import {Link} from "react-router-dom"
import {sendOtp} from "../services/operations/authAPI"
import {signUp} from "../services/operations/authAPI"



const VerifyEmail = () => {
    const { loading ,signupData} = useSelector((state) => state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit =(e)=>{
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    return (
        <div className="text-white">

            {
                loading ? (
                    <div>Loading..</div>
                ) : (
                    <div className='w-full h-full flex flex-col justify-center items-center gap-5 p-4'>
                        <h1 className='text-pure-greys-5 text-3xl font-semibold'>Verify Email</h1>
                        <p className='text-yellow-50 text-xl '>A verification code has been sent to you Enter the code below</p>
                        <form onSubmit={handleOnSubmit} className='text-black'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input className='w-[30px]' {...props} />}
                                renderSeparator={<span>-</span>}
                                
                                className="text-richblack-25 bg-richblack-800 p-4 "

                            >

                            </OtpInput>
                            <button
                            type="submit" className='text-yellow-5 bg-richblack-900 px-3 py-2 border-white rounded-md underline'
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className=' flex md:flex-row flex-col justify-center items-center gap-5'>
                            <div className='px-3 py-2 rounded-md font-semibold bg-yellow-50 text-richblack-900 '>
                                <Link to="/login">
                                    <p>Back to Login</p>
                                </Link>

                            </div>
                            <button className='px-3 py-2 rounded-md font-semibold bg-yellow-50 text-richblack-900 '
                            onClick={()=>dispatch(sendOtp(signupData.email))}
                            >
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default VerifyEmail