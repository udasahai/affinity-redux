import { connect } from 'react-redux'
import Users from '../Components/Users/Users'
import { getAction } from '../Actions'
import { fetchUsers } from '../Actions/userActions'




const mapStateToProps = state => {

  //console.log(state.users)
  return ({
    mood: state.joke.mood,
    user_data: state.users,
    loaded: state.loaded

  })
}

const mapDispatchToProps = dispatch => ({
  onRender: () => {
    dispatch(getAction())
  },
  getUsers: () => {
    dispatch(fetchUsers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
// export default connect(mapStateToProps)(Users)1v
