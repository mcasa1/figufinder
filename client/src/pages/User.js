import Nav from '../components/Nav'
import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const User = () => {
    
    const [user, setUser] = useState(null)
    const [cookies] = useCookies(['user'])
    const userId = cookies.UserId

    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        nombre: "",
        apellido: "",
      

    })

    const [formDataZona, setFormDataZona] = useState({
        user_id: cookies.UserId,
        zonas: "",
      

    })
    
    const navigate = useNavigate()

    const toDashboard = () => {
        navigate('/Dashboard')
    }
    

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
        
    })
    
    // const handleSubmit = async (e) => {
    //     console.log('submitted')
    //     e.preventDefault()
    //     try {
    //         console.log(formData)
    //         const response = await axios.put('http://localhost:8000/user', {
    //             formData
    //         })
    //         console.log(response)
    //         const success = response.status === 200
    //         if (success) navigate('/Dashboard')
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const handleSubmitZonas = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            console.log(formDataZona)
            const response = await axios.put('http://localhost:8000/addzona', {
                formDataZona
            })
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/Dashboard')
        } catch (err) {
            console.log(err)
        }

    }
 
    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.value
        const name = e.target.name

        // setFormData((prevState) => ({
        //     ...prevState,
        //     [name]: value
        // }))

        setFormDataZona((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        
<div className='onboarding'>
    <button className = "btn" onClick={toDashboard}>Atras</button>
<h2>TUS ZONAS</h2>
{user &&

user.zonas.map((zona, index) => {
    return (
           
                
                <div key={index} >
                      {zona}
                    </div>
    )
}
)}
                     <div className="onboarding">
                     
                <h2>AGREGAR ZONAS</h2>

                
                <form onSubmit={handleSubmitZonas}>
                    <section>
                    
                        <input
                            id="zonas"
                            type='text'
                            name="zonas"
                            placeholder="zonas"
                            required={false}
                            value={formDataZona.zonas}
                            onChange={handleChange}
                        />
                        <input type="submit"/>
                    </section>
                </form>

            </div>
    

</div>
        
    )
    
}
export default User