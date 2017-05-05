import * as React from 'react'

interface Props {

}

interface State {
  username: string,
  password: string
}

class Login extends React.Component<Props, State> {
  state = {
    username: '',
    password: ''
  }

  loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  setUsername = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value })
  }

  setPassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value })
  }

  render () {
    return (
      <form onSubmit={this.loginSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='string' name='username' value={this.state.username} onChange={this.setUsername} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' value={this.state.password} onChange={this.setPassword} />

        <input type='submit' />
      </form>
    )
  }
}

export default Login
