import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, Modal, NativeModules } from 'react-native';
import { WebView } from 'react-native-webview';
import { radioStations } from '../config/radioStations';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { styles } from '../components/styles';

const { AudioService } = NativeModules;

const groupStationsByCategory = (stations) => {
    if (!stations || stations.length === 0) {
        return {};
    }
    return stations.reduce((groups, station) => {
        const category = station.isManual ? '手动添加' : station.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(station);
        return groups;
    }, {});
};

const HomeScreen = ({ theme }) => {
    const [selectedStation, setSelectedStation] = useState(null);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
    const [stations, setStations] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useKeepAwake();

    useEffect(() => {
        const handleDimensionsChange = ({ window }) => {
            setScreenWidth(window.width);
        };

        const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (isAboutModalVisible) {
            const timer = setTimeout(() => {
                setIsAboutModalVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isAboutModalVisible]);

    useEffect(() => {
		const fetchStations = async () => {
			try {
				const stationsData = await radioStations();
				setStations(stationsData); // 加载成功后设置电台数据
				setIsLoaded(true);
			} catch (error) {
				console.error('Failed to fetch stations:', error.message);
			}
		};

		if (!isLoaded) {
			fetchStations();
		}
	}, [isLoaded]);


  const handleSelectStation = useCallback(async (station) => {
    setSelectedStation(station);
    //await sendNowPlayingNotification(station.name, handleStopPlayback);
    AudioService.startService(station.name);
  }, []);

  const handleStopPlayback = useCallback(() => {
    setSelectedStation(null);
    //cancelAllNotifications();
    AudioService.stopService();
  }, []);

    const handleScroll = useCallback((event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentGroupIndex(newIndex);
    }, [screenWidth]);

    const handleAboutButtonPress = useCallback(() => {
        setIsAboutModalVisible(true);
    }, []);

    const renderStationItem = useCallback(({ item: station }) => (
        <View style={styles.radioItem}>
            <Image
                source={
                    typeof station.imageUrl === 'string' && station.imageUrl.startsWith('http')
                        ? { uri: station.imageUrl }
                        : station.imageUrl
                }
                style={styles.radioImage}
                resizeMode="contain"
            />
            <Text style={[styles.radioName, { color: theme.primaryColor }]}>
                {station.name}
            </Text>
            <TouchableOpacity onPress={() => handleSelectStation(station)}>
                <FontAwesome name="play-circle" size={26} color={theme.secondaryColor} />
            </TouchableOpacity>
        </View>
    ), [theme, handleSelectStation]);

    const groupedStations = groupStationsByCategory(stations);

    const renderStationGroup = useCallback(({ item: category }) => (
        <View style={[styles.groupContainer, { width: screenWidth }]}>
            <ScrollView>
                <View style={styles.radioGrid}>
                    {groupedStations[category].map((station, index) => (
                        <React.Fragment key={index}>
                            {renderStationItem({ item: station })}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
        </View>
    ), [screenWidth, renderStationItem, groupedStations]);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity style={styles.aboutButton} onPress={handleAboutButtonPress}>
                <Icon name="info" type="feather" size={25} color={theme.primaryColor} />
            </TouchableOpacity>

            {selectedStation && (
                <View style={styles.playerContainer}>
                    <Text style={[styles.stationName, { color: theme.primaryColor }]}>
                        当前播放：{selectedStation.name}
                    </Text>
                    <WebView
                        source={{ uri: selectedStation.iurl }}
                        userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction={false}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState
                        style={styles.webView}
                    />
                </View>
            )}

            <FlatList
                data={Object.keys(groupedStations)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                onScroll={handleScroll}
                renderItem={renderStationGroup}
                scrollEventThrottle={16} // 提高滚动性能
            />

            <View style={styles.indicatorContainer}>
                {Object.keys(groupedStations).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentGroupIndex === index && styles.activeIndicator,
                        ]}
                    />
                ))}
            </View>

            <Modal visible={isAboutModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            source={require('../assets/IMG_20241216_225408.jpg')}
                            style={styles.avatar}
                            resizeMode="contain"
                        />
                        <Text style={[styles.modalTitle, { color: theme.primaryColor }]}>afa收音机2025</Text>
                        <Text style={[styles.modalText, { color: theme.primaryColor }]}>
                            iRadio纪念阿发特别版。
                        </Text>
                        <Text style={[styles.modalTitle, { color: theme.primaryColor }]}>作者</Text>
                        <Text style={[styles.modalText, { color: theme.primaryColor }]}>zhangjinqian</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default React.memo(HomeScreen);