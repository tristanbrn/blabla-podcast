import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TrackPlayer from 'react-native-track-player';

import { theme } from '../../constants/theme';
import { itunesApiServices } from '../../services/ItunesApiService';
import { IPodcast } from '../../types/Podcast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../navigations/routes';

import Header from '../commons/Header'
import TrackPlayerServices from '../../services/TrackPlayerServices';

const Divider = () => <Box h={1} w="100%" bg="greyLightest" />;

const PodcastCard: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
    const { navigate } = useNavigation()

    React.useEffect(() => {
        TrackPlayer.setupPlayer().then(async () => {
        
        }).catch(e => console.log('error, e'));

        TrackPlayer.registerPlaybackService( () => TrackPlayerServices)
    }, [])

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
                    <Text size="xs" numberOfLines={1}>
                        {podcast.trackName}
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
    )
}

const HomeScreen: React.FC = () => {
    const [bestPodcast, setBestPodcast] = React.useState<IPodcast[]>([]);
    const [popularPodcasts, setPopularPodcasts] = React.useState<IPodcast[]>([]);
    const [cinemaPodcasts, setCinemaPodcasts] = React.useState<IPodcast[]>([]);
    const [comicPodcasts, setComicPodcasts] = React.useState<IPodcast[]>([]);
    const [musicPodcasts, setMusicPodcasts] = React.useState<IPodcast[]>([]);

    React.useEffect(() => {
        itunesApiServices.searchPodcastByTerm('peloches').then(results => {
            setBestPodcast(results);
        });
        itunesApiServices.searchPodcastById('').then(results => {
            setPopularPodcasts(results);
        });
        itunesApiServices.searchPodcastById('1309').then(results => {
            setCinemaPodcasts(results);
        });
        itunesApiServices.searchPodcastById('1303').then(results => {
            setComicPodcasts(results);
        });
        itunesApiServices.searchPodcastById('1310').then(results => {
            setMusicPodcasts(results);
        });
      }, []);


    return (
        <Box f={1} bg="white">
            <Header title="Découvrir" />
            <ScrollView>
                <Box mt="sm">
                    <Box px="sm" mb="md">
                        <Text size="md" weight="bold">Le meilleur</Text>
                    </Box>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginLeft: theme.space.sm }}
                    >
                        {bestPodcast.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId} />
                        ))}
                    </ScrollView>
                </Box>
                <Divider />
                <Box mt="sm">
                    <Box px="sm" mb="md">
                        <Text size="md" weight="bold">Populaires</Text>
                    </Box>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginLeft: theme.space.sm }}
                    >
                        {popularPodcasts.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId} />
                        ))}
                    </ScrollView>
                </Box>
                <Divider />
                <Box mt="sm">
                    <Box px="sm" mb="md">
                        <Text size="md" weight="bold">Télévision &amp; Cinéma</Text>
                    </Box>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginLeft: theme.space.sm }}
                    >
                        {cinemaPodcasts.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId} />
                        ))}
                    </ScrollView>
                </Box>
                <Divider />
                <Box mt="sm">
                    <Box px="sm" mb="md">
                        <Text weight="bold">Musique</Text>
                    </Box>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginLeft: theme.space.sm }}
                    >
                        {musicPodcasts.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId} />
                        ))}
                    </ScrollView>
                </Box>
                <Divider />
                <Box mt="sm">
                    <Box px="sm" mb="md">
                        <Text weight="bold">Humour</Text>
                    </Box>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginLeft: theme.space.sm }}
                    >
                        {comicPodcasts.map(podcast => (
                            <PodcastCard podcast={podcast} key={podcast.trackId} />
                        ))}
                    </ScrollView>
                </Box>
            </ScrollView>
        </Box>
    )
}

export default HomeScreen;