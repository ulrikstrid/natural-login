import * as React from 'react'

type Props = {
  validator: (input: string) => boolean,
  updateValue: (output: string) => void,
  value: string,
  type?: string,
  name?: string
}

const InputWithValidation = (props: Props) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    props.validator(inputValue)
    props.updateValue(inputValue)
  }

  return (
    <input
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={onChange}
    />
  )
}

export default InputWithValidation
