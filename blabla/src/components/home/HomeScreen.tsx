import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { theme } from '../../constants/theme';
import { itunesApiServices } from '../../services/ItunesApiService';
import { IPodcast } from '../../types/Podcast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../navigations/routes';

import Header from '../commons/Header'

const Divider = () => <Box h={1} w="100%" bg="greyLightest" />;

const PodcastCard: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}>
            <Box mr="sm" w={150} h={200}>
                <Box 
                  w={150} 
                  h={150} 
                  radius="xs"
                  style={{
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      shadowColor: 'black',
                      shadowRadius: 2
                  }}
                >
                    <Image 
                        style={{ 
                            flex: 1, 
                            borderRadius: theme.radius.xs
                        }} 
                        source={{ uri: podcast.artworkUrl600 }} 
                    />
                </Box>
                <Box f={1} my="xs">
                    <Text size="sm" weight="bold" numberOfLines={1}>
                        {podcast.trackName}
                    </Text>
                </Box>
            </Box>
            <Divider />
        </TouchableOpacity>
    )
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
    const [podcasts, setPodcasts] = React.useState<IPodcast[]>([]);

    React.useEffect(() => {
        itunesApiServices.searchPodcast('parlons').then(results => {
          setPodcasts(results);
        });
      }, []);


    return (
        <Box f={1} bg="white">
            <Header title="Découvrir" />
            <Box>
                <Box px="sm" my="md">
                    <Text weight="bold">Populaires</Text>
                </Box>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: theme.space.sm }}
                >
                    {podcasts.map(podcast => (
                        <PodcastCard podcast={podcast} key={podcast.trackId} />
                    ))}
                </ScrollView>
            </Box>
        </Box>
    )
}

export default HomeScreen;