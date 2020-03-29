import React from 'react'
// import store from '../../Store'


class Users extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {

        //console.log(this.props.users)

        this.props.onRender();

        return (
            <div>
            <h1> Hello Baby!!! </h1>
            <h1> {this.props.mood} </h1>
            {
                this.props.users.map((user,i) => {
                    return (
                        <div key={i}>
                        <h3> {user.firstName} </h3>
                        <h3> {user.departmentID}</h3>
                        <hr></hr>

                        </div>
                    )
                })
            }
            </div>
        )
    }
}



export default Users
