
import React, {useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  Pressable,
  Dimensions,
  Image,
  Alert,
  Modal,
} from 'react-native';

const map_icon1 = require('./map_icon1.png');
const map_icon2 = require('./map_icon2.png');
const map_icon3 = require('./map_icon3.png');
const map_icon4 = require('./map_icon4.png');

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  CommonActions,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SelectList} from 'react-native-dropdown-select-list';

import {db} from './firebase-config.js';
import {onValue, push, ref, update, remove, set} from 'firebase/database';
import {getStorage, ref as sref, uploadBytesResumable} from 'firebase/storage';

import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Overlay,
  Region,
  Heatmap,
  Polyline,
  Polygon,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {WebView} from 'react-native-webview';

import RNRestart from 'react-native-restart';

import {TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reload} from 'firebase/auth';
import {enableScreens} from 'react-native-screens';

import {writeFile, readFile, DocumentDirectoryPath} from 'react-native-fs';

const bbmp_wards = require('./bbmp_final_new_wards.json');
const bbmp_wards_list = require('./bbmp_ward_list.json');

// Extract ward names for the dropdown using name_en
const wardDropdownData = bbmp_wards_list.features
  .map((feature: any, index: number) => ({
    key: index.toString(),
    value: feature.properties?.name_en || `Ward ${index + 1}`,
  }))
  .filter((ward: any) => ward.value); // Ensure valid ward names

wardDropdownData.push({
  key: (wardDropdownData.length + 1).toString(),
  value: 'Other',
});


function loaddata(
    category: string,
    setCount: React.Dispatch<
      React.SetStateAction<{
        lat: string[];
        long: string[];
        time: string[];
        description: string[];
      }>
    >,
  ) {
    return onValue(ref(db, '/' + category), querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let lat = Object.keys(data).map(key => data[key].latitude);
      let long = Object.keys(data).map(key => data[key].longitude);
      let time = Object.keys(data).map(key => data[key].time);
      let description = Object.keys(data).map(key => data[key].description);
      setCount({lat, long, time, description});
    });
  }

  
type Report = {
    latitude: number;
    longitude: number;
    category: string;
  };
  type Props = {
    route: MapScreenRouteProp;
    navigation: MapScreenNavigationProp;
  };
  
  function Page1({route, navigation}: Props): React.JSX.Element {
    // Add this line with your other state/ref declarations
    const scrollViewRef = useRef(null);
    
    let location = {
      latitude: 12.971599,
      longitude: 77.594566,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    let report: Report | undefined;
    if (route.params && route.params.report !== undefined) {
      report = route.params.report;
      location = {
        latitude: report.latitude,
        longitude: report.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    const isDarkMode = false;
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    const [selected, setSelected] = useState<string | undefined>();
  
    const data = [
      {key: '1', value: 'LITTERING', disabled: true},
      {key: '2', value: 'Littering', color: '#ffcad4'},
      {key: '3', value: 'Open Dump', color: '#ffe5d9'},
      {key: '4', value: 'Other Waste', color: '#d8e2dc'},
      {key: '5', value: 'Electricity Outage', color: '#bbbbbb'},
      {key: '6', value: 'Other', disabled: true},
      {key: '7', value: 'Delayed Construction', disabled: true},
    ];
    const [shouldShow, setShouldShow] = useState(false);
  
    useEffect(() => {
      if (route.params && route.params.report) {
        setSelected(route.params.report.category);
      }
    }, [route.params]);
  
    const [challenge, setCount] = useState<{
      lat: string[];
      long: string[];
      time: string[];
      description: string[];
    }>({lat: [], long: [], time: [], description: []});
  
    const handleReset = () => {
      loaddata('', setCount);
      setShouldShow(false);
      // Navigate to the same screen with new parameters
      navigation.setParams({report: undefined});
    };
  
    useEffect(() => {
      if (shouldShow) {
        loaddata(selected ? selected : '', setCount);
      } else {
        setCount({lat: [], long: [], time: [], description: []});
      }
    }, [shouldShow]);
  
    useFocusEffect(
      React.useCallback(() => {
        const onTabBlur = () => {
          handleReset();
        };
  
        return onTabBlur;
      }, []),
    );
  
    const [heatmapgenerated, setHeatmapGenerated] = useState(false);
  
    const generateheatmap = () => {
      setHeatmapGenerated(true);
  
      // Create a mapping of wards to report counts
      const wardReportCounts = {};
  
      // Process each report and assign to appropriate ward
      challenge.lat.forEach((lat, index) => {
        const reportPoint = {
          latitude: parseFloat(lat),
          longitude: parseFloat(challenge.long[index]),
        };
  
        // Find which ward this report belongs to
        wardData.forEach((ward, wardIndex) => {
          if (isPointInPolygon(reportPoint, ward.coordinates)) {
            // Initialize or increment the count for this ward
            if (!wardReportCounts[wardIndex]) {
              wardReportCounts[wardIndex] = {
                ward: ward,
                count: 1,
              };
            } else {
              wardReportCounts[wardIndex].count += 1;
            }
          }
        });
      });
  
      // Convert the mapping to an array for rendering
      const heatmapData = Object.values(wardReportCounts);
      setWardHeatmapData(heatmapData);
    };
  
    const [wardHeatmapData, setWardHeatmapData] = useState([]);
  
    const [region, setRegion] = useState(location);
    const handleRegionChange = (updatedRegion: Region) => {
      setRegion(updatedRegion);
    };
    const getReportsInRegion = () => {
      return challenge.lat
        .map((value, index) => ({
          lat: parseFloat(value),
          long: parseFloat(challenge.long[index]),
          time: challenge.time[index],
          description: challenge.description[index],
          ...challenge[index],
        }))
        .filter(
          report =>
            report.lat > region.latitude - region.latitudeDelta / 2 &&
            report.lat < region.latitude + region.latitudeDelta / 2 &&
            report.long > region.longitude - region.longitudeDelta / 2 &&
            report.long < region.longitude + region.longitudeDelta / 2,
        );
    };
  
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
  
    const openReportModal = report => {
      setSelectedReport(report);
      setModalVisible(true);
    };
  
    const [wardData, setWardData] = useState([]);
  
    useEffect(() => {
      const features = bbmp_wards.features
        .filter(
          (feature: any) =>
            feature.geometry &&
            feature.geometry.coordinates &&
            feature.geometry.coordinates[0],
        )
        .map((feature: any) => {
          const coordinates = feature.geometry.coordinates[0]
            .filter(
              (coord: any) =>
                Array.isArray(coord) &&
                coord.length === 2 &&
                !isNaN(coord[0]) &&
                !isNaN(coord[1]),
            )
            .map((coord: any) => ({
              latitude: coord[1], // GeoJSON format: [longitude, latitude]
              longitude: coord[0],
            }));
  
          if (coordinates.length === 0) return null; // Skip invalid features
  
          // Calculate centroid for placing label
          let latSum = 0,
            lngSum = 0;
          coordinates.forEach((point: any) => {
            latSum += point.latitude;
            lngSum += point.longitude;
          });
  
          return {
            name: feature.properties?.name || 'Unknown',
            coordinates,
            centroid: {
              latitude: latSum / coordinates.length,
              longitude: lngSum / coordinates.length,
            },
          };
        })
        .filter((ward: any) => ward !== null); // Remove null entries
  
      setWardData(features);
    }, []);
  
    function isPointInPolygon(point: any, polygon: any) {
      // Ray casting algorithm
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;
  
        const intersect =
          yi > point.longitude !== yj > point.longitude &&
          point.latitude < ((xj - xi) * (point.longitude - yi)) / (yj - yi) + xi;
  
        if (intersect) inside = !inside;
      }
  
      return inside;
    }
  
    const localDataFilePath = `${DocumentDirectoryPath}/localdata.json`;
  
    const loadLocalData = async () => {
      try {
        const fileContent = await readFile(localDataFilePath, 'utf8');
        const parsedData = JSON.parse(fileContent);
        setCount(parsedData);
      } catch (error) {
        console.error('Error reading local data file:', error);
      }
    };

  
    useEffect(() => {
      loadLocalData();
    }, []);
  
    // Add these new state variables with your other state declarations
    const [markerModalVisible, setMarkerModalVisible] = useState(false);
    const [selectedMarkerData, setSelectedMarkerData] = useState(null);
    const [showPins, setShowPins] = useState(true); // State to toggle pin visibility
  
    const hideMapPins = () => {
      setShowPins(!showPins); // Toggle the state
    };
  
    return (
      <SafeAreaView
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={{margin: 10, marginBottom: 0}}>
            <Text style={styles.sectionTitle}>DISCOVER COMMUNITY CHALLENGES</Text>
          </View>
          <View style={styles.categoryButtonContainer}>
            {data
              .filter(item => !item.disabled)
              .map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.categoryButton,
                    selected === item.value ? styles.categoryButtonSelected : {},
                    item.color ? {backgroundColor: item.color} : {}, // Use the color property if available
                  ]}
                  onPress={() => {
                    setSelected(item.value);
                    setHeatmapGenerated(false); // Clear the heatmap when category changes
                    // Load data and show map immediately when a category is selected
                    loaddata(item.value, setCount);
                    setShouldShow(true);
                    // Reset other parameters as needed
                    navigation.setParams({report: undefined});
                  }}>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selected === item.value
                        ? styles.categoryButtonTextSelected
                        : {},
                    ]}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
  
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {!shouldShow ? (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width,
                  padding: 25,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (selected === undefined) {
                      Alert.alert('Please select a category to view the map.');
                      return;
                    }
                    loaddata(selected ? selected : '', setCount),
                      setShouldShow(true);
                  }}
                  style={{
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>VIEW MAP</Text>
                  <Icon name="map" size={50} color="white" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
  
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {shouldShow ? (
              <>
                <MapView
                  ref={mapRef => (this.mapView = mapRef)}
                  style={styles.mapwidget}
                  initialRegion={{
                    latitude: 12.9716,  // Bengaluru center latitude
                    longitude: 77.5946, // Bengaluru center longitude
                    latitudeDelta: 0.25, // Adjust these values to get the right zoom level
                    longitudeDelta: 0.25,
                  }}
                  minZoomLevel={10} // Prevent zooming out too far
                  maxZoomLevel={18} // Limit maximum zoom
                  onRegionChangeComplete={handleRegionChange}>
                  {showPins && // Conditionally render pins based on `showPins`
                    challenge.lat.length > 0 &&
                    challenge.lat.map((value: string, index: number) => (
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: parseFloat(value),
                          longitude: parseFloat(challenge.long[index]),
                        }}
                        
                        onPress={() => {
                          // When marker is pressed, store report data and show modal
                          setSelectedMarkerData({
                            lat: parseFloat(value),
                            long: parseFloat(challenge.long[index]),
                            time: challenge.time[index],
                            description: challenge.description[index],
                            category: selected,
                            // Find the ward this report belongs to
                            ward: wardData.find(ward => 
                              isPointInPolygon(
                                {
                                  latitude: parseFloat(value),
                                  longitude: parseFloat(challenge.long[index])
                                },
                                ward.coordinates
                              )
                            )?.name || 'Unknown area'
                          });
                          setMarkerModalVisible(true);
                        }}
                      />
                    ))}
                  {heatmapgenerated &&
                    wardHeatmapData.map((data, index) => {
                      // Calculate opacity based on report count
                      let opacity = 0;
                      const count = data.count;
                      const heatmapweightRef = ref(db, '/heatmapweight');
                      let heatmapweight = 1; // Default value
                      onValue(heatmapweightRef, snapshot => {
                        const value = snapshot.val();
                        if (value && Number.isInteger(value)) {
                          heatmapweight = value;
                        }
                      });
  
                      if (count <= 1 * heatmapweight) opacity = 0.05;
                      else if (count <= 2 * heatmapweight) opacity = 0.2;
                      else if (count <= 3 * heatmapweight) opacity = 0.35;
                      else if (count <= 4 * heatmapweight) opacity = 0.5;
                      else if (count <= 5 * heatmapweight) opacity = 0.65;
                      else if (count <= 6 * heatmapweight) opacity = 0.75;
                      else if (count <= 7 * heatmapweight) opacity = 0.85;
                      else if (count >= 8 * heatmapweight) opacity = 0.9;
  
                      // Render polygon with appropriate opacity
                      return (
                        <Polygon
                          key={`ward-heat-${index}`}
                          coordinates={data.ward.coordinates}
                          strokeWidth={1}
                          strokeColor={'rgba(204, 68, 75, 0.8)'}
                          fillColor={`rgba(204, 68, 75, ${opacity})`}
                        />
                      );
                    })}
  
                  {/* Keep the normal ward boundaries rendering */}
                  {wardData.map((ward, index) => (
                    <React.Fragment key={index}>
                      <Polygon
                        coordinates={ward.coordinates}
                        strokeWidth={1}
                        strokeColor="rgba(0, 76, 255, 0.3)"
                      />
                    </React.Fragment>
                  ))}
                </MapView>
                
                {/* Add a center button */}
                <TouchableOpacity 
                  style={styles.centerMapButton}
                  onPress={() => {
                    if (this.mapView) {
                      this.mapView.animateToRegion({
                        latitude: 12.9716,  // Bengaluru center
                        longitude: 77.5946,
                        latitudeDelta: 0.25,
                        longitudeDelta: 0.25,
                      }, 1000); // 1000ms animation
                    }
                  }}>
                  <Icon name="location-arrow" size={20} color="#fff" />
                </TouchableOpacity>
              </>
            ) : null}
            {shouldShow ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={generateheatmap}>
                  <Text style={styles.actionButtonText}>Generate Heatmap</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={hideMapPins}>
                  <Text style={styles.actionButtonText}>
                    {showPins ? 'Hide Pins' : 'Show Pins'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {/* Add Ward Selection Dropdown */}
            {shouldShow && wardData.length > 0 ? (
              <View style={styles.wardSelectionContainer}>
                <Text style={styles.wardSelectionTitle}>Select a ward to zoom in:</Text>
                <SelectList
                  setSelected={(value) => {
                    // Find the selected ward
                    const selectedWard = wardData.find((ward) => ward.name === value);
                    if (selectedWard && this.mapView) {
                      // Create a padding for the bounds
                      const padding = 0.01;
                      
                      // Calculate the min/max bounds of the ward
                      let minLat = Number.MAX_VALUE, maxLat = Number.MIN_VALUE;
                      let minLng = Number.MAX_VALUE, maxLng = Number.MIN_VALUE;
                      
                      selectedWard.coordinates.forEach(coord => {
                        minLat = Math.min(minLat, coord.latitude);
                        maxLat = Math.max(maxLat, coord.latitude);
                        minLng = Math.min(minLng, coord.longitude);
                        maxLng = Math.max(maxLng, coord.longitude);
                      });
                      
                      // Animate to the region with bounds
                      this.mapView.animateToRegion({
                        latitude: (minLat + maxLat) / 2,
                        longitude: (minLng + maxLng) / 2,
                        latitudeDelta: (maxLat - minLat) + padding * 2,
                        longitudeDelta: (maxLng - minLng) + padding * 2,
                      }, 1000);
                    }
                  }}
                  data={wardData.map((ward, index) => ({
                    key: index.toString(),
                    value: ward.name
                  }))}
                  save="value"
                  placeholder="Select a ward"
                  boxStyles={styles.wardDropdownBox}
                  dropdownStyles={styles.wardDropdown}
                  search={true}
                  searchPlaceholder="Search for ward"
                />
              </View>
            ) : null}
          </View>
  
          <View>
            {shouldShow ? (
              <View style={styles.reportCountContainer}>
                {challenge.lat.length > 0 ? (
                  <Text style={styles.reportCountText}>
                    Number of reports submitted by users in this category:{' '}
                    <Text style={styles.reportCountNumber}>
                      {challenge.lat.length}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.reportCountText}>
                    No problems reported in this category.
                  </Text>
                )}
              </View>
            ) : null}
          </View>
          <View>
            {report ? (
              <View>
                <Text>
                  User Report Selected {report.category} Latitude:{' '}
                  {report.latitude} Longitude {report.longitude}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.containernofill}>
            {getReportsInRegion().length === 0 ? (
              <Text style={styles.noReportsText}>No reports in this region</Text>
            ) : (
              // Update the View that contains the reports
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={styles.headerText}>Reports in this region:</Text>
                {getReportsInRegion()
                  .slice()
                  .reverse()
                  .map((report, index) => {
                    // Find which ward this report belongs to
                    const reportWard = wardData.find(ward => {
                      return isPointInPolygon(
                        {latitude: report.lat, longitude: report.long},
                        ward.coordinates,
                      );
                    });
  
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          // 1. First scroll to the top of the page to make map visible
                          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                          
                          // 2. After a short delay to allow the scroll to complete, zoom to the pin
                          setTimeout(() => {
                            if (this.mapView) {
                              // Animate to the report location
                              this.mapView.animateToRegion({
                                latitude: report.lat,
                                longitude: report.long,
                                latitudeDelta: 0.01, // Closer zoom than the default
                                longitudeDelta: 0.01,
                              }, 1000);
                            }
                          }, 600); // Delay to let scroll complete
                        }}
                        style={styles.reportItem}>
                        <View style={styles.reportHeader}>
                          <Text style={styles.reportDate}>
                            {new Date(report.time).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Text>
                          <Text style={styles.reportNumber}>#{index + 1}</Text>
                        </View>
  
                        <View style={styles.reportLocation}>
                          <Icon
                            name="map-marker"
                            size={16}
                            color="#2196F3"
                            style={styles.locationIcon}
                          />
                          <Text style={styles.locationText}>
                            {reportWard ? reportWard.name : 'Unknown area'}
                          </Text>
                        </View>
  
                        {report.description && report.description !== 'nil' && (
                          <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionLabel}>
                              Description:
                            </Text>
                            <Text style={styles.reportDescription}>
                              {report.description}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            
          </Modal>
  
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={markerModalVisible}
            onRequestClose={() => {
              setMarkerModalVisible(false);
            }}>
            <View style={styles.markerModalCenteredView}>
              <View style={styles.markerModalView}>
                {selectedMarkerData && (
                  <>
                    <Text style={styles.markerModalTitle}>Report Details</Text>
                    
                    <View style={styles.markerModalSection}>
                      <Text style={styles.markerModalLabel}>Category:</Text>
                      <Text style={styles.markerModalValue}>{selectedMarkerData.category}</Text>
                    </View>
                    
                    <View style={styles.markerModalSection}>
                      <Text style={styles.markerModalLabel}>Location:</Text>
                      <Text style={styles.markerModalValue}>{selectedMarkerData.ward}</Text>
                    </View>
                    
                    <View style={styles.markerModalSection}>
                      <Text style={styles.markerModalLabel}>Date:</Text>
                      <Text style={styles.markerModalValue}>
                        {new Date(selectedMarkerData.time).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                    
                    <View style={styles.markerModalSection}>
                      <Text style={styles.markerModalLabel}>Coordinates:</Text>
                      <Text style={styles.markerModalValue}>
                        {selectedMarkerData.lat.toFixed(6)}, {selectedMarkerData.long.toFixed(6)}
                      </Text>
                    </View>
                    
                    {selectedMarkerData.description && selectedMarkerData.description !== 'nil' && (
                      <View style={styles.markerModalSection}>
                        <Text style={styles.markerModalLabel}>Description:</Text>
                        <Text style={styles.markerModalValue}>{selectedMarkerData.description}</Text>
                      </View>
                    )}
                    
                    {selectedMarkerData.image && selectedMarkerData.image !== 'nil' && (
                      <View style={styles.markerModalImageContainer}>
                        <Image
                          source={{ uri: selectedMarkerData.image }}
                          style={styles.markerModalImage}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </>
                )}
                
                <View style={styles.markerModalButtonContainer}>
                  <TouchableOpacity
                    style={styles.markerModalButton}
                    onPress={() => setMarkerModalVisible(false)}>
                    <Text style={styles.markerModalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
  