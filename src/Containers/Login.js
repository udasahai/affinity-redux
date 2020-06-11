import { connect } from 'react-redux'
import React from 'react'
import { fetchUserByTargetID } from '../Actions/userActions'
import { Redirect } from 'react-router'



const Login = (props) => {
    console.log("Starting Login")
    props.dispatch(fetchUserByTargetID())

    // if (props.redirect) {
    //     return <Redirect to={{ pathname: '/users'}}/>
    // }

    if (props.redirect) {
        return <div></div>
    }

    return <h1> Login </h1>
}


const mapStateToProps = state => ({
    redirect: state.login.redirect,
    attempted: state.login.attempted
})

export default connect(mapStateToProps)(Login)
