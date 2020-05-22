import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { useRoute, RouteProp } from '@react-navigation/native';
import { IPodcast } from '../../types/Podcast';
import { Image, ActivityIndicator } from 'react-native';
import { feedUrlServices } from '../../services/FeedUrlServices';
import { Feed } from 'react-native-rss-parser'
import { metrics } from '../../constants/metrics';
import { theme } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { observer } from 'mobx-react';
import { useRootStore } from '../../contexts/RootStoreContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PodcastScreenRouteProp = RouteProp<
    { Podcast: { podcast: IPodcast } },
    'Podcast'
>;

var frLocale = require('date-fns/locale/fr')

const PodcastScreen: React.FC = () => {
    const { playerStore } = useRootStore();
    const { params } = useRoute<PodcastScreenRouteProp>();
    const [feed, setFeed] = React.useState<Feed | null>(null)

    React.useEffect( () => {
        feedUrlServices.getFeed(params.podcast.feedUrl).then(result => {
            setFeed(result)
        })
    }, [])

    if(!feed) {
        return (
            <Box f={1} bg="white" center>
                <ActivityIndicator color={theme.color.blueDarker} size="large" />
            </Box>
        )
    }

    return (
        <Box f={1} bg="white">
            <Box>
                <ScrollView>
                    <ImageBackground 
                        source={{ uri: params.podcast.artworkUrl600 }} 
                        style={{
                            flex: 1,
                            height: 200,
                            justifyContent: "center",
                            alignContent: "flex-end"
                        }}
                        resizeMode='cover'
                    >
                        <Box 
                            px="sm" 
                            py="sm" 
                            style={{
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                justifyContent: 'flex-end',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <Text weight="bold" numberOfLines={1} color="white">
                                {params.podcast.trackName}
                            </Text>
                            <Text size="xs" color="white" numberOfLines={4}>{feed?.description}</Text>
                        </Box>
                    </ImageBackground>
                    {feed?.items.map(item => (
                        <Box key={item.id}>
                            <Box dir="row" px="sm" h={75} justify="between" align="center">
                                <Box f={1}>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await playerStore.start({
                                                id: item.id,
                                                url: item.enclosures[0].url,
                                                title: item.title,
                                                artist: params.podcast.artistName,
                                                artwork: item.itunes.image,
                                                duration: item.itunes.duration,
                                            });
                                        }}>
                                        <Text numberOfLines={1} weight="bold" size="sm">{item.title}</Text>
                                        <Box dir="row">
                                            <Text color="greyLight" size="xs" weight="bold" mr="sm">{formatDistanceToNow(new Date(item.published), 
                                                {addSuffix: true, locale: frLocale}
                                                )}
                                            </Text>
                                            <Text color="greyLight" size="xs">{item.itunes.duration}</Text>
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                                <Box>
                                    <FeatherIcon name="download-cloud" size={metrics.appIconSize} color={theme.color.grey} />
                                </Box>
                            </Box>
                            <Box h={1} w="100%" bg={theme.color.greyLighter} />
                        </Box>
                    ))}
                </ScrollView>
            </Box>
        </Box>
    );
}

export default observer(PodcastScreen);