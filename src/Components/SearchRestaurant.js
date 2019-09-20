import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem.js";
import StarRatingComponent from "react-star-rating-component";
import "./RestaurantForm.css";

export default class RestaurantSearch extends Component {
	/* handleClick(e) {
        e.preventDefault();
        
	} */

	render() {
		return (
			<div>
				<p className="d-flex justify-content-end">
					<i
						/* onClick={() => this.handleBtnIcon()} */
						className={"fas fa-search"}
						title="add restaurant"
						data-toggle="collapse"
						href="#collapseSearch"
						role="button"
						aria-expanded="false"
						aria-controls="collapseForm"
						/* onClick={this.handleSearchBox} */
					></i>
				</p>

				<div className="row mb-2 collapse" id="collapseSearch">
					<div className="col" /* onClick={this.handleClick} */>
						<input
							type="text"
							className="form-control"
							id="search"
							placeholder="Search a restaurant.."
						/>
						{/* <button type="submit">search</button> */}
					</div>
				</div>
			</div>
		);
	}
}
