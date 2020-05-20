import React from 'react';
import { Box, Text } from 'react-native-design-utility';

interface Props {
    title: String
}

const Header: React.FC<Props> = (props) => {
    return (
        <Box bg="blueLight" h={150} justify="end">
            <Box px="sm">
                <Text size="2xl" color="white">{props.title}</Text>
            </Box>
        </Box>
    )
}

export default Header