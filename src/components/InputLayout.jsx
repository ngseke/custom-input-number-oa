import styled from 'styled-components'

const Wrapper = styled.div({
  display: 'flex',
})

const Label = styled.label({
  flex: 1,
})

export default function InputLayout ({ label, input }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <div>{input}</div>
    </Wrapper>
  )
}
