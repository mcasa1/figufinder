import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Have from './pages/Have'
import Need from './pages/Need'
import User from './pages/User'


const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
                {authToken && <Route path="/User" element={<User/>}/>}

                {authToken && <Route path="/need" element={<Need/>}/>}
                {authToken && <Route path="/have" element={<Have/>}/>}


            </Routes>
        </BrowserRouter>
    )
}

export default App
