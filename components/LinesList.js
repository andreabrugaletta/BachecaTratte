import React from 'react'
import { FlatList } from 'react-native'
import Line from './Line'

const LinesList = (props) => {
  return (
    <FlatList
      data={props.lines}
      renderItem={({ item }) => (
        <Line
          keyExtractor={item.terminus1.did}
          terminus1={item.terminus1}
          terminus2={item.terminus2}
        />
      )}
    />
  )
}

export default LinesList
