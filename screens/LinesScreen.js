import React from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../components/Header'
import LinesList from '../components/LinesList'

const LinesScreen = (props) => {
  return (
    <SafeAreaView>
      <Header text="Tratte" />
      <LinesList lines={props.lines} />
    </SafeAreaView>
  )
}

export default LinesScreen
