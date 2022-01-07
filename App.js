import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BoardsScreen from './screens/BoardsScreen'
import LinesScreen from './screens/LinesScreen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetworkController from './utils/NetworkController'
import { SidContext } from './utils/SidContext'
import Profile from './components/Profile'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Linee" component={LinesScreen} />
      <Tab.Screen name="Profilo" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [networkController] = useState(() => new NetworkController())
  const [sid, setSid] = useState('')

  useEffect(async () => {
    const firstLaunch = await AsyncStorage.getItem('firstLaunch')
    if (firstLaunch === null) {
      console.log('first launch')
      networkController.register().then(async (registerSid) => {
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
          <Stack.Navigator initialRouteName="Lines">
            <Stack.Screen
              name="LinesScreen"
              component={HomeTab}
              options={{ title: 'Maledetta TreEst' }}
            />
            <Stack.Screen name="BoardsScreen" component={BoardsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SidContext.Provider>
    )
  }
}
