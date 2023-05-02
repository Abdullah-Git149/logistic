import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData } from '../../actions/userAction';
// import axios from 'axios';
import { AiFillAndroid, BsApple, FaUsers, FaUsersSlash, RiUserSharedFill, RiUserStarFill } from 'react-icons/all';
import { askForPermissioToReceiveNotifications } from '../../firebase';


const Dashboard = () => {


	const dispatch = useDispatch();
	const { dashboard } = useSelector((state) => state.userReducer);


	console.log("dashboard", dashboard)


	useEffect(() => {
		// dispatch(dashboardData());
		//    getagencydashboard()
	}, [dashboardData])


	return (
		<div className="container-fluid">
			<div className="block-header">
				<div className="row clearfix">
					<div className="col-md-6 col-sm-12">
						<h1>Welcome to Logistic</h1>
					</div>
				</div>
			</div>
			{/* <div className="row clearfix">
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="body">
							<div className="d-flex align-items-center">
								<div className="icon-in-bg text-white rounded-circle" style={{ backgroundColor: '#952B23' }}> <FaUsers style={{ fontSize: "25px" }} /> </div>
								<div className="ml-4">
									<span>Total Users</span>
									<h4 className="mb-0 font-weight-medium">{dashboard ? dashboard.users : 0} </h4>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="body">
							<div className="d-flex align-items-center">
								<div className="icon-in-bg text-white rounded-circle" style={{ backgroundColor: '#952B23' }}><RiUserStarFill style={{ fontSize: "25px" }} /></div>
								<div className="ml-4">
									<span>Orders</span>
									<h4 className="mb-0 font-weight-medium">{dashboard ? dashboard.order : 0} </h4>

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="body">
							<div className="d-flex align-items-center">
								<div className="icon-in-bg text-white rounded-circle" style={{ backgroundColor: '#952B23' }}><AiFillAndroid style={{ fontSize: "25px" }} /></div>
								<div className="ml-4">
									<span>Android Users</span>
									<h4 className="mb-0 font-weight-medium">{dashboard ? dashboard.android : 0} </h4>

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="body">
							<div className="d-flex align-items-center">
								<div className="icon-in-bg text-white rounded-circle" style={{ backgroundColor: '#952B23' }}><BsApple style={{ fontSize: "20px" }} /></div>
								<div className="ml-4">
									<span>IOS Users</span>
									<h4 className="mb-0 font-weight-medium">	{dashboard ? dashboard.ios : 0}  </h4>

								</div>
							</div>
						</div>
					</div>
				</div>


			</div> */}
		 


		</div>
	);

}
export default Dashboard
