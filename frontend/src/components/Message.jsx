import React, { useEffect, useRef } from 'react'

const Message = ({message}) => {
    const scroll =  useRef()
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:'smooth'})
    },[message])
    return (
        <div ref={scroll} className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className="chat-bubble">{message?.message}</div>
        </div>
    )
}

export default Message