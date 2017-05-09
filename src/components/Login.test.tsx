import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { default as Login, setEmail, setPassword, State, SetStateCallback } from './Login'

const initalState: State = {
  email: '',
  password: '',
  validEmail: true,
  popOver: false,
  suggestedEmail: ''
}

test('renders without crashing', () => {
  const component = renderer.create(
    <Login />
  )

  const initialTree = component.toJSON()
  expect(initialTree).toMatchSnapshot()
})

test('setters should call setState', () => {
  const email = 'ulrik@example.com'
  const password = 'password'

  setEmail((cb: SetStateCallback) => {
    expect(cb(initalState)).toEqual({ email })
  }, email)

  setPassword((cb: SetStateCallback) => {
    expect(cb(initalState)).toEqual({ password })
  }, password)
})
