import { useEffect, useState } from "react"
import supabase from "../services/supabase"
import MessageBubble from "../components/MessageBubble";
import '../assets/rooms.css'

export default function Room() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([])
  const [typingUsers, setTypingUsers] = useState([])

  const getAllMessages = async () => {
    const { data } = await supabase
    .from('rooms')
    .select()

    setHistory(data)
  }

  const getAllUsersWhoIsTyping = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select()

    console.log(data[0].users)

    const indecesWithIsTyping = data[0].users.map((user, index) => user.isTyping ? index : null).filter(index => index !== null);
    setTypingUsers([...typingUsers, data[0].users[indecesWithIsTyping]])
  }

  const handleFocus = async () => {
    const { data, } = await supabase
      .from('rooms')
      .select('users')

    let userArray = data[0].users;
    let UserIndex = userArray.findIndex((item) => item.uid === localStorage.getItem('online_user'));

    if(UserIndex !== -1){
      userArray[UserIndex].isTyping = true;
    }

    const { updateTyping, error } = await supabase
    .from('rooms')
    .update({ users: userArray })
    .eq('id', 2000)
  }

  const handleInputBlur = async () => {
    const { data, } = await supabase
      .from('rooms')
      .select('users')

    let userArray = data[0].users;
    let UserIndex = userArray.findIndex((item) => item.uid === localStorage.getItem('online_user'));

    if(UserIndex !== -1){
      userArray[UserIndex].isTyping = false;
    }

    const { updateTyping, error } = await supabase
    .from('rooms')
    .update({ users: userArray })
    .eq('id', 2000)
  }

  const handleClick = async () => {
    const date =  new Date();
    let currentHour = date.getHours();
    let AmOrPM = 'AM';

    if (currentHour >= 12) {
      AmOrPM = "PM";
      if (currentHour > 12) {
        currentHour -= 12;
      }
    }

    if (currentHour === 0) {
      currentHour = 12;
    }

    setMessage('')
    
    const messageJSON = {
      uid: localStorage.getItem('online_user'),
      message: message,
      datetime: `${currentHour}:${String(date.getMinutes()).padStart(2, '0')} ${AmOrPM} ${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
    }

    const historyReference = history[0].body;
    const updatedHistoryReference = historyReference.concat(messageJSON);

    const { data, error } = await supabase
      .from('rooms')
      .update({ body: updatedHistoryReference })
      .eq('id', 2000)
      .select()
  }

  useEffect(() => {
    getAllMessages()
    getAllUsersWhoIsTyping()

    const listening = supabase
    .channel('room1')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms' }, payload => {
      getAllMessages()
      getAllUsersWhoIsTyping()
    })
    .subscribe()

  }, [])

  return(
    <>
      <header>
        <h2>Room 200</h2>
        <p>{localStorage.getItem('online_user')}</p>
      </header>
      <main>
        <MessageBubble messageSet={history} />
        {typingUsers != 0 ? 
        typingUsers.map((index, key) => (
          <div className="typing-user" key={key}>
            <p>{index.uid} is typing...</p>
          </div>
        ))
        : <p>No one is writing</p>}
      </main>
      <footer>
        <input 
          placeholder="Type message..." 
          type="text" 
          onChange={(e) => {setMessage(e.target.value)}} 
          onFocus={handleFocus}
          onBlur={handleInputBlur}
          value={message} 
        />
        <button onClick={handleClick}>
          Send    
        </button>
      </footer>
    </>
  )
}