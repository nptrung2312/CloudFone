import { useNavigate } from 'react-router-dom';
import React from 'react';

export const withNavigate = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
};