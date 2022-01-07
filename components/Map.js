import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'

const Map = (props) => {
  const sid = useContext(SidContext)
  const [showsUserLocation, setShowsUserLocation] = useState(false)
  const [networkController] = useState(() => new NetworkController())
  const [stations, setStations] = useState([])

  const locationPermissionAsync = async () => {
    let canUseLocation = false
    const grantedPermission = await Location.getForegroundPermissionsAsync()
    if (grantedPermission.status === 'granted') {
      canUseLocation = true
    } else {
      const permissionResponse = await Location.requestForegroundPermissionsAsync()
      if (permissionResponse.status === 'granted') {
        canUseLocation = true
      }
    }

    if (canUseLocation) {
      const location = await Location.getCurrentPositionAsync()
      console.log('received location', location)
      setShowsUserLocation(true)
    }
  }

  const renderStations = () => {
    if (stations !== 'undefined') {
      console.log(stations)
      return stations.map((station) => {
        return (
          <Marker
            coordinate={{
              latitude: parseFloat(station.lat),
              longitude: parseFloat(station.lon),
            }}
            title={station.sname}
            key={station.sname}
          />
        )
      })
    }
    return null
  }

  useEffect(() => {
    console.log('useEffect')
    locationPermissionAsync()
    networkController
      .getStations(sid, props.did)
      .then((stations) => setStations(stations))
  }, [])

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 45.46441040646955,
        longitude: 9.192706401261175,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }} // Duomo coordinates
      showsUserLocation={showsUserLocation}
      followsUserLocation={true} // it works only on iOS
    >
      {renderStations()}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default Map
