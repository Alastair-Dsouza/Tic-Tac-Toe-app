import { createContext, useState } from "react"

export const TttContext = createContext()
const TttProvider = ({ children }) => {
  const [ttt, setTtt] = useState({
     playerWins : 0,
     compWins : 0,
     draws : 0,
     noComp : false,
     firstComp : false,
     whoFirstNext : "none",
     started: false,
     gameCompleted : false,
  });

  const providerValue = {
    ttt, setTtt
  }

  return (
    <TttContext.Provider value={providerValue}>
      {children}
    </TttContext.Provider>
  )
}

export default TttProvider