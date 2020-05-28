import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image, ScrollView } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../constants/theme';

import TrackPlayer from 'react-native-track-player';
import { itunesApiServices } from '../../services/ItunesApiService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { IPodcast } from '../../types/Podcast';
import TrackPlayerServices from '../../services/TrackPlayerServices';
import { routes } from '../../navigations/routes';


interface Props {
    title: String,
    subtitle: String
}
const Picture = require('../../assets/img/tristan.jpg')

const Logo = require('../../assets/img/logo.png')

const PodcastAdvice: React.FC<{ podcast: IPodcast }> = ({ podcast }) => {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigate(routes.PODCAST, { podcast })}>
            <Box dir="row" justify="between">
                <Box 
                  w={120} 
                  h={120} 
                  radius="xs"
                >
                    <Image 
                        style={{ 
                            flex: 1, 
                            borderRadius: theme.radius.xs
                        }} 
                        source={{ uri: podcast.artworkUrl600 }} 
                    />
                </Box>
                <Box pl="sm" f={1} justify="between">
                    <Text size="md" weight="bold" numberOfLines={1}>
                        {podcast.trackName}
                    </Text>
                    <Text size="xs" numberOfLines={3}>
                    Le podcast qui traite du cinéma d'aujourd'hui genre par genre.
                    </Text>
                    <Text size="xs" weight="bold" numberOfLines={1} color="#FF7C46">
                    > 72 épisodes
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
    )
}

const Header: React.FC<Props> = (props) => {
    const [bestPodcast, setBestPodcast] = React.useState<IPodcast[]>([]);

    React.useEffect(() => {
        itunesApiServices.searchPodcastByTerm('peloches').then(results => {
            setBestPodcast(results);
        });
      }, []);


    return (
    <Box>
        <Box 
          bg="#FF7C46"
          h={300}
          dir="col"
          style={{ paddingBottom:70 }}
        >
            <Image 
              resizeMode={'contain'}
              style={{ width: 150, alignSelf: "center" }}
              source={Logo}
            />
            <Box
              dir="row"
              justify="between"
              f={1}
              align="center"
              px={50}
            >
                <Box>
                    <Text size="2xl" color="white" weight="bold">{props.title}</Text>
                    <Text size="sm" color="white">{props.subtitle}</Text>
                </Box>
                <Box bg="white" style={{width: 60, height: 60, borderRadius: 60/ 2}} >
                    <Image 
                      style={{width: 60, height: 60, borderRadius: 60/ 2}}  
                      source={Picture}
                    />
                </Box>
            </Box>
        </Box>
        <Box 
          bg="white" 
          mx="lg" 
          radius="xs" 
          px="sm" 
          py="sm" 
          style={{
            marginTop: -60,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowColor: 'black',
            shadowRadius: 5
          }}
        >
        {bestPodcast.map(podcast => (
            <PodcastAdvice podcast={podcast} key={podcast.trackId} />
        ))}
        </Box>
    </Box>
    )
}

export default Header