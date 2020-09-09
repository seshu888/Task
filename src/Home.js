import React, { Component } from 'react';
import TestJSON from './TestJSON.json';

import Paper from '@material-ui/core/Paper';
import Calendar from 'react-calendar-multiday';
import Dialog from '@material-ui/core/Dialog';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			viewUsers: false,
			openModal: false,
			selectedUser: null,
			date: null,
			openShowAll: false
		};
	}
	componentDidMount() {
		let userData = TestJSON.members;
		this.setState({ userData: userData });
	}

	handleClick = () => {
		this.setState({ viewUsers: true });
	};
	handleBack = () => {
		this.setState({ viewUsers: false });
	};

	handleOpen = (item) => {
		let todayActivities = [];
		let allActivities = item.activity_periods ? item.activity_periods : [];
		allActivities.forEach((activity) => {
			let day = new Date(activity.start_time.substr(0, 11));
			let today = new Date();
			if (day.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
				todayActivities.push(activity);
			}
		});
		let selectedUser = item;
		selectedUser.todayActivities = todayActivities;
		this.setState({ openModal: true, selectedUser });
	};
	handleClose = () => {
		this.setState({ openModal: false, selectedUser: null });
	};
	onChange = (date) => {
		this.setState({ date: date });
	};
	handleShowAll = () => {
		let { selectedUser } = this.state;
		let activities = selectedUser.activity_periods ? selectedUser.activity_periods : null;
		let selectedDays = [];
		activities.forEach((activity) => {
			let day = new Date(activity.start_time.substr(0, 11));
			selectedDays.push(day);
		});
		selectedUser.selectedDays = selectedDays;
		this.setState({ openShowAll: true, selectedUser });
	};
	handleCalenderClick = (value) => {
		console.log(value);
	};

	render() {
		const { userData, viewUsers, openModal, selectedUser,  openShowAll } = this.state;

		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
				{!viewUsers && (
					<button onClick={this.handleClick}>
						<h1>Check user list</h1>
					</button>
				)}
				{viewUsers && (
					<div>
						<button onClick={this.handleBack} style={{ marginLeft: '20px', padding: '10px' }}>
							Go Back
						</button>
						{userData.map((item, index) => (
							<Paper key={index} style={{ margin: '20px', padding: '30px' }}>
								<p>User Id: {item.id}</p>
								<p>Real Name: {item.real_name}</p>
								<p>Tz: {item.tz}</p>
								<button
									style={{ color: 'white', backgroundColor: 'blue' }}
									onClick={() => this.handleOpen(item)}
								>
									Today Activities
								</button>
							</Paper>
						))}
					</div>
				)}
				<Dialog
                    open={openModal}
                    maxWidth='md'
                    fullWidth={true}
					onClose={this.handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<div style={{ backgroundColor: 'white',width:'100%' }}>
						{selectedUser && (
							<div style={{padding:'50px'}}>
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<h3>{selectedUser.real_name} Today Activities</h3>
								</div>

								{selectedUser.todayActivities && selectedUser.todayActivities.length > 0 ? (
									<React.Fragment>
										{selectedUser.todayActivities.map((item) => (
											<Paper style={{ padding: '20px', margin: '20px' }}>
												<p>Start Time:{item.start_time}</p>
												<p> End Time:{item.start_time}</p>
											</Paper>
										))}
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												flexDirection: 'column'
											}}
										>
											<button
												style={{
													padding: '10px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
												onClick={this.handleShowAll}
											>
												Get All Activities
											</button>
											{openShowAll && (
												<div style={{width:'500px',marginTop:'20px'}}>
													<Calendar
														isMultiple={true}
														reset={false}
														selected={
															selectedUser.selectedDays ? selectedUser.selectedDays : null
														}
														onChange={this.handleCalenderClick}
													/>
												</div>
											)}
										</div>
									</React.Fragment>
								) : (
									<Paper style={{ padding: '20px', margin: '20px' }}>
										<p>No Activities Today</p>
									</Paper>
								)}
							</div>
						)}
					</div>
				</Dialog>
			</div>
		);
	}
}
export default Home;
