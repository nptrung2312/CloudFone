import React, { useState, useRef } from 'react';
import '../../assets/scss/InputForm.scss';

const InputForm = ({ label, fieldName, initialValue }) => {
    const [value, setValue] = useState(initialValue);
    const [staticMode, setStaticMode] = useState(true);
    const inputRef = useRef(null);

    const handleEditClick = () => {
        setStaticMode(false);
        inputRef.current.focus(); // Focus vào input khi nhấp vào span
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type="text"
                value={value}
                className={`input-text ${staticMode ? '' : 'input-public'}`}
                id={fieldName}
                name={fieldName}
                readOnly={staticMode}
                onChange={handleChange}
                ref={inputRef} // Đặt ref vào input
            />
            <span className="edit-input" onClick={handleEditClick}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </span>
        </div>
    );
}

export default InputForm;
