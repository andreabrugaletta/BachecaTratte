import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import LinesList from '../components/LinesList'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'

const LinesScreen = ({ navigation }) => {
  const [lines, setLines] = useState({})
  const [networkController] = useState(() => new NetworkController())
  const sid = useContext(SidContext)

  const swapLine = (lineIndex) => {
    console.log('swapLine on index: ' + lineIndex)
    setLines(
      lines.map((line, index) => {
        if (index === lineIndex) {
          let temp = line.terminus1
          line.terminus1 = line.terminus2
          line.terminus2 = temp
          return line
        }
        return line
      }),
    )
  }

  const getLine = (lineIndex) => {
    return lines[lineIndex]
  }

  useEffect(() => {
    console.log('setting lines')
    networkController.getLines(sid).then((lines) => setLines(lines))
  }, [])

  return (
    <View>
      <LinesList
        lines={lines}
        navigation={navigation}
        swapLine={swapLine}
        getLine={getLine}
      />
    </View>
  )
}

export default LinesScreen
