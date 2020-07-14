import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ origin, destination, onReady }) => {
	return (
		<MapViewDirections
			origin={origin}
			destination={destination}
			apikey="GOOGLE_API_KEY"
			onReady={onReady}
			strokeWidth={3}
			strokeColor="#222"
		/>
	);
};

export default Directions;
