import {Button} from 'react-native';
import {BOTTOM_ICONS} from '../components/home/BottomTabs/constants/bottomIcons.constants';

export const SCREEN_OPTIONS  = ({name}) => {
  ({focused, color, size}) => {
    let icon = BOTTOM_ICONS.find(screen => screen.name === name);
    if(icon) {
      return(
        <FontAwesome5
          name={name}
          size={20}
          style={{marginTop: 5, alignSelf: "center",}}
        />
      );
    }
  }
};
export const TAB_OPTIONS = {
  header: () => null
}

export const HIDDEN_TAB_OPTIONS = {
  header: () => null,
  tabBarButton: () => null,
}