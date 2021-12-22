import React from 'react'
import { FlatList } from 'react-native'
import Line from './Line'
import ItemSeparator from './ItemSeparator'

const LinesList = (props) => {
  return (
    <FlatList
      data={props.lines}
      renderItem={({ item }) => (
        <Line
          terminus1={item.terminus1}
          terminus2={item.terminus2}
          navigation={props.navigation}
        />
      )}
      keyExtractor={(item) => item.terminus1.did.toString()}
    />
  )
}

export default LinesList
