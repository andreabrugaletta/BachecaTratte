import React from 'react'
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native'
import { Header } from '@react-navigation/elements'
import Map from './Map'
import Icon from 'react-native-vector-icons/MaterialIcons'

const MapModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView>
        <Header
          title="Dettagli tratta"
          headerLeft={() => (
            <TouchableOpacity onPress={() => props.dismiss()}>
              <Icon name="close" style={{ marginLeft: 8 }} size={30} />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <Map did={props.did} />
    </Modal>
  )
}

export default MapModal
