import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { theme } from '../../constants/theme';

const PodcastCard: React.FC = () => {
    return <Box w={100} h={100} radius={4} bg="red" mr="sm" />
}

const Category: React.FC<{ color: string, icon: string }> = ({ color, icon }) => {
    const bg = `${color}50`;
    return ( 
        <Box center w={75} mr="sm" mb="2xs">
            <Box circle={75} bg={bg} center>
                <FeatherIcon name={icon} size={25} color={color} />
            </Box>
            <Box>
                <Text size="xs">Cinéma</Text>
            </Box>
        </Box>
    )
}

const HomeScreen: React.FC = () => {
    return (
        <Box f={1} bg="white">
            <Box mt={100} mb="sm">
                <Box ml="sm" mb="sm">
                    <Text size="xl" weight="bold">Populaires</Text>
                </Box>
                <ScrollView contentContainerStyle={{marginLeft: theme.space.sm}} horizontal showsHorizontalScrollIndicator={false}>
                    <PodcastCard />
                    <PodcastCard />
                    <PodcastCard />
                    <PodcastCard />
                    <PodcastCard />
                </ScrollView>
            </Box>
            <Box>
                <Box ml="sm" mb="sm">
                    <Text size="xl" weight="bold">Catégories</Text>
                </Box>
                <ScrollView contentContainerStyle={{marginLeft: theme.space.sm}} horizontal showsHorizontalScrollIndicator={false}>
                    <Category icon="heart" color={theme.color.red} />
                    <Category icon="heart" color={theme.color.red} />
                    <Category icon="heart" color={theme.color.red} />
                    <Category icon="heart" color={theme.color.red} />
                    <Category icon="heart" color={theme.color.red} />
                </ScrollView>
            </Box>
        </Box>
    )
}

export default HomeScreen;