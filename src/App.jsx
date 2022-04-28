import RoomAllocation from './components/RoomAllocation.jsx'

export default function App () {
  return (
    <div>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={result => console.log(JSON.stringify(result))}
      />
    </div>
  )
}
