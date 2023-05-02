import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@material-ui/core";
import {Link} from "react-router-dom"
import { Button } from "@material-ui/core";
 

import { trucklistAction } from "../../actions/userAction";

const TruckList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listOfTrucks } = useSelector((state) => state?.userReducer);
  console.log(listOfTrucks, "sd");
  const [tablebody, setTableBody] = useState([]);

  useEffect(() => {
    // dispatch(userlistt());
    dispatch(trucklistAction());
  }, []);

  //   const BlockUser = async (user_id, e) => {
  //     e.preventDefault();
  //     dispatch(blockUser(user_id)).then(() => {
  //       dispatch(userlistt());
  //     }).catch((err) => {
  //       toast.error("Something Went Wrong")
  //     })

  //   };

  //   const UnblockUser = async (user_id, e) => {
  //     e.preventDefault();
  //     dispatch(unblockUser(user_id)).then(() => {
  //       dispatch(userlistt());
  //     }).catch((err) => {
  //       toast.error("Something Went Wrong")
  //     })

  //   };



  useEffect(() => {
    if (!listOfTrucks) {
      return <></>;
    } else if (listOfTrucks) {
      const userDataFiltered = listOfTrucks?.map((x) => {

        //Getting user image
        x.image = x.image ? (
          <img
            src={process.env.REACT_APP_API_URL + `/${x.image}`}
            alt="image"
            className="someImgClass"
            width="50px"
            height="50px"
          />
        ) : (
          <img
            src={"../assets/images/avatar.png"}
            alt="image"
            className="someImgClass"
            width="50px"
            height="50px"
          />
        );

        let jsx = (
          <>
            <button
              type="button"
              className="btn btn-sm btn-default"
              title="View Details"
              data-for="send"
              data-tip="true"
              currentitem="false"
              onClick={() => navigate("/truck-detail", { state: x?._id })}
            >
              <i className="icon-eye"></i>
            </button>



            {/* {
              x.is_blocked ? <button
                //  to={'*'}
                onClick={(e) => UnblockUser(x._id, e)}
                className="btn btn-sm mr-1 ml-1"
                title=""
                style={{ backgroundColor: "#952B23", color: "white" }}
              >
                Activate
              </button> : <button
                //  to={'*'}
                onClick={(e) => BlockUser(x._id, e)}
                className="btn btn-sm mr-1 ml-1"
                title=""
                style={{ backgroundColor: "#952B23", color: "white" }}
              >
                Deactivate
              </button>
            } */}


          </>
        );

        x.action = jsx;
        return x;
      });

      setTableBody({
        columns: [

          {
            label: "Truck Owner",
            field: "truckOwner",
            width: 50,
          },
          {
            label: "Truck Number",
            field: "truckNumber",
            width: 50,
          },
          {
            label: "Chassis Number",
            field: "chassisNumber",
            width: 50,
          },
          {
            label: "Wheels",
            field: "wheels",
            width: 50,
          },
          {
            label: "Frame Number",
            field: "frameNumber",
            width: 50,
          },
          {
            label: "Action",
            field: "action",
            width: 50,
          },
        ],

        rows: userDataFiltered ? userDataFiltered : [],
      });
    }
  }, [listOfTrucks]);
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header" style={{ marginTop: 20 }}>
              <h4>Truck List </h4>
           
              <div>
                <Link to="/add-truck"><Button variant="contained">Add Truck</Button></Link>
              </div>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "#713200",
                    fontSize: "17px",
                  },
                }}
              />
            </div>
            <div className="body">
              <div className="table-responsive">
                {listOfTrucks?.length < 1 ? (
                  <CircularProgress
                    className="progress"
                    style={{
                      backgroundColor: "transparent",
                      color: "#952B23",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  />
                ) : (
                  <MDBDataTableV5
                    noBottomColumns
                    className="table table-hover js-basic-example dataTable table-custom spacing5"
                    entriesOptions={[5, 10, 20, 25]}
                    entries={5}
                    paging
                    pagesAmount={15}
                    data={tablebody}

                  // searchTop
                  // sortRows={['user_name']}
                  //searchBottom={true}
                  // onPageChange={()=>{ activePage: 2, pagesAmount: 5 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TruckList;
