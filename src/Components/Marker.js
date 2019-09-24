import React, { Component } from "react";
import "./Marker.css";

export default class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMarker: "marker"
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e, restaurant) {
		/* this.props.handleClick(this.props.restaurant); */
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker hvr-grow";
		}
		let element = e.target;
		element.classList.toggle("targeted-marker");
		if (restaurant.place_id) {
			this.handleDetailsRequest(restaurant);
		} else {
			this.props.handleClick(this.props.restaurant);
		}
	}

	handleDetailsRequest(restaurant) {
		var request = {
			placeId: restaurant.place_id,
			fields: [
				"name",
				"rating",
				"formatted_phone_number",
				"reviews",
				"photos",
				"opening_hours",
				"website",
				"price_level",
				"user_ratings_total"
			]
		};

		const callback = (place, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				restaurant.reviews = place.reviews;
				restaurant.photos = place.photos;
				restaurant.phone = place.formatted_phone_number;
				restaurant.website = place.website;
				restaurant.user_ratings_total = place.user_ratings_total;
				{
					place.opening_hours
						? (restaurant.isOpen = place.opening_hours.open_now)
						: (restaurant.isOpen = null);
				}
				{
					place.opening_hours
						? (restaurant.weekday_text = place.opening_hours.weekday_text)
						: (restaurant.weekday_text = null);
				}
				this.props.handleClick(this.props.restaurant);
			} else {
				console.log(`Error: ${status}`);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback);
	}

	/* handleMouseOver() {
		return <p>{this.props.restaurant.name}</p>;
	} */

	render() {
		/* 		const styleAtt = {
			width: "10rem",
			position: "relative",
			top: "-20px",
			left: "-60px",
			zIndex: "1"
		}; */
		return (
			<div
				className="marker hvr-grow"
				id={this.props.restaurant.id}
				onClick={e => this.handleClick(e, this.props.restaurant)}
				title={this.props.restaurant.name}
			>
				{/* <div className="name text-center" style={styleAtt}>
						<p>{this.props.restaurant.name}</p>
					</div> */}
				{/* <div class="test card" style={styleAtt}>
						<div class="card-body">
							<h5 class="card-title">{this.props.restaurant.name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								{this.props.restaurant.description}
							</h6>
							<a href="#" class="card-link">
								Card link
							</a>
							<a href="#" class="card-link">
								Another link
							</a>
						</div>
					</div> */}
			</div>
		);
	}
}
