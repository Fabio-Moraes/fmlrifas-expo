import React, {
    useRef,
    useState,
    useEffect
} from 'react'

import {
    Text,
    Animated,
    TouchableOpacity,
    View
} from 'react-native'

import { useContexState } from '../../../hooks/context';
import { styles } from './styles'

export function Alert() {
    const {
        setAlertActive,
    } = useContexState();

    const {
        alertMessage,
        alertActive
    } = useContexState();

    const [active, setActive] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    function AnimatedAlert(value: boolean) {
        setActive(true);
        Animated.timing(fadeAnim, {
            toValue: value ? 1 : 0,
            duration: 700,
        } as Animated.TimingAnimationConfig).start(() => {
            if (!value) {
                setActive(false)
            };
        });
    };

    useEffect(() => {
        AnimatedAlert(alertActive);
    }, [alertActive]);

    return active ? <>
        <TouchableOpacity
            onPress={() => setAlertActive(false)}
            style={styles.containeMain} />
        <Animated.View style={[styles.container, { opacity: fadeAnim }]} >
            <Text style={styles.listText}>{alertMessage}</Text>
        </Animated.View>
    </> : <View />
};