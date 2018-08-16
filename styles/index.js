import {
  StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
  body: {
    backgroundColor: '#dbdbdb',
    flex: 1
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#83b1fc',
    height: 70
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  tabs: {
    backgroundColor: '#75a7f9',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-evenly'
  }
})
