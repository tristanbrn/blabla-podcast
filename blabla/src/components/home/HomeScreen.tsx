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

const Divider = () => <Box h={1} w="100%" bg="greyLightest" />;

const PodcastTitle: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
    const { navigate } = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}>
            <Box dir="row" align="center">
                <Box w={100} h={100} radius="xs" mr="sm">
                    <Image 
                        style={{ 
                            flex: 1, 
                        }} 
                        source={{ uri: podcast.artworkUrl100 }} 
                    />
                </Box>
                <Box f={1}>
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
            <Box>
                <ScrollView>
                    {podcasts.map(podcast => (
                        <PodcastTitle podcast={podcast} key={podcast.trackId} />
                    ))}
                </ScrollView>
            </Box>
        </Box>
    )
}

export default HomeScreen;