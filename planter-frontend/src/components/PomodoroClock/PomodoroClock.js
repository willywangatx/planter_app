import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Timer from './Timer';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';
import ToggleSwitch from './ToggleSwitch';
import NavBar from '../Navigation/NavBar';

const PomodoroClock = ({
  // global state props
  timersLoading,
  timersError,
  timersData,
  profileLoading,
  profileError,
  profileData,
  walletData,
}) => {
  if (profileLoading) {
    return <div>loading</div>;
  }

  // TODO: ask why this is causing error? continuously fires and doesn't load
  // if (timersLoading) {
  //   return <div>loading</div>;
  // }

  if (profileError) {
    return <div>{profileError.message}</div>;
  }
  if (timersError) {
    return <div>{timersError.message}</div>;
  }

  const shownProfileData = profileLoading ? 'loading' : { walletData };

  return (
    <>
      <NavBar />
      <div className="pomodoro-clock raised-panel">
        <div className="left-panel"></div>
        <div className="center-panel">
          <ToggleSwitch />
          <Timer />
          <StartStop />
        </div>
        <div className="right-panel">
          <AdjustTime />
          <Reset />
        </div>
      </div>
      <div className="json-data">
        <p className="inset panel-label">
          Profile Data: {JSON.stringify(shownProfileData)}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it into local props for component
  const profileLoading = state.profile.loading;
  const profileError = state.profile.error;
  const profileData = state.profile;
  const timersLoading = state.timers.loading;
  const timersError = state.timers.error;
  const timersData = state.timers;
  const timerId = state.timers.id;
  const walletData = state.wallet;

  return {
    profileLoading,
    profileError,
    profileData,
    timersLoading,
    timersError,
    timersData,
    timerId,
    walletData,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers')
);

export default hoc(PomodoroClock);
