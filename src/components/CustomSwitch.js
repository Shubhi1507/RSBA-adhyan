import * as React from 'react';
import {Switch} from 'react-native-paper';
import { COLORS } from '../utils/colors';

export const CustomSwitch = ({isSwitchOn, setIsSwitchOn}) => {
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={COLORS.blue} />;
};
