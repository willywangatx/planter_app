import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';


const CompletedSessions = ({completedFocusMinutes}) => {
    return (
        <>
            <div style={{fontSize: '3rem'}}>
                Completed Focus Minutes: 
                <div className='disable-select inset panel-label'>
                    {completedFocusMinutes}
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    //accessing store and putting it into local props for component
    const completedFocusMinutes = state.timers.completed_focus_minutes;

    return {
        completedFocusMinutes,
    };
  };
  
  const hoc = compose(
    connect(mapStateToProps),
    withRPCRedux('getTimers'),
  );
  
  export default hoc(CompletedSessions);
  