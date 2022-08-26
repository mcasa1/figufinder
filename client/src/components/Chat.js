const Chat = ({descendingOrderMessages}) => {
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-message-header">
                            
                            <p className="chatnombre">{message.name}:</p>
                        </div>
                        <p className="chatmensaje">{message.message}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chat