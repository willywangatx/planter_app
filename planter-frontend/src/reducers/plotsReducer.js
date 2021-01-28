import reduceReducers from 'reduce-reducers';
import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
    loading: false,
    error: null,
    row: null,
    column: null,
    tool: null,
    plant: null,
    max_tool_attachments: null,
    max_plant_attachments: null,
};

export default reduceReducers(
    DEFAULT_STATE,
    createRPCReducer('getPlots', {
        start: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        success: (state, { payload }) => {
            return {
                ...state,
                ...payload.plots,
                loading: false,
            }
        },
        failure: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }
    }),

);
