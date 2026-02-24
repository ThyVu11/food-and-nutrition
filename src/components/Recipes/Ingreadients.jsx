import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Typography,Checkbox } from '@mui/material';


class Ingreadients extends Component {
  state = {
    checked: false
  }

  handleCheckBoxChange = () => {
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    return (
      <div>
        <Typography paragraph>  <Checkbox
          checked={this.state.checked}
          onChange={this.handleCheckBoxChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />{this.props.i.original}</Typography>
      </div>
    )
  }
};


export default connect()(Ingreadients);
