import * as React from 'react'
import * as classNames from 'classnames'
import * as Email from '../models/Email'

interface Props {}

interface State {
  email: string,
  validEmail: boolean,
  password: string
}

class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    validEmail: true
  }

  loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  setEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value })
  }

  setPassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value })
  }

  componentWillUpdate (_: Props, nextState: State) {
    // a empty email should not show a error message
    if (this.state.email !== nextState.email && nextState.email.length === 0) {
      this.setState({
        validEmail: true
      })
    }
    // if the user is typing its password and has added a email we should validate the email
    if (nextState.password !== this.state.password && nextState.email.length !== 0) {
      this.setState({
        validEmail: Email.validateEmail(nextState.email)
      })
    }
    // if the email is invalid we should validate it when it changes
    if (this.state.validEmail === false && this.state.email !== nextState.email) {
      this.setState({
        validEmail: Email.validateEmail(nextState.email)
      })
    }
  }

  render () {
    return (
      <div className='login-container'>
        <form className='form' onSubmit={this.loginSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              autoComplete='off'
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.setEmail}
            />
            <div className={classNames({ validation: true, invalid: !this.state.validEmail })}>
              Not a valid E-mail
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              autoComplete='off'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.setPassword}
            />
          </div>

          <input type='submit' className='button' />
        </form>
      </div>
    )
  }
}

export default Login
