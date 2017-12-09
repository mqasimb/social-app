import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/index'
import RegistrationForm from './registration-form'

const Register = () => {
    return (
        <div>
            <RegistrationForm />
        </div>
    )
}

export default Register