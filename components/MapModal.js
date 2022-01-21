import React from 'react'
import { Modal, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { Header } from '@react-navigation/elements'
import Map from './Map'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../colors'

const MapModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView>
        <Header
          headerStyle={styles.headerStyle}
          headerTintColor="white"
          title="Dettagli tratta"
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
      <Map did={props.did} />
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
})

export default MapModal
