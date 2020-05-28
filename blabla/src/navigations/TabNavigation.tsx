import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { routes } from './routes';
import HomeScreen from '../components/home/HomeScreen';
import SearchScreen from '../components/search/SearchScreen';
import PlayerScreen from '../components/player/PlayerScreen';
import { theme } from '../constants/theme';
import PodcastScreen from '../components/podcast/PodcastScreen';
import { IPodcast } from '../types/Podcast';
import { truncate } from '../helpers/text'
import TabBar from '../components/commons/TabBar';

type HomeStackParams = {
    Home: undefined;
    Podcast: { podcast: IPodcast }
}

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeNavigation:React.FC = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.color.blueLight },
            }}>
            <HomeStack.Screen 
                name="Home" 
                options={{ headerShown: false }} 
                component={HomeScreen} 
            />
            <HomeStack.Screen 
                name="Podcast"
                component={PodcastScreen} 
                options={({ route }) => {
                return {
                    title: truncate(route.params.podcast.trackName, 20)
                }
            }} />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
    return (
        <Tab.Navigator 
            tabBar={(props) => <TabBar {...props} />}
            tabBarOptions={{
                showLabel: false
            }}>
            <Tab.Screen name={routes.SEARCH} component={SearchScreen} />
            <Tab.Screen name={routes.HOME} component={HomeNavigation} />
            <Tab.Screen name={routes.PLAYER} component={PlayerScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigation;