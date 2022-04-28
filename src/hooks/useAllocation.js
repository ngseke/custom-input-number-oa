import { useEffect, useState } from 'react'

export default function useAllocation ({ guest, room }) {
  const [allocations, setAllocations] = useState(null)

  useEffect(function init () {
    setAllocations(
      Array.from({ length: room })
        .map(() => ({ adult: 1, child: 0 }))
    )
  }, [guest, room])

  return {
    allocations,
    setAllocations,
  }
}
