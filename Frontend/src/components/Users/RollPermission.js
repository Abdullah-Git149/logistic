import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {menuAllListing } from '../../actions/userAction';    
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';


const RollPermission = () => {	

      const dispatch = useDispatch();
      const {id} = useParams();
      const {getData} = useSelector((state) => state.userReducer);
      const[state, setState] = useState({
         designation_id:id
     });
     const [userPermissions, setUserPermissions] = useState([]);
      const transformPermissions = ({getPermission} )=>{
         const {getAllMenu} = getData;
         if(!getPermission.length){
            getAllMenu.forEach((menue,index) => {
               getAllMenu[index].menu_id =menue._id; 
               getAllMenu[index].designation_id =state.designation_id
               getAllMenu[index].view =false;
               getAllMenu[index].add =false;
               getAllMenu[index].edit =false;
               getAllMenu[index].delete=false;
               if(menue.content!=undefined && menue.content.length){
                  menue.content.forEach((sub_menu,index)=>{
                     console.log('sub_menu',sub_menu)
                     sub_menu.view=false;
                     sub_menu.add=false;
                     sub_menu.edit=false;
                     sub_menu.delete=false;
                  })
                  // console.log(menue.content)
               }
            });
            return getAllMenu;
         }


         console.log(getPermission)

         return getPermission;
      }
      const handleInputs = (e) => {

         const permission_to_update = e.target.name;//add, edit, del, view
         const permission_status = e.target.checked;// true/false
         let my_permissions = userPermissions;
         my_permissions.forEach(my_permission => {
          
            if (my_permission.menu_id === e.target.value){
               console.log(my_permission._id,my_permission.menu_id)
               my_permission[permission_to_update] = permission_status
            }else{
               if(my_permission.content!=undefined && my_permission.content.length){
                  my_permission.content.forEach(perm=>{
                     if(perm._id ===e.target.value){
                        perm[permission_to_update]= permission_status;
                     }
                  })
               }
            }
         })
         // console.log('mdsadasdasd',my_permissions)
         setUserPermissions([...my_permissions])
     }
   
     const savePermission = async (e) => {
         e.preventDefault();			
         dispatch(designationRoll(userPermissions));    
      }

   
      useEffect(() => {
         if(getData!=undefined){
            const transform = transformPermissions(getData);
            setUserPermissions(transform)
         }
      },[getData]);

      useEffect(() => {
         dispatch(menuAllListing(id));		
   },[]);

	return <> 
	<div className="container-fluid">
				<div className="block-header">
					<div className="row clearfix">
						<div className="col-md-6 col-sm-12">
							<h1>User Role Permission</h1>							
						</div>						
					</div>
				</div>
          
              {
                 getData == undefined ? '' : 
                 <form onSubmit={savePermission}>
               {                  
                  userPermissions && userPermissions.length ?
                  userPermissions.map((ite) => (
                     <div className="row">                                       
                     <div className="col-md-12 list-group-item" style={{marginBottom:20}}>
                     <strong>{ite.label}</strong>                        
                     </div>     

                          {
                             ite.content && ite.content.length ? 
                              ite.content.map((con) => (                              
                              <div className="list-group-item">
                                 <strong>{con.label}</strong>                                 
                                 
                                 <div className="col-md-2" key={con._id}>
                                 <div className="fancy-checkbox"><label><input type="checkbox" checked={con.view}  id={`view_${con._id}`}  value={con._id}  name='view' onChange={handleInputs} /><span>View</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" checked={con.add}  id={`add_${con._id}`} value={con._id} name='add' onChange={handleInputs} /><span>Add</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" checked={con.edit} id={`edit_${con._id}`} value={con._id} name='edit' onChange={handleInputs} /><span>Edit</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" checked={con.delete} id={`delete_${con._id}`} value={con._id} name='delete' onChange={handleInputs} /><span>Delete</span></label></div>
                                 </div>

                                 </div>
                              ))
                              : ''
                          }
                                                                          
                                 <div className="col-md-2" key={ite._id}>
                                 <div className="fancy-checkbox"><label><input type="checkbox" value={ite.menu_id} checked={ite.view}   name={`view`} onChange={handleInputs} /><span>View</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" value={ite.menu_id} checked={ite.add}   name={`add`} onChange={handleInputs} /><span>Add</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" value={ite.menu_id} checked={ite.edit}  name={`edit`} onChange={handleInputs} /><span>Edit</span></label></div>
                                 </div>
                                 <div className="col-md-2">
                                 <div className="fancy-checkbox"><label><input type="checkbox" value={ite.menu_id} checked={ite.delete}  name={`delete`} onChange={handleInputs} /><span>Delete</span></label></div>
                                 </div>
                           

                        </div>

            
                    ))
                     : <div>No Record found!</div>
                     } 
			         <input type="submit" value="Save" className="btn btn-primary" />
                </form>

              }
             
		</div>
		
	</>



}
export default RollPermission;
