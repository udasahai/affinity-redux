import { connect } from 'react-redux'
import Header from '../Components/Header/Header'




const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  contact: state.login.user
})

// const mapDispatchToProps = dispatch => ({
// })

export default connect(mapStateToProps)(Header)
// export default connect(mapStateToProps)(Users)
