import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import AllBank from './pages/AllBank'
import PayMobileNumber from './pages/PayMobileNumber'
import ChatPayScreen from './pages/ChatPayScreen'
import UpiPinScreen from './pages/UpiPinScreen'
import PaymentSuccessScreen from './pages/PaymentSuccessScreen'
import PaymentProcessingScreen from './pages/PaymentProcessingScreen'
import BankTransfer from './pages/BankTransfer'
import BankProcessingScreen from './pages/BankProcessingScreen'
import BankConfirmScreen from './pages/BankConfirmScreen'
import CheckBalance from './pages/CheckBalance'
import TransactionHistory from './pages/TransactionHistory'
import TransactionDetails from './pages/TransactionDetails'
import ScanQrScreen from './pages/ScanQrScreen'
import ScanPayScreen from './pages/ScanPayScreen'
import GenerateQr from './components/GenerateQr'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import CreatePin from './pages/CreatePin'

const App = () => {
  return (
    <div className='flex lg:px-90 md:px-50 sm:px-20 w-full bg-black'>
      <Toaster />

      <Routes>

        {/* Public Route */}
        <Route path='/' element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        {/* ALL Protected Routes */}
        <Route path='/main' element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/all-bank' element={<PrivateRoute><AllBank /></PrivateRoute>} />
        <Route path='/pay-mobile' element={<PrivateRoute><PayMobileNumber /></PrivateRoute>} />
        <Route path="/chat-pay-screen/:receiverNumber" element={<PrivateRoute><ChatPayScreen /></PrivateRoute>} />
        <Route path="/upi-pin/:receiverNumber" element={<PrivateRoute><UpiPinScreen /></PrivateRoute>} />
        <Route path="/payment-processing" element={<PrivateRoute><PaymentProcessingScreen /></PrivateRoute>} />
        <Route path="/payment-success" element={<PrivateRoute><PaymentSuccessScreen /></PrivateRoute>} />
        <Route path="/bank-transfer" element={<PrivateRoute><BankTransfer /></PrivateRoute>} />
        <Route path="/bank-processing" element={<PrivateRoute><BankProcessingScreen /></PrivateRoute>} />
        <Route path="/bank-confirm" element={<PrivateRoute><BankConfirmScreen /></PrivateRoute>} />
        <Route path='/check-balance' element={<PrivateRoute><CheckBalance /></PrivateRoute>} />
        <Route path='/transaction-history' element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
        <Route path='/transaction/:id' element={<PrivateRoute><TransactionDetails /></PrivateRoute>} />
        <Route path="/scan" element={<PrivateRoute><ScanQrScreen /></PrivateRoute>} />
        <Route path="/scan-pay" element={<PrivateRoute><ScanPayScreen /></PrivateRoute>} />
        <Route path="/generate-qr" element={<PrivateRoute><GenerateQr /></PrivateRoute>} />
        <Route path="/create-pin" element={<PrivateRoute><CreatePin/></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App