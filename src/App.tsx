import * as React from 'react'
import './App.css'

import Login from './components/Login'

class App extends React.Component<{}, null> {
  render () {
    return (
      <div className='App'>
        <Login />
      </div>
    )
  }
}

export default App
