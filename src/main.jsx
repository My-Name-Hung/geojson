import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { ClerkProvider} from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import './main.css'


// IMPORT FILE
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUp/SignUp.jsx';
import Travel from './components/Travel/Travel.jsx'
import Admin from './components/admin/Admin.jsx';

// Import your publishable key clerk
import {viVN} from '@clerk/localizations' // IMPORT LANGUAGE
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={viVN}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path='/Travel' element={<Travel />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/Biology' />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
