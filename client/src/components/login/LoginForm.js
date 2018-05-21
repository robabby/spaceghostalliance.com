import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import loginFields from './config/loginFields.js';
import * as actions from '../../actions';

import LoginField from './LoginField';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
  state = {
    submitted: false,
    username: '',
    email: '',
    name: '',
  }
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  renderLoginFields() {
    return _.map(loginFields, ({ type, label, name, testVal }) => {
      return (
        <Field
          key={name}
          component={LoginField}
          type={type}
          label={label}
          name={name}
          testVal={testVal}
        />
      );
    });
  }


  handleFormSubmit(values) {
    let { history } = this.props;
    this.setState({
      submitted: true
    });
    this.props.loginUser(values, history);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => this.handleFormSubmit(values))}
        >
          {this.renderLoginFields()}
          <div>
            <Button
              type="submit"
              variant="raised"
              color="primary"
              className={'login-submit'}
            >
              Submit
            </Button>
          </div>
        </form>
        <p>
          {this.state.submitted.toString()}
        </p>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  return state;
}

LoginForm = connect(
  mapStateToProps,
  actions
)(withRouter(LoginForm));

export default reduxForm({
  form: 'loginForm', // required property
  validate
})(LoginForm);
