import React from 'react'
import router from 'react-router'
import { connect } from 'react-redux'
import actions from '../actions/index'
import LoginForm from './login-form'

const Login = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login;