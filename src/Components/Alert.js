import React, { useContext } from 'react'
import SearchContext from '../Context/SearchContext';

export default function Alert() {

    const { searchContext } = SearchContext
    const context = useContext(searchContext);
    const { alert } = context;

    return (
        alert && <div>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" style={{zIndex: 1}}>
                <strong>{alert.msg}</strong>
            </div>
        </div>
    )
}