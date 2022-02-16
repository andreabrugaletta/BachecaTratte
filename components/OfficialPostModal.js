import React from 'react'
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Header } from '@react-navigation/elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../colors'

const OfficialPostModal = (props) => {
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
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView>
        <Header
          headerStyle={styles.headerStyle}
          headerTintColor="white"
          title="Comunicazione ufficiale"
          headerLeft={() => (
            <TouchableOpacity onPress={() => props.dismiss()}>
              <Icon
                name="close"
                style={{ marginLeft: 8 }}
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {renderTimeStamp(props.timestamp)}
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.red,
  },
  headerTitleStyle: {
    color: 'white',
  },
  viewContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  timestamp: {
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    marginTop: 16,
  },
})

export default OfficialPostModal
