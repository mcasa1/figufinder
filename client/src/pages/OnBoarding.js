import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    
   
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        nombre: "",
        apellido: "",
        zonas: [],
        have: [],
        need: [],
        matches: [],

    })

    let navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            console.log(formData)
            const response = await axios.put('/user', {
                formData
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

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type='text'
                            name="nombre"
                            placeholder="nombre"
                            required={true}
                            value={formData.nombre}
                            onChange={handleChange}
                        /> 
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            id="apellido"
                            type='text'
                            name="apellido"
                            placeholder="apellido"
                            required={true}
                            value={formData.apellido}
                            onChange={handleChange}
                        />

                        <label htmlFor="zonas">Zonas</label>
                        <input
                            id="zonas"
                            type='text'
                            name="zonas"
                            placeholder="zonas"
                            required={true}
                            value={formData.zonas}
                            onChange={handleChange}
                        />
                        <input type="submit"/>
                    </section>
                </form>
            </div>
        </>
    )
}
export default OnBoarding