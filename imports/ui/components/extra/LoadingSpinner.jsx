import React from 'react'

export default function LoadingSpinner() {
    return (
        <div className="bet_confirmation_screen" style={{ display: 'flex' }}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
