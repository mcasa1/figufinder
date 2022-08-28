import axios from "axios";
import { useState, useEffect} from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({matches, setClickedUser}) => {

 

  const [user, setUser] = useState(null);
  const cookies = useCookies(["user"]);
  const userId = cookies.UserId;

// Get Matches from DB
  const getMatch = async () => {
    try {
      const response = await axios.get("/match", {
        params: { userId },
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/user", {
        params: { userId },
      });
      setUser(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getMatch();
  }, [matches]);
 



// return matches

  return (
    <div className="dashboard">
      <h1>Matches</h1>
      
      <div className="match-container">
        {user &&

          user.matches.map((match, index) => {
            return (
              // show name, has array and needs array of the match
              <div key={index} 
              className="match-card"
              onClick={() => setClickedUser(match)}>
                <h2>{match.nombre} {match.apellido}</h2>
                <h3>Tiene:</h3>
                <h4 className="hascont"> {match.has.map((has, index) => {
                  return (
                    <div key={index} >
                      {has}
                    </div>
                  );
                }
                )}</h4>
                <h3>Quiere:</h3>
                <h4 className="hascont">{match.needs.map((needs, index) => {
                  return (
                    <div key={index}>
                      {needs}
                    </div>
                  );
                }
                )}</h4>
                <h3>Zona:</h3>
                <h4 className="hascont">{match.zonas.map((zonas, index) => {
                  return (
                    <div key={index}>
                      {zonas}
                    </div>
                  );
                }
                )}</h4>

              </div>
            );
          })}
      </div>
      
    </div>
  );
};

export default MatchesDisplay;
