import React from 'react'
import { SafeAreaView, View } from 'react-native'
import LinesScreen from './screens/LinesScreen'

export default function App() {
  const lines = [
    {
      terminus1: { sname: 'Milano Celoria', did: 1 },
      terminus2: { sname: 'Milano Rogoredo', did: 2 },
    },
    {
      terminus1: { sname: 'Milano Lambrate', did: 3 },
      terminus2: { sname: 'Sesto San Giovanni', did: 4 },
    },
  ]

  return (
    <SafeAreaView>
      <LinesScreen lines={lines} />
    </SafeAreaView>
  )
}
