export default function MessageBubble(props) {
  return (
    props.messageSet.map((index, key1) => (
      index.body == 0 ? 
      <div key={key1}>
        <p>No data to show.</p>
      </div> :
      <div className="chats" key={key1}>
        {index.body.map((body, key2) => (
          <div className="bubbles">
            <div className="message-meta">
              <p key={key2}>{body.uid}</p>
              <span>{body.datetime}</span>
            </div>
            <p>{body.message}</p>
          </div>
        ))}
      </div> 
    ))
  )
}