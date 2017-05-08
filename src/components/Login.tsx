import * as React from 'react'
import * as classNames from 'classnames'
import * as Email from '../models/Email'

import './Login.css'

interface Props {}

interface State {
  email: string,
  password: string,
  validEmail: boolean,
  popOver: boolean,
  suggestedEmail: string
}

class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    validEmail: true,
    popOver: false,
    suggestedEmail: ''
  }

  loginInput: HTMLInputElement

  loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailMatch = this.loginInput.value.match(Email.emailRegex)

    if (emailMatch !== null) {
      const username = emailMatch[1]
      const domainName = emailMatch[2]
      console.log(Email.bestMatch(Email.standardEmailDomains, domainName), username, '@', domainName)
    }
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

  assignEmailRef = (ele: HTMLInputElement) => this.loginInput = ele

  render () {
    return (
      <div className='login-container'>
        <form className={classNames({ form: true, hidden: this.state.popOver })} onSubmit={this.loginSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              ref={this.assignEmailRef}
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
        <div className={classNames({ popover: true, show: this.state.popOver })}>
          <p>You wrote {this.state.email} but we think you ment {this.state.suggestedEmail}.</p>
          <p>If this is correct, press "Yes" else press "No"" and we will submit your entered email</p>
          <button>Yes</button>{' '}<button>No</button>
        </div>
      </div >
    )
  }
}

export default Login
