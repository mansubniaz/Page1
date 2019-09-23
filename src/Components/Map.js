import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrentPlace from "./CurrentPlace.js";
import Marker from "./Marker.js";
import RestaurantItem from "./RestaurantItem.js";
import "./Map.css";

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				lat: 48.886202,
				lng: 2.361252
			}
		};
	}

	componentDidMount() {
		this.getLocation();
	}
	getNearbyRestaurants(maps, location) {
		return new Promise((resolve, reject) => {
			const divElmt = document.createElement("div");
			const service = new maps.places.PlacesService(divElmt);
			const request = {
				location: new maps.LatLng(location.lat, location.lng),
				radius: "1500",
				type: ["restaurant"]
			};

			service.nearbySearch(request, (results, status) => {
				let restaurants = [];
				if (status === window.google.maps.places.PlacesServiceStatus.OK) {
					for (let result of results) {
						let restaurant = new RestaurantItem({
							restaurantName: result.name,
							description: result.types[0],
							address: result.vicinity,
							lat: result.geometry.location.lat(),
							long: result.geometry.location.lng(),
							ratings: result.rating,
							place_id: result.place_id
						});
						restaurants.push(restaurant);
					}
					resolve(restaurants);
				} else {
					reject(status);
				}
			});
		});
	}

	apiLoaded = async (map, maps, location) => {
		let results = await this.getNearbyRestaurants(maps, location);
		/* this.setState({ restaurants: results }); */
		this.props.searchBoxSetState(results);
		/* this.handleSearchBox(map); */
	};

	handleSearchBox(map) {
		let input = document.getElementById("search");
		let searchBox = new window.google.maps.places.SearchBox(input);
		map.addListener("bounds_changed", () => {
			searchBox.setBounds(map.getBounds());
		});
		searchBox.addListener("places_changed", () => {
			var places = searchBox.getPlaces();
			let restaurants = [];
			for (let result of places) {
				let restaurant = new RestaurantItem({
					restaurantName: result.name,
					description: result.types[0],
					address: result.formatted_address,
					lat: result.geometry.location.lat(),
					long: result.geometry.location.lng(),
					ratings: result.rating,
					place_id: result.place_id
				});
				restaurants.push(restaurant);
				console.log(restaurants);
			}
			/* this.setState({ restaurants }); */
			this.props.searchBoxSetState(restaurants);
		});
	}

	getLocation() {
		if (navigator.geolocation) {
			const that = this;
			navigator.geolocation.getCurrentPosition(position => {
				const center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				that.setState({ location: center });
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	handleMapClick = e => {
		let lat = e.lat;
		let lng = e.lng;
		console.log(lat, lng);
		let geocoder = new window.google.maps.Geocoder();
		let latlng = { lat, lng };
		geocoder.geocode({ location: latlng }, (results, status) => {
			if (status === "OK") {
				this.props.getLatLng(lat, lng, results[0].formatted_address);
			} else {
				console.error("Geocoder failed due to: " + status);
			}
		});
	};

	/* apiLoaded(map, maps) {
		this.props.apiLoadedCallback(map, maps, this.state.location);
	} */

	createMapOptions() {
		return {
			styles: [
				{
					featureType: "all",
					elementType: "labels.text.fill",
					stylers: [
						{
							saturation: 36
						},
						{
							color: "#000000"
						},
						{
							lightness: 40
						}
					]
				},
				{
					featureType: "all",
					elementType: "labels.text.stroke",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						},
						{
							lightness: 16
						}
					]
				},
				{
					featureType: "all",
					elementType: "labels.icon",
					stylers: [
						{
							visibility: "off"
						}
					]
				},
				{
					featureType: "administrative",
					elementType: "geometry.fill",
					stylers: [
						{
							color: "#0f9324"
						},
						{
							lightness: 20
						},
						{
							visibility: "on"
						}
					]
				},
				{
					featureType: "administrative",
					elementType: "geometry.stroke",
					stylers: [
						{
							color: "#00700a"
						},
						{
							lightness: 17
						},
						{
							weight: 1.2
						},
						{
							visibility: "on"
						}
					]
				},
				{
					featureType: "administrative",
					elementType: "labels.text",
					stylers: [
						{
							color: "#93c991"
						},
						{
							visibility: "simplified"
						}
					]
				},
				{
					featureType: "landscape",
					elementType: "all",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 20
						},
						{
							visibility: "on"
						}
					]
				},
				{
					featureType: "landscape.natural",
					elementType: "geometry.fill",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape.natural.landcover",
					elementType: "geometry",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape.natural.landcover",
					elementType: "geometry.fill",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape.natural.landcover",
					elementType: "geometry.stroke",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape.natural.terrain",
					elementType: "geometry.fill",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "landscape.natural.terrain",
					elementType: "geometry.stroke",
					stylers: [
						{
							visibility: "on"
						},
						{
							color: "#000000"
						}
					]
				},
				{
					featureType: "poi",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 21
						}
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 17
						}
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.stroke",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 29
						},
						{
							weight: 0.2
						}
					]
				},
				{
					featureType: "road.arterial",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 18
						}
					]
				},
				{
					featureType: "road.local",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 16
						}
					]
				},
				{
					featureType: "transit",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 19
						}
					]
				},
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{
							color: "#000000"
						},
						{
							lightness: 17
						}
					]
				}
			]
		};
	}

	render() {
		return (
			<div
				className="map-container col-12 col-lg-8 p-0 order-1 order-lg-2"
				/* title="add restaurant"
				data-toggle="collapse"
				href="#collapseForm"
				role="button"
				aria-expanded="false"
				aria-controls="collapseForm" */
			>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo",
						libraries: "places"
					}}
					center={this.state.location}
					zoom={13}
					onClick={this.handleMapClick}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => {
						this.apiLoaded(map, maps, this.state.location);
						/* this.apiLoaded(map, maps); */
						this.handleSearchBox(map);
					}}
					options={this.createMapOptions}
				>
					{this.props.restaurants.map(restaurant => (
						<Marker
							key={restaurant.name}
							lat={restaurant.lat}
							lng={restaurant.long}
							restaurant={restaurant}
							handleClick={this.props.handleClick}
						/>
					))}
					<CurrentPlace
						lat={this.state.location.lat}
						lng={this.state.location.lng}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}
