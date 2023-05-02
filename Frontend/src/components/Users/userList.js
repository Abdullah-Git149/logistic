// import React, { useEffect, useState } from 'react';
// import { MDBDataTableV5 } from 'mdbreact';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminApproval, userlist } from '../../actions/userAction';
// // import { allOrders, cancelOrder, changeOrderStatus } from '../../actions/orderAction';  /// for avoiding load order list to see orders
// import toast, { Toaster } from 'react-hot-toast';
// import { allUsers, blockUser, unblockUser } from "../../actions/adminAction";

// const UserList = () => {

// 	const { userList, blockuser, unBlockUser } = useSelector((state) => state.agencyReducer);
// 	//console.log('login user data',user._id);		
// 	const [tablebody, setTableBody] = useState([]);
// 	let count = 0;

// 	useEffect(() => {
// 		dispatch(allUsers());
// 	  }, []);
	  
// 	const dispatch = useDispatch();
// 	// useEffect(() => {
// 	// 	if (newUser) {
// 	// 		toast.success(newUser.message);
// 	// 	}
// 	// 	dispatch(userlist());
// 	// }, [newUser]);

// 	// useEffect(() => {
// 	// 	dispatch(allOrders());
// 	// }, [])

// 	const changeStatus = (user_id) => {
// 		dispatch(adminApproval(user_id));
// 		dispatch(userlist());
// 	}

// 	// console.log("users:", users);


// 	// useEffect(() => {
// 	// 	if (adminApprovalStatus) {
// 	// 		toast.success(adminApprovalStatus.msg);
// 	// 	}
// 	// }, [adminApprovalStatus])
// 	// Data Table work
// 	useEffect(() => {
// 		const userDataFiltered = userList?.map((x) => {
// 			//Getting user image
// 			x.user_image = x.user_image ? (
// 			  <img
// 				src={process.env.REACT_APP_API_URL + `/${x.user_image}`}
// 				alt="image"
// 				className="someImgClass"
// 				width="50px"
// 				height="50px"
// 			  />
// 			) : (
// 			  <img
// 				src={"../assets/images/avatar.png"}
// 				alt="image"
// 				className="someImgClass"
// 				width="50px"
// 				height="50px"
// 			  />
// 			);
// 			let jsx = (
// 			  <>
// 				<Link to={`user-details/${x._id}`}>
// 				  <button
// 					type="button"
// 					className="btn btn-sm btn-default"
// 					title="View Details"
// 					data-for="send"
// 					data-tip="true"
// 					currentitem="false"
// 				  >
// 					<i className="icon-eye"></i>
// 				  </button>
// 				</Link>
	
				
// 			  </>
// 			);
	
// 			x.action = jsx;
// 			return x;
// 		  });


// 		setTableBody({

// 			columns: [

// 				{
// 					label: "Image",
// 					field: "user_image",
// 					sort: "asc",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Name",
// 					field: "username",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Email",
// 					field: "email",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Phone",
// 					field: "phone_number",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Gender",
// 					field: "user_gender",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Device Type",
// 					field: "user_device_type",
// 					width: 50,
// 				  },
// 				  {
// 					label: "Action",
// 					field: "action",
// 					width: 50,
// 				  },

// 			],

// 			rows: userDataFiltered ? userDataFiltered : [],
// 		})
// 	}, [userList])


// 	return <>
// 		<div className="row clearfix">
// 			<div className="col-lg-12">
// 				<div className="card">
// 					<div className="header" style={{ marginTop: 20 }}>
// 						<h4>Nurse List </h4>
// 						<Toaster
// 							position="top-center"
// 							reverseOrder={false}
// 							toastOptions={{
// 								style: {
// 									border: '1px solid #713200',
// 									padding: '16px',
// 									color: '#713200',
// 									fontSize: '17px'
// 								},
// 							}}
// 						/>
// 					</div>
// 					<div className="body">
// 						<div className="table-responsive">
// 							{userList?.length && (
// 								<MDBDataTableV5
// 									noBottomColumns
// 									className="table table-hover js-basic-example dataTable table-custom spacing5"
// 									entriesOptions={[5, 10, 20, 25]}
// 									entries={10}
// 									paging
// 									pagesAmount={15}
// 									data={tablebody}

// 									// searchTop
// 									sortRows={['user_email']}
// 								//searchBottom={true}
// 								// onPageChange={()=>{ activePage: 2, pagesAmount: 5 }}
// 								/>)}

// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 		</div>


// 	</>



// }
// export default UserList
