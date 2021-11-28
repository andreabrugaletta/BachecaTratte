import React from 'react'
import { FlatList } from 'react-native'
import Line from './Line'

const LinesList = (props) => {
  return (
    <FlatList
      data={props.lines}
      renderItem={(item) => (
        <Line
          key={props.lines[0].terminus1.did}
          terminus1={props.lines[0].terminus1.sname}
          terminus2={props.lines[0].terminus2.sname}
        />
      )}
    />
  )
}

export default LinesList
