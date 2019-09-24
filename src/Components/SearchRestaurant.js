import React, { Component } from "react";
import "./RestaurantForm.css";

export default class RestaurantSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		};
	}
	handleBtnIcon() {
		this.setState(prevState => {
			return {
				isClicked: !prevState.isClicked
			};
		});
	}

	render() {
		return (
			<div>
				<p className="d-flex justify-content-end">
					<i
						onClick={() => this.handleBtnIcon()}
						className={
							this.state.isClicked
								? "fas fa-search-minus"
								: "fas fa-search-plus"
						}
						title="search restaurant"
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
