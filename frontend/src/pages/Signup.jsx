import React, { useContext, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
const sliderData = [
  {
    image: assets.slider1,
    title: "Send Money Instantly",
    description: "Transfer money anytime, anywhere with secure and fast transactions."
  },
  {
    image: assets.slider2,
    title: "Track Your Expenses",
    description: "Monitor your spending and stay in control of your finances."
  },
  {
    image: assets.slider3,
    title: "Safe & Secure Payments",
    description: "Your transactions are protected with bank-grade security."
  }
]
axios.defaults.withCredentials = true;
 
const Signup = () => {
    const {backendUrl} = useContext(AppContext)
    const [step, setStep] = useState('mobile')
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputsRef = useRef([])
    const navigate = useNavigate();

    // Mobile input
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        setMobile(value)
    }

    const isValidMobile = mobile.length === 10

    // OTP input
    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
        inputsRef.current[index + 1].focus()
        }
    }

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputsRef.current[index - 1].focus()
        }
    }

    const [sendOtpLoading, setSendOtpLoading] = useState(false)
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)

    const sendOtp = async(mobile) =>{
        setSendOtpLoading(true)
        try {
            const {data} = await axios.post(`${backendUrl}/api/auth/send-otp`, {mobile})
            toast.success(data.message)
            setSendOtpLoading(false)
            setStep("otp")
        } catch (err) {
          console.log(err);
          setSendOtpLoading(false)
        }
    }

    const verifyOtp = async (mobile, otp) => {
    setVerifyOtpLoading(true)

    try {
      const otpString = otp.join('')

      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-otp`,
        { mobile, otp: otpString }
      )

      toast.success("Login successful")
      navigate("/main")

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setVerifyOtpLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* ===== TOP SECTION ===== */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">

        {/* Blur Background */}
        <div className="absolute w-full h-[500px] inset-0 bg-gradient-to-b from-teal-800 to-black blur-3xl"></div>

        {/* Slider */}
        <Swiper
        modules={[Pagination, Autoplay]}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop
        className="w-full max-w-xs z-10"
        >
        {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center px-4">
                
                <img
                src={slide.image}
                alt={slide.title}
                className="w-56 mb-6"
                />

                <h2 className="text-lg font-semibold mb-2">
                {slide.title}
                </h2>

                <p className="text-sm text-gray-400">
                {slide.description}
                </p>

            </div>
            </SwiperSlide>
        ))}
        </Swiper>

      </div>

      {/* ===== BOTTOM SECTION ===== */}
      {step === 'mobile' && (
        <>
        <div className="bg-black rounded-t-3xl px-6 py-8 border-t-2 border-t-teal-700 pb-20">

            <h1 className="text-xl font-semibold mb-2">
            Welcome
            </h1>
            <p className="text-gray-400 mb-6 text-sm">
            Enter your mobile number to continue
            </p>

            <input
            type="text"
            value={mobile}
            onChange={handleMobileChange}
            maxLength={10}
            placeholder="Mobile number"
            className="w-full h-12 rounded-full bg-gray-900 border border-gray-700 px-4 outline-none focus:border-teal-500"
            />

            {
              sendOtpLoading ?
                <span
                className={`w-full h-12 mt-5 rounded-full font-medium flex items-center bg-gray-700 text-gray-400 cursor-not-allowed justify-center gap-4`}
                >
                <Loader className='animate-spin duration-300 transition-all'/>
                <p>Please Wait...</p>
                </span>
              :
              <button
                disabled={!isValidMobile}
                onClick={() => sendOtp(mobile)}
                className={`w-full h-12 mt-5 rounded-full font-medium transition
                    ${isValidMobile
                    ? 'bg-teal-500 text-black'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                `}
                >
                Continue
              </button>
            }
            
        </div>
        </>
      )}


      {step === 'otp' && (
        <div className='w-full px-5 pb-10'>
          <h1 className="text-xl font-semibold mb-2">
            Enter OTP
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            OTP sent to +91 {mobile}
          </p>

          <div className="flex justify-center gap-8 max-sm:gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center text-lg rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-teal-500"
              />
            ))}
          </div>
            
          {
            verifyOtpLoading ? 
              <span
              className={`w-full h-12 mt-5 rounded-full font-medium flex items-center bg-gray-700 text-gray-400 cursor-not-allowed justify-center gap-4`}
              >
              <Loader className='animate-spin duration-300 transition-all'/>
              <p>Please Wait...</p>
              </span>
            :
            <button
              onClick={() => verifyOtp(mobile, otp)}
              className="w-full h-12 rounded-full bg-teal-500 text-black font-medium"
            >
              Verify OTP
            </button>
          }
          

          <p className="text-center text-xs text-gray-500 mt-4">
            Didn’t receive OTP? <span className="text-teal-400">Resend</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Signup
