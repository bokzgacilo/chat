import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  const handleLogin = (user) => {
    localStorage.setItem('online_user', user)
    
    navigate('/rooms')
  }

  return(
    <>
      <button onClick={() => handleLogin('James')}>Log as James</button><br></br>
      <button onClick={() => handleLogin('Arthur')}>Log as Arthur</button>
    </>
  )
}