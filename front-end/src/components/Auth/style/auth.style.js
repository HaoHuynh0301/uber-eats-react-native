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
    marginTop: 20,
    alignSelf: 'center'
  },
  inputField: {
    marginLeft: 20,
  },
  loginBtn: {
    borderRadius: 15,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    shadowOpacity: 0.1, 
    shadowOffset: {
      height: 7,
      width: 5
    }
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
    width: 300,
    height: 40,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5
  },
  footIconLabel: {
    marginLeft: 80
  },
  subTitleWrapper: {

  }
});

export default styles;