import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Grid = ({ gardens }) => {
    let rows = [];
    let columns = [];
    for (let i = 0; i < gardens.rows; i++) {
        for (let j = 0; j < gardens.columns; j++) {
            columns[j] = < button key={[i, j]} className="disable-select raised-btn plant-btn garden-col" > {`${i} ${j}`}</button>
        }
        rows[i] = columns;
    }
    return (
        <>
            <div className="raised-panel garden-panel">
                {rows}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        gardens: state.gardens,
    };
};
const hoc = compose(connect(mapStateToProps));
export default hoc(Grid);

