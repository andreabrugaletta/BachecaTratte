import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoardsScreen from './screens/BoardsScreen'
import LinesScreen from './screens/LinesScreen'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LinesScreen"
          component={LinesScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="BoardsScreen"
          component={BoardsScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
