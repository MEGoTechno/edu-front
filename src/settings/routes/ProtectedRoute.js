import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedTo = [] }) {

    const user = useSelector(s => s.global.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

    }, [navigate, user])
    
    if (allowedTo.length > 0 && !allowedTo?.includes(user.role)) { return <>not found</> }

    if (user) return children
}

export default ProtectedRoute
