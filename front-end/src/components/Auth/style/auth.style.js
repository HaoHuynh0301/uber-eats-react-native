import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  logoContainer: {
    width: '100%', 
    marginBottom: 30
  },
  inputContainer: {
    width: '80%',
    height: 70,
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center'
  },
  inputField: {
    marginLeft: 20,
  },
  loginBtn: {
    borderRadius: 0,
    width: '80%',
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginBtnLabel: {
    color: 'white',
  },
  subFooterContainer: {
    flexDirection: 'row',
    width: '100%', 
    justifyContent: 'space-around',
    marginTop: 20
  },
  linkLabel: {
    color: 'blue'
  },
  footerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40
  },
  footerItemsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    // justifyContent: 'space-around',
    width: 300,
    height: 40,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  footIconLabel: {
    marginLeft: 80
  }
});

export default styles;