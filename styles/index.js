import {
  StyleSheet,
  Dimensions
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
  },
  footer: {
    backgroundColor: '#75a7f9',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-evenly'
  },
  container: {
    padding: 25,
    backgroundColor: '#cce0ff',
    width: '100%'
  },
  item: {
    backgroundColor: '#f4f8ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    borderRadius: 15
  },
  modal: {
    borderRadius: 15,
    width: '80%',
    padding: 15,
    backgroundColor: '#7892ba',
    display: 'flex',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height / 2
  },
  modalTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  inputTitle: {
    color: 'white',
    fontSize: 14
  },
  simpleInput: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 4,
    paddingRight: 4,
    paddingLeft: 4,
    height: 25
  },
  bigInput: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 4,
    paddingRight: 4,
    paddingLeft: 4,
    height: 100
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
