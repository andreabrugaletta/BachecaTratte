import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoardsScreen from './screens/BoardsScreen'
import LinesScreen from './screens/LinesScreen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetworkController from './utils/NetworkController'
import { SidContext } from './utils/SidContext'

export default function App() {
  const LineStack = createNativeStackNavigator()
  const [networkController] = useState(() => new NetworkController())
  const [sid, setSid] = useState('')

  useEffect(async () => {
    const firstLaunch = await AsyncStorage.getItem('firstLaunch')
    if (firstLaunch === null) {
      console.log('first launch')
      networkController.register(async (registerSid) => {
        setSid(registerSid)
        await AsyncStorage.setItem('sid', registerSid)
      })
      await AsyncStorage.setItem('firstLaunch', 'false')
    } else {
      console.log('already launched')
      const registerSid = await AsyncStorage.getItem('sid')
      setSid(registerSid)
    }
  }, [])

  if (sid === '') {
    return null
  } else {
    return (
      <SidContext.Provider value={sid}>
        <NavigationContainer>
          <LineStack.Navigator initialRouteName="Lines">
            <LineStack.Screen
              name="LinesScreen"
              component={LinesScreen}
              options={{ title: 'Maledetta TreEst' }}
            />
            <LineStack.Screen name="BoardsScreen" component={BoardsScreen} />
          </LineStack.Navigator>
        </NavigationContainer>
      </SidContext.Provider>
    )
  }
}
