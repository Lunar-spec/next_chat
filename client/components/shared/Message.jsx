const Message = ({ message, username }) => {
    console.log(message)
    const isOwner = message.sender === username;

    return (
        <div className="flex gap-2 flex-col text-white">
            <span className="text-xs text-center">{new Date(message.createdAt).toLocaleString()}</span>
            <div className={`flex gap-2 items-center ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}>
                <small className={`w-max rounded-full px-2 py-1 capitalize font-semibold text-base ${isOwner ? 'bg-gradient-to-tr from-red-500 via-pink-300 to-[#ff54cc]' : 'bg-gray-700'}`}>{message.sender.substr(0, 1)}</small>
                <span className={`bg-gradient-to-r shadow-lg from-cyan-500 to-blue-500 text-white rounded-md p-2 ${message.content.length > 60 ? 'lg:w-[60rem] w-[20rem] rounded-md p-2' : 'w-max'} w-max py-2 ${isOwner ? 'from-red-300 via-rose-400 to-pink-500' : ''}`}>
                    {message.content}
                </span>
            </div>
        </div>
    )
}

export default Message