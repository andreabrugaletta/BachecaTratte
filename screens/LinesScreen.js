import React from 'react'
import { View } from 'react-native'
import Header from '../components/Header'
import LinesList from '../components/LinesList'

const LinesScreen = (props) => {
  return (
    <View>
      <Header text="Tratte" />
      <LinesList lines={props.lines} />
    </View>
  )
}

export default LinesScreen
