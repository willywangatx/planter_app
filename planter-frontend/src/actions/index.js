// ACTION CREATORS

export const fetchPomodoroTimer = () => async (dispatch) => {
  const response = await //create middleware to pass response
  dispatch({ type: 'FETCH_POMODORO_TIMER', payload: response });
};
