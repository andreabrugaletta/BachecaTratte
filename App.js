import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BoardsScreen from './screens/BoardsScreen'
import LinesScreen from './screens/LinesScreen'
import { NavigationContainer } from '@react-navigation/native'
import { SidContext } from './utils/SidContext'

export default function App() {
  const Stack = createNativeStackNavigator()
  const sid = 'nWzpsKNDtryZ7LW0'

  return (
    <SidContext.Provider value={sid}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lines">
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
    </SidContext.Provider>
  )
}
