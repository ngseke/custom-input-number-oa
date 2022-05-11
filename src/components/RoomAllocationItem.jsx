import styled from 'styled-components'
import CustomInputNumber from './CustomInputNumber.jsx'
import InputLayout from './InputLayout.jsx'

import Title from './Title.jsx'

const List = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': { marginTop: '1rem' },
})

const Item = styled.li({})

const Description = styled.div({
  color: 'grey',
  marginTop: 5,
})

export default function RoomAllocationItem ({
  value,
  onChange,
  remain,
  max = Infinity,
}) {
  const total = value.adult + value.child

  const handleAdultChange = (event) => {
    onChange({ ...value, adult: Number(event.target.value) })
  }
  const handleChildChange = (event) => {
    onChange({ ...value, child: Number(event.target.value) })
  }

  return (
    <div>
      <Title>房間：{total} 人</Title>
      <List>
        <Item>
          <InputLayout
            label={<>大人 <Description>年齡 20+</Description></>}
            input={
              <CustomInputNumber
                value={value.adult}
                onChange={handleAdultChange}
                min={1}
                max={Math.min(value.adult + remain, max - value.child)}
              />
            }
          />
        </Item>
        <Item>
          <InputLayout
            label="小孩"
            input={
              <CustomInputNumber
                value={value.child}
                onChange={handleChildChange}
                min={0}
                max={Math.min(value.child + remain, max - value.adult)}
              />
            }
          />
        </Item>
      </List>
    </div>
  )
}
