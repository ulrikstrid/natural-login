import * as React from 'react'
import * as classNames from 'classnames'
import * as Email from '../models/Email'
import InputWithValidation from './InputWithValidation'

interface Props {}

interface State {
  username: string,
  validEmail: boolean,
  password: string
}

class Login extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
    validEmail: true
  }

  loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  setUsername = (inputValue: string) => {
    this.setState({ username: inputValue })
  }

  setPassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value })
  }

  setValidEmail = (input: string): boolean => {
    const isValid = Email.validateEmail(input)
    this.setState({ validEmail: isValid })
    return isValid
  }

  render () {
    return (
      <div className='login-container'>
        <form className='form' onSubmit={this.loginSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <InputWithValidation
              type='email'
              name='username'
              value={this.state.username}
              updateValue={this.setUsername}
              validator={this.setValidEmail}
            />
            <div className={classNames({ validation: true, invalid: !this.state.validEmail })}>
              Not a valid E-mail
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={this.setPassword} />
          </div>

          <input type='submit' className='button' />
        </form>
      </div>
    )
  }
}

export default Login
