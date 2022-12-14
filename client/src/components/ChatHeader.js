import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const ChatHeader = ({ user }) => {
    const [ cookies, removeCookie ] = useCookies(['user'])
let navigate = useNavigate()
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
    }

    const toUser = () => {
        navigate('/User')
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
            
                <h3 >{user.nombre}</h3>
                <br/>
                <br/>
                <button onClick={toUser} >Zonas</button>
            </div>
            <i className="log-out-icon" onClick={logout}>Logout</i>
        </div>
    )
}

export default ChatHeader