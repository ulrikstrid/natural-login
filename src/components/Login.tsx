import * as React from 'react'
import * as classNames from 'classnames'
import * as Email from '../models/Email'

import './Login.css'

interface Props {}

export interface State {
  email: string,
  password: string,
  validEmail: boolean,
  popOver: boolean,
  suggestedEmail: string
}

export interface SetStateCallback {
  (currentState: State): Partial<State>
}

interface SetState {
  (stateSetter: SetStateCallback): void
}

export function setEmail (setState: SetState, email: string) {
  setState((_) => ({ email }))
}

export function setPassword (setState: SetState, password: string) {
  setState((_) => ({ password }))
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
    const emailMatch = this.loginInput.value.match(Email.emailRegex)

    if (emailMatch !== null) {
      // The email is valid, but could still be a typo
      const username = Email.getMatchingUsername(emailMatch)
      const domainName = Email.getMatchingDomain(emailMatch)
      const bestDomainMatch = Email.bestMatch(Email.standardEmailDomains, domainName)

      if (bestDomainMatch.diff < 5) {
        this.setState({
          suggestedEmail: `${username}@${bestDomainMatch.bestMatch}`,
          popOver: true
        })
      }

      // The email is valid and the diff is too large to make sense of
      // just let it submit the form.
      return
    }

    e.preventDefault()
  }

  setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(this.setState.bind(this), e.currentTarget.value)
  }

  setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(this.setState.bind(this), e.currentTarget.value)
  }

  changeDomain = () => {
    setEmail(this.setState.bind(this), this.state.suggestedEmail)
    // Submit form data for login here
  }

  assignEmailRef = (ele: HTMLInputElement) => this.loginInput = ele

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

          <input type='submit' className='button primary' />
        </form>
        <div className={classNames({ popover: true, show: this.state.popOver })}>
          <p>You wrote <b>{this.state.email}</b> but we think you ment <b>{this.state.suggestedEmail}</b>.</p>
          <p>If this is correct, press "Yes" else press "No"" and we will submit your entered email</p>
          <button
            className='button primary'
            onClick={this.changeDomain}
          >Yes</button>
          {' '}
          <button
            className='button'
          >No</button>
        </div>
      </div >
    )
  }
}

export default Login
