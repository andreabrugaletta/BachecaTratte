import React from 'react'
import { FlatList } from 'react-native'
import Line from './Line'

const LinesList = (props) => {
  console.log(props.lines)

  return (
    <FlatList
      data={props.lines}
      renderItem={({ item }) => (
        <Line
          key={item.terminus1.did}
          terminus1={item.terminus1.sname}
          terminus2={item.terminus2.sname}
        />
      )}
    />
  )
}

export default LinesList
