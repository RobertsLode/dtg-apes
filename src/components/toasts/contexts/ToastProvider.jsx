import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './ToastContext';
import { BasicToast } from '../toast/basicToast.jsx'

// Create a random ID
function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);

    return first + second;
}

export const ToastProvider = (props) => {
    const [toasts, setToasts] = useState([]);
    console.log('toasts', toasts);
    const open = ({ text, toggleShow, type, position, finishedLoading, time }) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), text, toggleShow, type, position, finishedLoading, time },
        ]);
    const close = (id) =>
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    const contextValue = useMemo(() => ({ open }), []);

    return (
        <ToastContext.Provider value={contextValue}>
            {props.children}

            {createPortal(
                <div className="dtg-toast">
                    {toasts.map((toast) => (
                        <BasicToast
                            text={toast.text}
                            toggleShow={toast.toggleShow}
                            type={toast.type}
                            position={toast.position}
                            finishedLoadong={toast.finishedLoading}
                            key={toast.id}
                            time={toast.time}
                            onClick={() => close(toast.id)}>
                        </BasicToast>
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};