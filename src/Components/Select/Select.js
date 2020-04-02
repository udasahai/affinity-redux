import React from 'react'

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.callback(event.target.value);
  }


  render() {
    // console.log(this.props.source)
    return (
      <form>
        <label>

          <select value={this.state.value} onChange={this.handleChange}>

            {
              this.props.source.map((val,i) => <option key={i} value={(this.props.predicate(val))['val']}> {(this.props.predicate(val))['display']} </option>)
            }

          </select>
        </label>
      </form>
    );
  }
}


export default Select
