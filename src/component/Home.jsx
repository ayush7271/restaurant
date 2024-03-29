import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPlaceClick } from "../slice/restaurentSlice";

export const Home = () => {
  const res = useSelector((store) => store?.restaurentSlice);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (res) {
      setData(res);
    }
  }, [res]);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}sec`;
  }
  const deleteElementAtIndex = (index) => {
    if (index >= 0 && index < data.length) {
      const newArray = [...data]; // Create a shallow copy
      newArray.splice(index, 1); // Modify the copy
      setData(newArray); // Update the state
    } else {
      console.log(`Invalid index: ${index}`);
    }
  };
  const [currentId, setCurrentId] = useState("");
  console.log(currentId);
  if (currentId) {
    let orderPlacedArray = data.stages?.find((obj) =>
      obj.hasOwnProperty(currentId?.topHead)
    )[currentId?.topHead];
    console.log(orderPlacedArray);
    deleteElementAtIndex(currentId?.j);
  }

  // Example usage: deleting element at index 2
  function handleClick(e, j) {
    console.log({ Order_Placed: j, order_id: e?.order_id });
    dispatch(getOrderPlaceClick({ Order_Placed: j, order_id: e?.order_id }));
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        {data?.stages?.map((i, j) => {
          let order = Object.entries(i)[0][1];
          console.log(i)
          let topHead = Object.keys(i)[0];
          return (
            <div
              style={{
                width: "300px",
                height: "auto",
                border: "1px solid black",
                paddingBottom: "50px",
              }}
            >
              <p
                style={{
                  margin: "auto",
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "50px",
                }}
              >
                {topHead}
              </p>

              {order?.map((i) => {
                
                console.log(i)
                return (
                  <div
                    style={{
                      width: "80%",
                      height: "200px",
                      border: "1px solid black",
                      margin: "auto",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: "auto",
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "50px",
                      }}
                    >
                      <div>{i?.order_id}</div>
                      <div>{formatTime(65)}</div>
                    </p>
                    <div
                      style={{
                        width: "100px",
                        height: "30px",
                        textAlign: "center",
                        margin: "auto",
                        marginTop: "20px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleClick(i, topHead)}
                    >
                      Next
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
