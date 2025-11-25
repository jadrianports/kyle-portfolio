import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <Toaster position="top-right"
            toastOptions={{ 
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }}
        />
        {children}
    </>
  )
}

export default ToasterProvider