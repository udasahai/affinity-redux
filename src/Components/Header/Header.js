import React from 'react'


class Header extends React.Component {

    render = () => {
        const { username, loggedIn } = this.props
        //console.log(username)
        let greeting = "Welcome, User"
        if (loggedIn) {
            greeting = `Welcome, ${username}`
        }
        return (
            <h1> {greeting} </h1>

        )
    }
}


export default Header;
