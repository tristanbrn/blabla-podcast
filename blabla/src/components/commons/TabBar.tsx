import React from 'react';
import { Box } from 'react-native-design-utility';
import { useSafeArea } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Player from './Player';
import { routes } from '../../navigations/routes';
import { metrics } from '../../constants/metrics';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { theme } from '../../constants/theme';

const ICONS = {
    [routes.HOME]: 'home',
    [routes.SEARCH]: 'search',
    [routes.PLAYER]: 'headphones',
}

const TabBar: React.FC<BottomTabBarProps> = props => {
    const insets = useSafeArea();

    const activeTintColor = theme.color.blue;
    const inactiveTintColor = theme.color.greyLight;

    const onTabPress = ( routeName: string, routeIndex: number ) => () => {
        props.navigation.navigate(routeName);
    };

    return (
        <>
            <Player />
            <Box h={50 + insets.bottom} w="100%" bg="#F9F9F9" dir="row">
                {props.state.routes.map((route, index) => {
                    const icon = ICONS[route.name];
                    const color = 
                        props.state.index === index ? activeTintColor : inactiveTintColor;

                     return (
                        <Box key={route.key} f={1} center>
                            <TouchableOpacity
                                style={StyleSheet.tabBtn}
                                onPress={onTabPress(route.name, index)}>
                                <FeatherIcon 
                                    name={icon} 
                                    size={metrics.tabIconSize} 
                                    color={color}
                                />
                            </TouchableOpacity>
                        </Box>
                    );
                })}
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    tabBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default TabBar;