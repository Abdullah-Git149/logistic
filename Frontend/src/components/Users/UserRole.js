import React, {useEffect, useState} from 'react';
import{Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { rollListing } from '../../actions/userAction';


const UserRole = () => {	

    const dispatch = useDispatch();

	  const{rollLoad} = useSelector((state) => state.userReducer);
	  let count = 0;

	useEffect(() => {
        dispatch(rollListing());		
	},[]);
      

	return <> 
	<div className="container-fluid">
				<div className="block-header">
					<div className="row clearfix">
						<div className="col-md-6 col-sm-12">
							<h1>User Role Listing</h1>							
						</div>						
					</div>
				</div>

				<div className="row clearfix">
				<div className="col-12">
						<div className="table-responsive">
							<table className="table table-hover table-custom spacing8">
								<thead>
									<tr>
										<th>SNO</th>
										<th>Role Name</th>																				
										<th>Action</th>																				
									</tr>
								</thead>
								<tbody>	
									{
										rollLoad && rollLoad.length ? 
										rollLoad.map((ite) => (
                                            <tr key={ite._id}>
												<td>{count = count + 1}</td>
												<td>{ite.title}</td>											
												<td>												
												<Link to={`user_role/${ite._id}`}><i className="fa fa-cubes"></i></Link>
											</td>
											</tr>
										))
										: <tr><td>No Record found!</td></tr> 
									}					
                                   
																	
								</tbody>
							</table>
						</div>
					</div>
					
				</div>
		</div>
		
	</>



}
export default UserRole
