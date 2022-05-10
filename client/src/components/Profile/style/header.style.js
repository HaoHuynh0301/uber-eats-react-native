import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '100%',
    backgroundColor: 'black',
    paddingTop: 130,
    paddingLeft: 20,
  },
  usernameTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  profileInforWrapper: {
    flexDirection: 'row',
    height: 80,
    width: 200,
    alignItems: 'center',
    paddingBottom: 50
  },
  profileImgWrapper: {
    backgroundColor: 'white',
    height: 85,
    width: 85,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});

export default styles;