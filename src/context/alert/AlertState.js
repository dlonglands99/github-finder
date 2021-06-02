import React, { useReducer } from "react";
import AlertConext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const showAlert = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {message, type}
        })

        setTimeout(() => {
            dispatch({type: REMOVE_ALERT})
        }, 5000);
    };

    return (
        <AlertConext.Provider
        value={{
            alert: state,
            showAlert,
        }}
        >
            {props.children}
        </AlertConext.Provider>
    )
}

export default AlertState;