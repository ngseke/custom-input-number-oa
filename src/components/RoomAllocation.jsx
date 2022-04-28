import { Fragment, useMemo } from 'react'
import styled from 'styled-components'

import useAllocation from '../hooks/useAllocation.js'
import RoomAllocationItem from './RoomAllocationItem.jsx'
import Title from './Title.jsx'
import Divider from './Divider.jsx'
import Alert from './Alert.jsx'

const Wrapper = styled.div({
  width: 400,
  margin: '1rem',
  padding: '1rem',
  border: 'dashed grey 1px',
})

export default function RoomAllocation ({
  guest,
  room,
  onChange,
}) {
  const { allocations, setAllocations } = useAllocation({ guest, room })

  const allocatedCount = useMemo(() => (
    allocations?.reduce(
      (sum, { adult, child }) => sum + adult + child,
      0
    )
  ), [allocations])

  const remain = guest - allocatedCount

  const handleChangeAllocation = (index) => (allocation) => {
    const newAllocations = [...allocations]
    newAllocations[index] = allocation
    setAllocations(newAllocations)
  }

  return (
    <Wrapper>
      <Title>住客人數：{guest} 人 / {room} 房</Title>
      {Boolean(remain) && <Alert>尚未分配人數：{remain} 人</Alert>}
      {
        allocations?.map((allocation, key, { length }) => (
          <Fragment key={key}>
            <RoomAllocationItem
              value={allocation}
              onChange={handleChangeAllocation(key)}
              remain={remain}
            />
            {key !== length - 1 && <Divider/>}
          </Fragment>
        ))
      }
    </Wrapper>
  )
}
