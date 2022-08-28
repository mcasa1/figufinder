import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'



const Dashboard = () => {

    const [user, setUser] = useState(null)
    const cookies = useCookies(['user'])
    
    const userId = cookies[0].UserId
    

    const getUser = async () => {
        try {
            const response = await axios.get('/user', {
                params: {userId}
            })
            setUser(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        
    },[])






    const ToNeed = () => {
        navigate('/Need')
    }

    const ToHave = () => {
        navigate('/Have')
    }
    const navigate = useNavigate();
    
    return (
        <div className='dashboardcont'>
        
        {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                
                <button
                className='btn'
                onClick={ToNeed}>
                    Agrega las que necesitas
                </button>
                <button
                className='btn'
                onClick={ToHave}>
                    Agrega las que tenes repetidas
                </button>
                
                
           
            </div>}
            
        
        
        </div>
    );
}
export default Dashboard