import React from 'react';
import './Model.css';

const Model = (props) => {
    if (props.text.length>0) {
        return (
            <div className="model">
                <span className="modelText">{props.text}</span>
                <div class="lds-circle"><div></div></div>
                {/* <div class="wrapper">
                    <div class="pie spinner"></div>
                    <div class="pie filler"></div>
                    <div class="mask"></div>
                </div> */}
            </div>
        )
    }
    else {
        return <div />
    }
}
export default Model;