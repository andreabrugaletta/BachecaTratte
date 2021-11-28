import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import LinesList from '../components/LinesList'

const LinesScreen = (props) => {
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
    <View>
      <Header text="Tratte" />
      <LinesList lines={lines} />
    </View>
  )
}

export default LinesScreen
