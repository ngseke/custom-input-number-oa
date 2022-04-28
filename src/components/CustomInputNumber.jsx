import { useRef } from 'react'

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

  const decrease = () => {
    ref.current?.stepDown()
    dispatchSyntheticEvent()
  }
  const increase = () => {
    ref.current?.stepUp()
    dispatchSyntheticEvent()
  }

  return (
    <div>
      <button onClick={decrease} disabled={disabled}>
        -
      </button>

      <input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />

      <button onClick={increase} disabled={disabled}>
        +
      </button>
    </div>
  )
}
