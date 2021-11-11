import React from 'react';
import './Model.css';

const Model = (props) => {
    if (props.text.length>0) {
        return (
            <div className="model">
                <span className="modelText">{props.text}<div class="lds-circle"><div></div></div></span>
                
            </div>
        )
    }
    else {
        return <div />
    }
}
export default Model;