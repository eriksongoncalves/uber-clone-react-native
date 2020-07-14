import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import {
	Back,
	LocationBox,
	LocationText,
	LocationTimeBox,
	LocationTimeText,
	LocationTimeTextSmall,
} from './styles';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import { getPixelSize } from '../../utils';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

Geocoder.init('GOOGLE_API_KEY');

function Map() {
	let mapViewRef = useRef(null);
	const [region, setRegion] = useState({
		latitude: -27.210753,
		longitude: -49.644183,
		latitudeDelta: 0.0143,
		longitudeDelta: 0.0134,
	});
	const [destination, setDestination] = useState(null);
	const [duration, setDuration] = useState(null);
	const [location, setLocation] = useState(null);

	useEffect(() => {
		Geolocation.getCurrentPosition(
			async ({ coords: { latitude, longitude } }) => {
				const response = await Geocoder.from({ latitude, longitude });
				const address = response.results[0].formatted_address;
				const addressLocation = address.substring(0, address.indexOf(','));

				setLocation(addressLocation);

				setRegion({
					latitude,
					longitude,
					latitudeDelta: 0.0143,
					longitudeDelta: 0.0134,
				});
			}, // Sucesso
			() => {}, //Erro
			{
				timeout: 2000,
				enableHighAccuracy: true,
				maximumAge: 1000,
			},
		);
	}, []);

	const handleLocationSelected = useCallback((data, { geometry }) => {
		const {
			location: { lat: latitude, lng: longitude },
		} = geometry;

		const newDestination = {
			latitude,
			longitude,
			title: data.structured_formatting.main_text,
		};

		setDestination(newDestination);
	}, []);

	const handleBack = useCallback(() => {
		setDestination(null);
	}, []);

	return (
		<View style={styles.container}>
			<MapView
				ref={(map) => (mapViewRef = map)}
				style={styles.container}
				region={region}
				showsUserLocation
				loadingEnabled>
				{destination && (
					<>
						<Directions
							origin={region}
							destination={destination}
							onReady={(result) => {
								setDuration(Math.floor(result.duration));

								mapViewRef.fitToCoordinates(result.coordinates, {
									edgePadding: {
										right: getPixelSize(50),
										left: getPixelSize(50),
										top: getPixelSize(50),
										bottom: getPixelSize(350),
									},
								});
							}}
						/>
						<Marker
							coordinate={destination}
							anchor={{ x: 0, y: 0 }}
							image={markerImage}>
							<LocationBox>
								<LocationText>{destination.title}</LocationText>
							</LocationBox>
						</Marker>

						<Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
							<LocationBox>
								<LocationTimeBox>
									<LocationTimeText>{duration}</LocationTimeText>
									<LocationTimeTextSmall>MIN</LocationTimeTextSmall>
								</LocationTimeBox>
								<LocationText>{location}</LocationText>
							</LocationBox>
						</Marker>
					</>
				)}
			</MapView>

			{destination ? (
				<>
					<Back onPress={handleBack}>
						<Image source={backImage} />
					</Back>
					<Details />
				</>
			) : (
				<Search onLocationSelected={handleLocationSelected} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Map;
