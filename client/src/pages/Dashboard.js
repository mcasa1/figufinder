import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
    window.alert("Hola, gracias por estar usando la app. Como esto es una herramienta gratuita, esta construida sobre servidores gratuitos que tienen ciertas limitaciones. Es por eso que para que la app te pueda funcionar bien, es necesario que no cargues más de 200 figuritas entre las que necesitas y tus repetidas. Espero que igualmente asi te sirva")

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