import { connect } from 'react-redux'
import Profile from '../Components/Profile/Profile'

const mapStateToProps = state => {

  //console.log(state.users)
  return ({

    loggedIn: state.login.loggedIn,
    user: state.login.user,
    publications: state.publications.publications

  })
}


export default connect(mapStateToProps)(Profile)
// export default connect(mapStateToProps)(Users)1v
