import React, { useContext } from 'react';
import {
  StyleProp,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ThemeContextData } from 'react-native-theme-component/src/theme-context/context';

export type ProfileCardProps = {
  username?: string;
  lastLoginDateTime?: string;
  avatar?: string;
  onViewProfile?: () => void;
};

export type ProfileCardStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};

const ProfileCard = (props: ProfileCardProps) => {
  const styles = makeStyles(useContext(ThemeContext));

  const getUserNameAcronym = (userName: string) => {
    const arr = userName.split(' ');
    return arr.map((w) => w.charAt(0).toUpperCase()).join('');
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.content}>
        <View>
          {props.avatar ? (
            <Image source={{ uri: props.avatar }} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text>
                {props?.username ? getUserNameAcronym(props?.username) : null}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.userName}>{props.username}</Text>
          <Text style={styles.lastLogin}>{props.lastLoginDateTime}</Text>
        </View>
      </View>
      <View style={styles.actionBtnWrapper}>
        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={props.onViewProfile}
        >
          <Text style={styles.viewProfileBtnTitle}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const makeStyles = (theme: ThemeContextData) =>
  StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 8,
      marginVertical: 15,
    },
    content: {
      flexDirection: 'row',
    },
    infoSection: {
      marginLeft: 10,
      justifyContent: 'space-evenly',
    },
    defaultAvatar: {
      borderRadius: 30,
      width: 60,
      height: 60,
      backgroundColor: '#FFB74C',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    userName: {
      fontFamily: theme.fonts.medium,
      fontSize: 16,
      color: '#000000',
    },
    lastLogin: {
      fontFamily: theme.fonts.regular,
      fontSize: 10,
      color: '#7F7B82',
    },
    acronymUserNameTxt: {
      fontFamily: theme.fonts.medium,
      fontSize: 16,
      color: '#3E2D68',
    },
    actionBtnWrapper: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
    },
    viewProfileBtn: {
      backgroundColor: '#FF9800',
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 5,
      marginVertical: 12,
    },
    viewProfileBtnTitle: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: theme.fonts.medium,
    },
  });

export default ProfileCard;
