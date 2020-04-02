import React from 'react'
// import store from '../../Store'
import "./Users.css"
import { CardColumns, Card } from 'react-bootstrap'
import Tile from '../Tile/Tile'
import Select from '../Select/Select'
import debounce from 'lodash/debounce'





class Users extends React.Component {

    constructor(props) {
        super(props)
        this.selectCallback = this.selectCallback.bind(this)
        this.onChangeResearch = this.onChangeResearch.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }

    componentDidMount() {

        this.props.clearFilter();

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

    onChangeResearch = (event) => {
        /* signal to React not to nullify the event object */
        event.persist();

        if (!this.debouncedResearch) {
            this.debouncedResearch = debounce(() => {
                this.props.setUsersFilter({
                    ...this.props.filter,
                    research: event.target.value
                })
            }, 300);
        }
        this.debouncedResearch();
    }

    onChangeName = (event) => {
        /* signal to React not to nullify the event object */
        event.persist();

        if (!this.debouncedName) {
            this.debouncedName = debounce(() => {
                this.props.setUsersFilter({
                    ...this.props.filter,
                    name: event.target.value
                })
            }, 300);
        }
        this.debouncedName();
    }



    selectCallback(val) {
        this.props.setUsersFilter({
            ...this.props.filter,
            departmentID: val
        })
    }


    selectPredicate(val) {
        return {
            val: val.departmentID,
            display: val.name
        }
    }


    render() {

        //console.log(this.props.users)

        // this.props.onRender();
        const departments = [...this.props.departments];
        departments.unshift({
            departmentID: 0,
            name: "All"
        })

        return (
            <div id='body'>

                <div id="department">
                   Departments: <Select source={departments} predicate={this.selectPredicate} callback={this.selectCallback} />
                </div>

                <div id='search'>
                    Name: <br></br><input type='text' onChange={this.onChangeName} placeholder='Search for a User...'></input>
                </div>

                <div id='research'>
                    Research:<br></br>
        			<input list="interests" onChange={this.onChangeResearch}/>
        			<datalist id="interests">

        			    {
        			    	this.props.research.map((item,i) =>
        			      <option key={i} value={item.keyword} />
        			    )}

        			</datalist>
                </div>

                <br className='clear'></br>


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
