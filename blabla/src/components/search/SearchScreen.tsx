import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { SearchBar } from 'react-native-elements';
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

const SearchScreen: React.FC = () => {
    const [search, setSearch] = React.useState(null)

    React.useEffect( () => {
        console.log(search)
    }, [search])

    return (
        <Box f={1} bg="white">
            <Header title="Rechercher" />
            {/* <SearchBar
                placeholder="Type Here..."
                onChangeText={() => {
                    setSearch(search)
                }
                }
                value={search}
            /> */}
        </Box>
    )
}

export default SearchScreen;