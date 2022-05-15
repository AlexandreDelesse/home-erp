const initalState = {
  activityStep: 0,
  serieStep: 0,
};

const trainingInProgressReducer = (state, action) => {
  switch (action.type) {
    case "incrementActivityStep":
      return { ...state, activityStep: state.activityStep + 1 };

    case "incrementSerieStep":
      return { ...state, serieStep: state.serieStep + 1 };
  }
};

export { trainingInProgressReducer, initalState };
