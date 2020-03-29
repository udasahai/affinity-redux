import { connect } from 'react-redux'
import Header from '../Components/Header/Header'




const mapStateToProps = state => ({
  username: state.users.username,
  loggedIn: state.users.loggedIn
})

// const mapDispatchToProps = dispatch => ({
// })

export default connect(mapStateToProps)(Header)
// export default connect(mapStateToProps)(Users)
