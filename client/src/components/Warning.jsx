import React from 'react';

const Warning = ({message, referance}) => {
    return (
        <div className="warning warning--invisible" ref={referance}>
            {message}
        </div>
    )
}

export default Warning;