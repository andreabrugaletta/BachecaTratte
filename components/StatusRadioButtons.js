import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper'

const StatusRadioButtons = (props) => {
  const [checked, setChecked] = useState('fourth')

  return (
    <View>
      <View style={styles.radioButton}>
        {console.log('render StatusRadioButtons')}
        <RadioButton
          value="first"
          status={checked !== 'first' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('first')
            props.statusRadioButtonIsChecked(true)
            props.status(0)
          }}
        />
        <Text style={{ fontSize: 16 }}>Situazione ideale</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="second"
          status={checked !== 'second' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('second')
            props.statusRadioButtonIsChecked(true)
            props.status(1)
          }}
        />
        <Text style={{ fontSize: 16 }}>Situazione accettabile</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="third"
          status={checked !== 'third' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('third')
            props.statusRadioButtonIsChecked(true)
            props.status(2)
          }}
        />
        <Text style={{ fontSize: 16 }}>Gravi disagi per i passeggeri</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="fourth"
          status={checked !== 'fourth' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('fourth')
            props.statusRadioButtonIsChecked(false)
          }}
        />
        <Text style={{ fontSize: 16 }}>Nessuna</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 8,
  },
})

export default StatusRadioButtons
