import { useRef } from 'react'
import styled from 'styled-components'

const getCommonStyle = ({ disabled }) => ({
  width: 48,
  height: 48,
  margin: 0,
  borderRadius: 5,
  opacity: disabled ? 0.5 : 1,
})

const Button = styled.button((props) => {
  const color = '#219ebc'

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    backgroundColor: 'transparent',
    border: `solid 1px ${color}`,
    fontSize: 40,
    ...getCommonStyle(props),
  }
})

const MinusButton = styled(Button)({
  '::after': { content: '"-"' },
})

const AddButton = styled(Button)({
  '::after': { content: '"+"' },
})

const Input = styled.input((props) => ({
  display: 'block',
  border: 'solid 1px grey',
  color: 'grey',
  textAlign: 'center',
  ...getCommonStyle(props),
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    appearance: 'none',
  },
}))

const Wrapper = styled.div({
  display: 'flex',
  '& > * + *': {
    marginLeft: 8,
  },
})

export default function CustomInputNumber ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) {
  const ref = useRef()

  const dispatchSyntheticEvent = () => {
    const event = new Event('input', { bubbles: true })
    ref.current?.dispatchEvent(event)
  }

  const minus = () => {
    ref.current?.stepDown()
    dispatchSyntheticEvent()
  }
  const add = () => {
    ref.current?.stepUp()
    dispatchSyntheticEvent()
  }

  const isMinusButtonDisabled = disabled || Number(value) <= Number(min)
  const isAddButtonDisabled = disabled || Number(value) >= Number(max)

  const handleChange = (e) => {
    const value = Number(e.target.value)
    if (value > max || value < min) {
      e.preventDefault()
    } else {
      onChange(e)
    }
  }

  return (
    <Wrapper>
      <MinusButton
        onClick={minus}
        disabled={isMinusButtonDisabled}
      />

      <Input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />

      <AddButton
        onClick={add}
        disabled={isAddButtonDisabled}
      />
    </Wrapper>
  )
}
