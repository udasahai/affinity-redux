import React from 'react'
// import store from '../../Store'
import "./Users.css"
import { CardColumns, Card } from 'react-bootstrap'
import Tile from '../Tile/Tile'





class Users extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {

        if (!this.props.loaded)
            this.props.getUsers();
    }

    tileComponents() {

        // var value = this.state.value;
        // var selection = this.state.selections_department;
        // var selections_research = this.state.selections_research;
        var data = this.props.user_data.items;


        // value = value.toLowerCase();

        // console.log("dept : " + selection);

        // if (selections_research.length > 0) {
        //     data = data.filter(function(tile) {
        //         return tile.researchInterests.toLowerCase().includes(selections_research.toLowerCase())
        //     })
        // }

        // if (value.length >= 3) {
        //     data = data.filter(function(tile) {
        //         return (tile.firstName.toLowerCase().includes(value) || tile.lastName.toLowerCase().includes(value))
        //     })
        // }


        // if (selection > 0) {
        //     data = data.filter(function(tile) {
        //         console.log(tile)
        //         return tile.departmentID == selection
        //     })
        // }

        //  console.log(data[0])

        // data = data.map(tile => {

        // 	tile["fullname"] = tile.firstName + " " + tile.lastName
        // 	// tilel[""]
        // 	tile["interests"] = tile.researchInterests.split(",")
        // })

        // for (var i = 0; i < data.length; i++) {
        //     data[i]["fullname"] = data[i].firstName + " " + data[i].lastName
        //     data[i]["interests"] = data[i].researchInterests.split(",")
        // }

        // console.log(data)

        return data.map(tile => (
            <Tile key={tile.userID*100 + tile.departmentID}
// 			contact={{name: tile.firstName + " " + tile.lastName , imgUrl: tile.profilePicture,
// 			email: tile.email, interests: tile.researchInterests, userID: tile.userID}}
			contact={tile}
			/>
        ))
    }


    render() {

        //console.log(this.props.users)

        this.props.onRender();

        return (
            <div>

                <div id="search">
                    <h1> Hello Baby!!! </h1> <
                    h1 > { this.props.mood } < /h1>
                </div>

                <div id="result">
                    {
                                this.props.user_data.loading ?
                                <h1> ...Loading </h1> :
                                <CardColumns>
                                    {this.tileComponents()}
                               </CardColumns>
                    }

                </div>

            </div>
        )
    }
}



export default Users
