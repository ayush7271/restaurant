import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurent: {
    type: {
      veg: "veg",
      non_veg: "non_veg",
    },
    size: {
      large: "large",
      medium: "medium",
      small: "small",
    },
    base: {
      thin: "thin",
      thick: "thick",
    },
  },
  stages: [
    {
      Order_Placed: [
        {
          order_id: "Order 001",
          time: "",
        },
        {
          order_id: "Order 002",
          time: "",
        },
        {
          order_id: "Order 003",
          time: "",
        },
        {
          order_id: "Order 004",
          time: "",
        },
        {
          order_id: "Order 005",
          time: "",
        },
        {
          order_id: "Order 006",
          time: "",
        },
      ],
    },
    {
      Order_in_Making: [],
    },
    { Order_Ready: [] },
    { Order_Picked: [] },
  ],

  main_section: {
    order_id: "",
    stage: "",
    total_time: "",
    action: "",
  },
  main_section_array: [],
};
const restaurentSlice = createSlice({
  name: "restaurent",
  initialState: initialState,
  reducers: {
    restaurentSliceRequest: (state) => {
      return {
        ...state,
        restaurent: { loading: true },
      };
    },
    restaurentSliceSuccess: (state, action) => {
      return {
        ...state,
        restaurent: action.payload.data,
      };
    },
    restaurentSliceFailure: (state) => {
      return {
        ...state,
        restaurent: { loading: false },
      };
    },
    getOrderPlaceClick: (state, action) => {
      const { Order_Placed, order_id } = action.payload;

      // Find the order in the stages
      for (let i = 0; i < state.stages.length; i++) {
        const stage = state.stages[i];
        const orderIndex = stage.Order_Placed.findIndex(
          (order) => order.order_id === order_id
        );

        if (orderIndex !== -1) {
          // Order found in this stage, remove from current stage
          state.stages[i].Order_Placed.splice(orderIndex, 1);

          // If there's a next stage, move order to the next stage
          if (i + 1 < state.stages.length) {
            state.stages[i + 1].Order_in_Making.push({
              Order_Placed,
              order_id: order_id,
            });
          }
          break;
        }
      }
    },

    

    // getOrderPlaceClicc: (state, action) => {
    //   const { Order_Placed, order_id } = action.payload;

    //   // Find the order in the stages
    //   for (let i = 0; i < state.stages.length; i++) {
    //     const stage = state.stages[i];
    //     const orderIndex = stage.Order_Placed.findIndex(
    //       (order) => order.order_id === order_id
    //     );

    //     if (orderIndex !== -1) {
    //       // Order found in this stage, remove from current stage
    //       state.stages[i].Order_Placed.splice(orderIndex, 1);

    //       // If there's a next stage, move order to the next stage
    //       if (i + 1 < state.stages.length) {
    //         state.stages[i + 1].Order_in_Making.push({
    //           ...Order_Placed,
    //           order_id: order_id, // Include order_id in the next stage
    //         });
    //       }
    //       break;
    //     }
    //   }
    // },

    // getOrderPlaceClick: (state, action) => {
    //   const orderId = action.payload;
    //   let moved = false;
    //   const updatedStages = state.stages.map((stage, index) => {
    //     const updatedOrders = stage.Order_Placed.filter((order) => {
    //       if (order.order_id === orderId && index < state.stages.length - 1) {
    //         moved = true;
    //         state.stages[index + 1].Order_in_Making.push(order);
    //         return false;
    //       }
    //       return order.order_id !== orderId;
    //     });
    //     return {
    //       ...stage,
    //       Order_Placed: updatedOrders,
    //     };
    //   });
    //   return {
    //     ...state,
    //     stages: updatedStages,
    //   };
    // },
  },
});
export const {
  restaurentSliceRequest,
  restaurentSliceSuccess,
  restaurentSliceFailure,
  getOrderPlaceClick,
} = restaurentSlice.actions;
export default restaurentSlice.reducer;
