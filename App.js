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
import { StyleSheet, StatusBar } from 'react-native'
import { COLORS } from './colors.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import OfficialPostDetailScreen from './screens/OfficialPostDetailScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Linee') {
            iconName = focused ? 'train' : 'train-outline'
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === 'Profilo') {
            iconName = focused ? 'user' : 'user-o'
            return <FontAwesome name={iconName} size={size} color={color} />
          }
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: COLORS.red,
        tabBarInactiveBackgroundColor: COLORS.red,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: COLORS.red,
          paddingVertical: 4,
        },
      })}
    >
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
    StatusBar.setBarStyle('light-content', true)
    return (
      <SidContext.Provider value={sid}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lines">
            <Stack.Screen
              name="LinesScreen"
              component={HomeTab}
              options={{
                title: 'Maledetta TreEst',
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.headerTitleStyle,
              }}
            />
            <Stack.Screen
              name="BoardsScreen"
              component={BoardsScreen}
              options={{
                headerStyle: { backgroundColor: COLORS.red },
                headerTitleStyle: styles.headerTitleStyle,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SidContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.red,
  },
  headerTitleStyle: {
    color: 'white',
  },
})
