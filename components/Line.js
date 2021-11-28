import React from 'react'
import { View, Text } from 'react-native'

const Line = (props) => {
  return (
    <View>
      <Text>
        {props.terminus1} - {props.terminus2}
      </Text>
      <Text>direzione {props.terminus1}</Text>
      <Text>direzione {props.terminus2}</Text>
    </View>
  )
}

export default Line
