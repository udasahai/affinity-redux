import { connect } from 'react-redux'
import Create from '../Components/Create/Create'




const mapStateToProps = state => {
  
  // console.log("Mapping State")
  // console.log(state.login.user);
  return ({
  loggedIn: state.login.loggedIn,
  contact: state.login.user
})}

// const mapDispatchToProps = dispatch => ({
// })

export default connect(mapStateToProps)(Create)
