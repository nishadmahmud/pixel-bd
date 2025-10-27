import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='my-3 text-gray-800 text-center'>
            <h2 className="inline text-2xl text-black md:text-2xl lg:text-3xl font-medium poppins text-center">{title}</h2>
        </div>
    );
};

export default Heading;