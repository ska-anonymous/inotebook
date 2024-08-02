import React, { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';

export default function Alert() {
    const { myAlert } = useContext(AppContext);
    return (
        myAlert &&
        <div style={{ position: "fixed", top: "40px", width: "100%", zIndex: 3 }} className={`alert alert-${myAlert.type} alert-dismissible fade show`} role="alert">
            {myAlert.message}
        </div>
    )
}