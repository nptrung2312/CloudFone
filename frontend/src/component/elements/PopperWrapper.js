// PopperWrapper.js
import React from 'react';
import { usePopper } from 'react-popper';

const PopperWrapper = ({ referenceElement, children, placement = 'bottom-start' }) => {
    const [popperElement, setPopperElement] = React.useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
    });

    return (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {children}
        </div>
    );
};

export default PopperWrapper;
