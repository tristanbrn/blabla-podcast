import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { metrics } from '../../constants/metrics'
import { theme } from '../../constants/theme';
import { useRootStore } from '../../contexts/RootStoreContext';
import { observer } from 'mobx-react';
import { Image } from 'react-native';


const Player: React.FC = () => {
    const { playerStore } = useRootStore();
    console.log(playerStore.currentTrack)

    if(!playerStore.currentTrack) return null;

    return (
        <Box 
            h={70} 
            w="100%" 
            bg="greyLightest"
            dir="row"
            align="center"
            justify="between"
        >
        <Box dir="row" align="center" f={1}>
            <Box w={70} h={70} bg="white" mr="sm">
                {playerStore.currentTrack?.artwork && (
                    <Image 
                        source={{ uri: playerStore.currentTrack?.artwork }}
                        style={{ flex: 1 }}
                    />
                )}
             </Box>
             <Box f={1}>
                <Text size="xs" color="greyDarker" weight="bold" numberOfLines={1}>
                    {playerStore.currentTrack?.artist}
                </Text>
                <Text color="black" numberOfLines={1}>
                    {playerStore.currentTrack?.title}
                </Text>
             </Box>
        </Box>
        <Box dir="row" align="center" justify="end">
            <Box w={50} h={70} justify="center" align="center">
                {playerStore.isPlaying ? (
                <TouchableOpacity
                    hitSlop={metrics.makeHitSlop(20)}
                    onPress={playerStore.pause}
                >
                    <AwesomeIcon color={theme.color.greyDarker} name="pause" size={20} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    hitSlop={metrics.makeHitSlop(20)}
                    onPress={playerStore.play}
                >
                    <AwesomeIcon color={theme.color.greyDarker} name="play" size={20} />
                </TouchableOpacity>
            )}
            </Box>
        </Box>
        </Box>
    )
}

export default observer(Player);