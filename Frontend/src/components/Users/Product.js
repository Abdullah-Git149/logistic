import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {productAdd} from '../../actions/userAction';
import toast, { Toaster } from 'react-hot-toast';


const Product = (props) => {	

    const dispatch  = useDispatch();

    const[state, setState] = useState({
        _id: null,
		name:'',
        price:'',
        description:'',
    
		
    });
        
    const{newProduct} = useSelector((state) => state.userReducer);	
    
    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

   

        const saveProduct = (e) => {
             e.preventDefault();             
             dispatch(productAdd(state));             
        }
  
        useEffect(() => {
            if(newProduct){
                toast.success(newProduct.msg);
            }
        },[newProduct])

	return <> 
	<div className="container-fluid">
				<div className="block-header">
					<div className="row clearfix">
						<div className="col-md-6 col-sm-12">
							<h1>Add New Product</h1>							
						</div>						
					</div>
				</div>

                <Toaster
						position="top-center"
						reverseOrder={false}
						toastOptions={{							
							style: {
							  border: '1px solid #713200',
							  padding: '16px',
							  color: '#713200',
							  fontSize: '17px'
							},
						  }}
						/>

				<div className="row clearfix">
				
                
                 <div className="col-md-6">
                     <div className="cart">
                       
                      <div className="body">
                      <form onSubmit={saveProduct}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" value={state.name} onChange={handleInputs} />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" name="price" className="form-control" value={state.price} onChange={handleInputs} />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" className="form-control" value={state.description} onChange={handleInputs} />
                        </div>
                     

                        <div className="form-group">
                              <button className="btn btn-primary btn-block" type="submit">Save</button>
                        </div>
                        </form>
                        </div>
                     
                     </div>
                  </div>
                 
					
				</div>
		</div>
		
	</>



}
export default Product
