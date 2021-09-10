/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MarkerData from './landmarks.json';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiY2hhaXRhbnlhMzYwIiwiYSI6ImNrdGNscHhnNjI2eTUydWxhczYwdGJqNm8ifQ.zile5mfXGtL1tRF6MdWLNg',
);

const Marker = ({marker, handleOnMarkerClick}) => (
  <MapboxGL.MarkerView
    key={marker.id}
    id={marker.id}
    title="Test"
    coordinate={marker.co}>
    {
      <TouchableNativeFeedback onPress={() => handleOnMarkerClick(marker)}>
        <View
          style={{
            alignItems: 'center',
            width: 40,
            height: 40,
          }}>
          <Image
            source={require('./images/marker.png')}
            style={{width: 40, height: 40, resizeMode: 'contain'}}
          />
        </View>
      </TouchableNativeFeedback>
    }
  </MapboxGL.MarkerView>
);

const Info = ({marker, setShowInfo}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginLeft: '10%',
      }}>
      <View style={{position: 'absolute', right: 0}}>
        <TouchableNativeFeedback onPress={() => setShowInfo(false)}>
          <Text
            style={{
              color: 'tomato',
              padding: 5,
              fontSize: 20,
              transform: [{scaleY: 0.8}],
            }}>
            X
          </Text>
        </TouchableNativeFeedback>
      </View>
      <View
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Image
          source={{uri: marker.image}}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            borderRadius: 5,
          }}
        />
        <Text style={{fontSize: 20, color: 'tomato', fontWeight: '700'}}>
          {marker.id}
        </Text>
        <Text style={{fontSize: 20, color: 'dodgerblue', fontWeight: '700'}}>
          {marker.country}
        </Text>
        <Text style={{fontSize: 13, opacity: 0.9}}>{marker.description}</Text>
      </View>
    </View>
  );
};

const App = () => {
  const [markers, setMarkers] = useState([
    // {
    //   co: [103.9897593, 1.3602082],
    //   id: 'one',
    // },
    // {
    //   co: [103.8605974, 1.2876834],
    //   id: 'one',
    // },
  ]);

  const [showInfo, setShoInfo] = useState(false);

  useEffect(() => {
    const landmarks = [];
    MarkerData.data.allLandmarks.forEach(landMark => {
      landmarks.push({
        co: [landMark.location.longitude, landMark.location.latitude],
        id: landMark.name,
        image: landMark.images[0].url,
        name: landMark.name,
        country: landMark.country,
        city: landMark.city,
        description: landMark.description,
      });
    });
    setMarkers(landmarks);
  }, []);

  const dimensions = useWindowDimensions();
  return (
    <View style={styles.page}>
      <View style={{height: dimensions.height, width: dimensions.width}}>
        <MapboxGL.MapView style={styles.map}>
          {markers.map(marker => (
            <Marker
              handleOnMarkerClick={clickedMarker => setShoInfo(clickedMarker)}
              marker={marker}
              key={marker.id}
            />
          ))}
          <MapboxGL.Camera
            zoomLevel={9}
            animationMode={'flyTo'}
            animationDuration={1100}
            centerCoordinate={[103.9897593, 1.3602082]}
          />
        </MapboxGL.MapView>
        {showInfo && <Info marker={showInfo} setShowInfo={setShoInfo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 400,
    width: 400,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default App;
