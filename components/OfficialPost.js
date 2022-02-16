import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import {} from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from '../colors'

const OfficialPost = (props) => {
  const renderTimeStamp = (timestamp) => {
    let parsedTimestamp = timestamp.slice(0, 10) + 'T' + timestamp.slice(11, 19)
    let formattedTimestamp = new Date(parsedTimestamp).toLocaleString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    return <Text style={styles.timestamp}>{formattedTimestamp}</Text>
  }

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('official post clicked')
        props.setTitle(props.data.title)
        props.setTimestamp(props.data.timestamp)
        props.setDescription(props.data.description)
        props.setOfficialPostVisibility(true)
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Entypo
          style={{ marginStart: 16 }}
          name={'pin'}
          size={24}
          color={COLORS.red}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{props.data.title}</Text>
          {renderTimeStamp(props.data.timestamp)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontStyle: 'italic',
  },
})

export default OfficialPost
