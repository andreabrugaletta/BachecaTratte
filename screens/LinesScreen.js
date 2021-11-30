import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import Header from '../components/Header'
import LinesList from '../components/LinesList'
import { SidContext } from '../utils/SidContext'

const LinesScreen = ({ navigation }) => {
  const sid = useContext(SidContext)
  const GET_LINES_URL =
    'https://ewserver.di.unimi.it/mobicomp/treest/getLines.php'
  const [lines, setLines] = useState({})

  const getLines = async () => {
    try {
      const response = await fetch(GET_LINES_URL, {
        method: 'POST',
        body: JSON.stringify({ sid: sid }),
      })
      const json = await response.json()
      setLines(json.lines)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLines()
    return () => {
      setLines({})
    }
  }, [])

  return (
    <View>
      <Header text="Tratte" />
      <LinesList lines={lines} navigation={navigation} />
    </View>
  )
}

export default LinesScreen
