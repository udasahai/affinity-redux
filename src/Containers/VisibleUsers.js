import { connect } from 'react-redux'
import Users from '../Components/Users/Users'
import { getAction } from '../Actions'
import { fetchUsers, setUsersFilter, clearFilter } from '../Actions/userActions'


const filterUsers = (users, filter) => {
  let duplicates = new Set()
  return users.filter(user => {

    if (duplicates.has(user.userID)) {
      return false;
    }
    else {
      duplicates.add(user.userID)
    }

    const nameFilter = filter.name.length < 2 || (user.firstName.toLowerCase().includes(filter.name.toLowerCase()) || user.lastName.toLowerCase().includes(filter.name.toLowerCase()));
    const departmentFilter = filter.departmentID == 0 || user.departmentID == filter.departmentID;
    const researchFilter = user.researchInterests.toLowerCase().includes(filter.research.toLowerCase())

    return nameFilter && departmentFilter && researchFilter;
  })
}


const mapStateToProps = state => {

  //console.log(state.users)
  return ({
    mood: state.joke.mood,
    user_data: {
      ...state.users,
      items: filterUsers(state.users.items, state.users.filter)
    },
    loaded: state.loaded,
    filter: state.users.filter,
    departments: state.departments.items,
    research: state.research.items
  })
}

const mapDispatchToProps = dispatch => ({
  onRender: () => {
    dispatch(getAction())
  },
  getUsers: () => {
    dispatch(fetchUsers())
  },
  setUsersFilter: (filter) => {
    dispatch(setUsersFilter(filter))
  },

  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
// export default connect(mapStateToProps)(Users)1v
