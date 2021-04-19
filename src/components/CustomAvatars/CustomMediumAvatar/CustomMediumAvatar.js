import React from 'react';
import {Avatar} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';

const CustomMediumAvatar = ({titleOrIcon, color = { color: colors.white }, background = {backgroundColor: colors.lightpurple}, onPressAvatar = () => {}, }) => (
  <Avatar
    size="medium"
    rounded
    onPress={onPressAvatar && (onPressAvatar)}
    title={titleOrIcon.type === 'string' && (titleOrIcon.value)}
    icon={titleOrIcon.type === 'icon' && (titleOrIcon.value)}
    containerStyle={color}
    overlayContainerStyle={ background ? background : styles.avatarBackground }
    titleStyle={styles.avatarTitle}
    activeOpacity={0.7}
  />
)

const styles = StyleSheet.create({
  avatarTitle: {
    color: colors.white,
  },
  avatarBackground: {
    backgroundColor: colors.black,
  },
})

export default CustomMediumAvatar;
