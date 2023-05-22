import React from 'react'

export default function Bell(props) {
    return (
        <div className="bell-container">
            <div className="bell-icon">
                <img src="images/Asset-7.svg" loading="lazy" alt="" />
                {props.bell !== 0 &&
                    <div className="circle">
                        <div className="number">{props.bell ? props.bell : ""}</div>
                    </div>
                }
            </div>
        </div>



    )

}
