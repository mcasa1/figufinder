import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'  
import {useNavigate} from 'react-router-dom'

const Need = () => {      
    const options = [
        {id: 'ARG', name: 'Argentina 🇦🇷', numeros: ["ARG 1", "ARG 2", "ARG 3", "ARG 4", "ARG 5", "ARG 6", "ARG 7", "ARG 8", "ARG 9", "ARG 10", "ARG 11", "ARG 12", "ARG 13", "ARG 14", "ARG 15", "ARG 16", "ARG 17", "ARG 18", "ARG 19"]},
        {id: 'AUS', name: 'Australia 🇦🇺', numeros: ["AUS 1", "AUS 2", "AUS 3", "AUS 4", "AUS 5", "AUS 6", "AUS 7", "AUS 8", "AUS 9", "AUS 10", "AUS 11", "AUS 12", "AUS 13", "AUS 14", "AUS 15", "AUS 16", "AUS 17", "AUS 18", "AUS 19"]},
        {id: 'BEL', name: 'Belgium 🇧🇪', numeros: ["BEL 1", "BEL 2", "BEL 3", "BEL 4", "BEL 5", "BEL 6", "BEL 7", "BEL 8", "BEL 9", "BEL 10", "BEL 11", "BEL 12", "BEL 13", "BEL 14", "BEL 15", "BEL 16", "BEL 17", "BEL 18", "BEL 19"]},
        {id: 'BRA', name: 'Brazil 🇧🇷', numeros: ["BRA 1", "BRA 2", "BRA 3", "BRA 4", "BRA 5", "BRA 6", "BRA 7", "BRA 8", "BRA 9", "BRA 10", "BRA 11", "BRA 12", "BRA 13", "BRA 14", "BRA 15", "BRA 16", "BRA 17", "BRA 18", "BRA 19"]},
        {id: 'CMR', name: 'Cameroon 🇨🇲', numeros: ["CMR 1", "CMR 2", "CMR 3", "CMR 4", "CMR 5", "CMR 6", "CMR 7", "CMR 8", "CMR 9", "CMR 10", "CMR 11", "CMR 12", "CMR 13", "CMR 14", "CMR 15", "CMR 16", "CMR 17", "CMR 18", "CMR 19"]},
        {id: 'CAN', name: 'Canada 🇨🇦', numeros: ["CAN 1", "CAN 2", "CAN 3", "CAN 4", "CAN 5", "CAN 6", "CAN 7", "CAN 8", "CAN 9", "CAN 10", "CAN 11", "CAN 12", "CAN 13", "CAN 14", "CAN 15", "CAN 16", "CAN 17", "CAN 18", "CAN 19"]},
        {id: 'CRC', name: 'Costa Rica 🇨🇷', numeros: ["CRC 1", "CRC 2", "CRC 3", "CRC 4", "CRC 5", "CRC 6", "CRC 7", "CRC 8", "CRC 9", "CRC 10", "CRC 11", "CRC 12", "CRC 13", "CRC 14", "CRC 15", "CRC 16", "CRC 17", "CRC 18", "CRC 19"]},
        {id: 'CRO', name: 'Croatia 🇭🇷', numeros: ["CRO 1", "CRO 2", "CRO 3", "CRO 4", "CRO 5", "CRO 6", "CRO 7", "CRO 8", "CRO 9", "CRO 10", "CRO 11", "CRO 12", "CRO 13", "CRO 14", "CRO 15", "CRO 16", "CRO 17", "CRO 18", "CRO 19"]},
        {id: 'DEN', name: 'Denmark 🇩🇰', numeros: ["DEN 1", "DEN 2", "DEN 3", "DEN 4", "DEN 5", "DEN 6", "DEN 7", "DEN 8", "DEN 9", "DEN 10", "DEN 11", "DEN 12", "DEN 13", "DEN 14", "DEN 15", "DEN 16", "DEN 17", "DEN 18", "DEN 19"]},
        {id: 'ECU', name: 'Ecuador 🇪🇨', numeros: ["ECU 1", "ECU 2", "ECU 3", "ECU 4", "ECU 5", "ECU 6", "ECU 7", "ECU 8", "ECU 9", "ECU 10", "ECU 11", "ECU 12", "ECU 13", "ECU 14", "ECU 15", "ECU 16", "ECU 17", "ECU 18", "ECU 19"]},
        {id: 'ENG', name: 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿', numeros: ["ENG 1", "ENG 2", "ENG 3", "ENG 4", "ENG 5", "ENG 6", "ENG 7", "ENG 8", "ENG 9", "ENG 10", "ENG 11", "ENG 12", "ENG 13", "ENG 14", "ENG 15", "ENG 16", "ENG 17", "ENG 18", "ENG 19"]},
        {id: 'FRA', name: 'France 🇫🇷', numeros: ["FRA 1", "FRA 2", "FRA 3", "FRA 4", "FRA 5", "FRA 6", "FRA 7", "FRA 8", "FRA 9", "FRA 10", "FRA 11", "FRA 12", "FRA 13", "FRA 14", "FRA 15", "FRA 16", "FRA 17", "FRA 18", "FRA 19"]},
        {id: 'GER', name: 'Germany 🇩🇪', numeros: ["GER 1", "GER 2", "GER 3", "GER 4", "GER 5", "GER 6", "GER 7", "GER 8", "GER 9", "GER 10", "GER 11", "GER 12", "GER 13", "GER 14", "GER 15", "GER 16", "GER 17", "GER 18", "GER 19"]},
        {id: 'GHA', name: 'Ghana 🇬🇭', numeros: ["GHA 1", "GHA 2", "GHA 3", "GHA 4", "GHA 5", "GHA 6", "GHA 7", "GHA 8", "GHA 9", "GHA 10", "GHA 11", "GHA 12", "GHA 13", "GHA 14", "GHA 15", "GHA 16", "GHA 17", "GHA 18", "GHA 19"]},
        {id: 'IRN', name: 'IR Iran 🇮🇷', numeros: ["IRN 1", "IRN 2", "IRN 3", "IRN 4", "IRN 5", "IRN 6", "IRN 7", "IRN 8", "IRN 9", "IRN 10", "IRN 11", "IRN 12", "IRN 13", "IRN 14", "IRN 15", "IRN 16", "IRN 17", "IRN 18", "IRN 19"]},
        {id: 'JPN', name: 'Japan 🇯🇵', numeros: ["JPN 1", "JPN 2", "JPN 3", "JPN 4", "JPN 5", "JPN 6", "JPN 7", "JPN 8", "JPN 9", "JPN 10", "JPN 11", "JPN 12", "JPN 13", "JPN 14", "JPN 15", "JPN 16", "JPN 17", "JPN 18", "JPN 19"]},
        {id: 'KOR', name: 'Korea Republic 🇰🇷', numeros: ["KOR 1", "KOR 2", "KOR 3", "KOR 4", "KOR 5", "KOR 6", "KOR 7", "KOR 8", "KOR 9", "KOR 10", "KOR 11", "KOR 12", "KOR 13", "KOR 14", "KOR 15", "KOR 16", "KOR 17", "KOR 18", "KOR 19"]},
        {id: 'MEX', name: 'Mexico 🇲🇽', numeros: ["MEX 1", "MEX 2", "MEX 3", "MEX 4", "MEX 5", "MEX 6", "MEX 7", "MEX 8", "MEX 9", "MEX 10", "MEX 11", "MEX 12", "MEX 13", "MEX 14", "MEX 15", "MEX 16", "MEX 17", "MEX 18", "MEX 19"]},
        {id: 'MOR', name: 'Morocco 🇲🇦', numeros: ["MOR 1", "MOR 2", "MOR 3", "MOR 4", "MOR 5", "MOR 6", "MOR 7", "MOR 8", "MOR 9", "MOR 10", "MOR 11", "MOR 12", "MOR 13", "MOR 14", "MOR 15", "MOR 16", "MOR 17", "MOR 18", "MOR 19"]},
        {id: 'NED', name: 'Netherlands 🇳🇱', numeros: ["NED 1", "NED 2", "NED 3", "NED 4", "NED 5", "NED 6", "NED 7", "NED 8", "NED 9", "NED 10", "NED 11", "NED 12", "NED 13", "NED 14", "NED 15", "NED 16", "NED 17", "NED 18", "NED 19"]},
        {id: 'POL', name: 'Poland 🇵🇱', numeros: ["POL 1", "POL 2", "POL 3", "POL 4", "POL 5", "POL 6", "POL 7", "POL 8", "POL 9", "POL 10", "POL 11", "POL 12", "POL 13", "POL 14", "POL 15", "POL 16", "POL 17", "POL 18", "POL 19"]},
        {id: 'POR', name: 'Portugal 🇵🇹', numeros: ["POR 1", "POR 2", "POR 3", "POR 4", "POR 5", "POR 6", "POR 7", "POR 8", "POR 9", "POR 10", "POR 11", "POR 12", "POR 13", "POR 14", "POR 15", "POR 16", "POR 17", "POR 18", "POR 19"]},
        {id: 'QAT', name: 'Qatar 🇶🇦', numeros: ["QAT 1", "QAT 2", "QAT 3", "QAT 4", "QAT 5", "QAT 6", "QAT 7", "QAT 8", "QAT 9", "QAT 10", "QAT 11", "QAT 12", "QAT 13", "QAT 14", "QAT 15", "QAT 16", "QAT 17", "QAT 18", "QAT 19"]},
        {id: 'KSA', name: 'Saudi Arabia 🇸🇦', numeros: ["KSA 1", "KSA 2", "KSA 3", "KSA 4", "KSA 5", "KSA 6", "KSA 7", "KSA 8", "KSA 9", "KSA 10", "KSA 11", "KSA 12", "KSA 13", "KSA 14", "KSA 15", "KSA 16", "KSA 17", "KSA 18", "KSA 19"]},
        {id: 'SEN', name: 'Senegal 🇸🇳', numeros: ["SEN 1", "SEN 2", "SEN 3", "SEN 4", "SEN 5", "SEN 6", "SEN 7", "SEN 8", "SEN 9", "SEN 10", "SEN 11", "SEN 12", "SEN 13", "SEN 14", "SEN 15", "SEN 16", "SEN 17", "SEN 18", "SEN 19"]},
        {id: 'SRB', name: 'Serbia 🇷🇸', numeros: ["SRB 1", "SRB 2", "SRB 3", "SRB 4", "SRB 5", "SRB 6", "SRB 7", "SRB 8", "SRB 9", "SRB 10", "SRB 11", "SRB 12", "SRB 13", "SRB 14", "SRB 15", "SRB 16", "SRB 17", "SRB 18", "SRB 19"]},
        {id: 'ESP', name: 'Spain 🇪🇸', numeros: ["ESP 1", "ESP 2", "ESP 3", "ESP 4", "ESP 5", "ESP 6", "ESP 7", "ESP 8", "ESP 9", "ESP 10", "ESP 11", "ESP 12", "ESP 13", "ESP 14", "ESP 15", "ESP 16", "ESP 17", "ESP 18", "ESP 19"]},
        {id: 'SUI', name: 'Switzerland 🇨🇭', numeros: ["SUI 1", "SUI 2", "SUI 3", "SUI 4", "SUI 5", "SUI 6", "SUI 7", "SUI 8", "SUI 9", "SUI 10", "SUI 11", "SUI 12", "SUI 13", "SUI 14", "SUI 15", "SUI 16", "SUI 17", "SUI 18", "SUI 19"]},
        {id: 'TUN', name: 'Tunisia 🇹🇳', numeros: ["TUN 1", "TUN 2", "TUN 3", "TUN 4", "TUN 5", "TUN 6", "TUN 7", "TUN 8", "TUN 9", "TUN 10", "TUN 11", "TUN 12", "TUN 13", "TUN 14", "TUN 15", "TUN 16", "TUN 17", "TUN 18", "TUN 19"]},
        {id: 'URU', name: 'Uruguay 🇺🇾', numeros: ["URU 1", "URU 2", "URU 3", "URU 4", "URU 5", "URU 6", "URU 7", "URU 8", "URU 9", "URU 10", "URU 11", "URU 12", "URU 13", "URU 14", "URU 15", "URU 16", "URU 17", "URU 18", "URU 19"]},
        {id: 'USA', name: 'USA 🇺🇸', numeros: ["USA 1", "USA 2", "USA 3", "USA 4", "USA 5", "USA 6", "USA 7", "USA 8", "USA 9", "USA 10", "USA 11", "USA 12", "USA 13", "USA 14", "USA 15", "USA 16", "USA 17", "USA 18", "USA 19"]},
        {id: 'WAL', name: 'Wales 🏴󠁧󠁢󠁷󠁬󠁳󠁿', numeros: ["WAL 1", "WAL 2", "WAL 3", "WAL 4", "WAL 5", "WAL 6", "WAL 7", "WAL 8", "WAL 9", "WAL 10", "WAL 11", "WAL 12", "WAL 13", "WAL 14", "WAL 15", "WAL 16", "WAL 17", "WAL 18", "WAL 19"]},
        {id: 'FWC', name: 'Especiales', numeros: ["00","FWC 1", "FWC 2", "FWC 3", "FWC 4", "FWC 5", "FWC 6", "FWC 7", "FWC 8", "FWC 9", "FWC 10", "FWC 11", "FWC 12", "FWC 13", "FWC 14", "FWC 15", "FWC 16", "FWC 17", "FWC 18", "FWC 19", "FWC 20", "FWC 21", "FWC 22", "FWC 23", "FWC 24", "FWC 25", "FWC 26", "FWC 27", "FWC 28", "FWC 29"]}


        ]
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
        getUser();
        
    })

  
    

    const handleChangeNeed = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        
        console.log(`${value} is ${checked}`);
                
        // Case 1 : The user checks the box
        if (checked) {
            
          try {
             axios.put('/addneed', {
                userId,
                value
            })
            
        } catch (err) {
            console.log(err)
        }
        }
        // Case 2  : The user unchecks the box
        else {
            try {
                axios.put('/removeneed', {
                   userId,
                   value
               })
               
           } catch (err) {
               console.log(err)
           }
          
        }
    };
    const navigate = useNavigate();

    const toDashboard = () => {
        navigate ('/dashboard')
    }
    
    return(
        
        <div className="dashboard">
            <button  className = "btn" onClick={toDashboard}>Atras</button>
        <form>
            <section>    
                <h2>Carga las que necesitas:</h2>
                Button that selects all
                <button type="button" className = {"btn"} onClick={() => {
                    // window alert asking not to reload the page
                    window.alert('Esta carga puede tardar un par de minutos porque son muchos datos. Por favor no refresques la página y no salgas de la página o se va a frenar la carga. Igualmente si no despues podes volver a darle al botón' ) 
                    for (let i = 0; i < options.length; i++) {
                        for (let j = 0; j < options[i].numeros.length; j++) {
                            
                            
                            // check if numero is already in the array database
                            if (user.need.includes(options[i].numeros[j])) {
                                
                                console.log('numero ya existe')
                                
                            } else {
                                // if not, add it to the array

                            try {
                                axios.put('/addneed', {
                                    userId,
                                    value: options[i].numeros[j]
                                })
                                
                            } catch (error) {
                                console.log(error)
                            }
                        }
                            
                        }
                       
                    }
                    // window alert when loop is finished
                    
                    
                }
                }>Seleccionar todo</button>

                
                   
            
                <div className="multiple-input-container">
                    {options.map((option, index) => {
                        return(
                            <div key={index} >
                                <h2>{option.name}</h2>
                                <div key={index} className="flexcont">
                                {option.numeros.map((numero, index) => {
                                return(
                                    <div key={index} className="flexea">  
                                        <input
                                        id={numero}
                                        type="checkbox"
                                        name= "need" 
                                                                               
                                        checked={user && user.need.includes(numero) ? true : false}
                                        value={numero}
                                        onChange={handleChangeNeed}    
                                        />
                                        <label htmlFor={numero}>{numero}</label>
                                    </div>
                                );
                                })}  
                                </div>            
                            </div>
                        );
                    })} 
                </div>
            </section>
        </form>
        </div>
    );
}
export default Need