import React from 'react';
import {Avatar} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';

const CustomMediumGradientAvatar = ({titleOrIcon, gradientColors = [colors.lightpurple, colors.purple], titleStyle = null, onPressAvatar = () => {}, }) => (
  <LinearGradient
    colors={gradientColors}
    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
    style={styles.buttonView}
  >
    <Avatar
      size="medium"
      rounded
      onPress={onPressAvatar && (onPressAvatar)}
      title={titleOrIcon.type === 'string' ? titleOrIcon.value : ''}
      icon={titleOrIcon.type === 'icon' ? titleOrIcon.value : {}}
      titleStyle={titleStyle ? titleStyle : styles.avatarTitle}
      activeOpacity={0.7}
    />
  </LinearGradient>
)

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    borderRadius: 30,
    fontSize: 20,
  },
  avatarTitle: {
    color: colors.white,
    backgroundColor: colors.transparent,
  },
})

export default CustomMediumGradientAvatar;
