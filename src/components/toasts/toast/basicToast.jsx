import React, { useEffect, useState, useContext } from 'react';
import './styles.scss';
import { useTimeout } from '../hooks/useTimeout'
export function BasicToast({
    text, toggleShow, onClick, type, position,
    time, finishedLoading, key, close
}) {
    const [show, setShow] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [toastClass, setToastClass] = useState('')

    useTimeout(close, time + 1000)
    setTimeout(() => {
        setShow('')
    }, time);

    useEffect(() => {
        determineClass()
        determineColor()
        setTimeout(() => {
            setShow('show')
        }, 100);
    }, [])
    const determineColor = () => {
        let result = '';
        if (type === 'success') {
            result = '#4caf50';
        } else if (type === 'danger') {
            result = '#f44336';
        } else if (type === 'warning') {
            result = '#ff9800';
        } else if (type === 'info') {
            result = '#2196f3';
        } else if (type === 'loader') {
            result = '#E5C8C1';
        }
        setBgColor(result)
    }
    const determineClass = () => {
        let result = ''
        if (position === 'middle') {
            result = 'dtg-toast middle';
        } else if (position === 'top-left') {
            result = 'dtg-toast top-left';
        } else if (position === 'top-right') {
            result = 'dtg-toast top-right';
        } else if (position === 'bottom-left') {
            result = 'dtg-toast bottom-left';
        } else if (position === 'bottom-right') {
            result = 'dtg-toast bottom-right';
        }
        setToastClass(result)
    }



    // if (finishedLoading) return (
    //     <div
    //         className={`${toastClass} ${show}`}>
    //         <div
    //             className={`basic-toast-container`}>
    //             <div className='asd'>
    //                 <div className='toast--text-container'>
    //                     <i style={{ color: 'green' }} className="fa-light fa-square-check"></i>

    //                     <div className='toast--text'>

    //                         {text}
    //                     </div>
    //                 </div>

    //                 <button
    //                     onClick={() => {
    //                         onClick()
    //                     }}
    //                 >
    //                     <i className="fa-thin fa-xmark"></i>
    //                 </button>

    //             </div>
    //             <div style={{ backgroundColor: '#4caf50' }}
    //                 className='toast--footer'>
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div
            className={`${toastClass} ${show}`}>
            <div
                className={`basic-toast-container`}>
                <div className='asd'>
                    <div className='toast--text-container'>
                        {type === 'success' && <i style={{ color: 'green', fontSize: '20px' }} className="fa-light fa-square-check"></i>
                        }
                        {type === 'danger' && <i style={{ color: '#f44336', borderRadius: '90px', fontSize: '20px' }} className="fa-light fa-circle-exclamation"></i>
                        }
                        {type === 'warning' && <i style={{ color: '#ff9800', fontSize: '20px' }} className="fa-light fa-circle-exclamation"></i>
                        }
                        {type === 'info' && <i style={{ color: '#2196f3', fontSize: '20px' }} className="fa-light fa-circle-info"></i>
                        }
                        {type === 'loader' && !finishedLoading && <i class="fa-sharp fa-solid fa-loader loader"></i>
                        }
                        <div className='toast--text'>
                            {text}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            onClick()
                        }}>
                        <i className="fa-thin fa-xmark"></i>
                    </button>
                </div>
                {type === 'success' &&
                    <div style={{
                        backgroundColor: bgColor,
                        transitionDuration: time + 'ms'
                    }}
                        className={`toast--footer ${show} success`}>
                    </div>
                }
                {type === 'danger' &&
                    <div style={{
                        backgroundColor: bgColor,
                        transitionDuration: time + 'ms'
                    }}
                        className={`toast--footer ${show} danger`}>
                    </div>
                }
                {type === 'warning' &&
                    <div style={{
                        backgroundColor: bgColor,
                        transitionDuration: time + 'ms'
                    }}
                        className={`toast--footer ${show} warning`}>
                    </div>
                }
                {type === 'info' &&
                    <div style={{
                        backgroundColor: bgColor,
                        transitionDuration: time + 'ms'
                    }}
                        className={`toast--footer ${show} info`}>
                    </div>
                }
                {type === 'loader' &&
                    <div style={{
                        backgroundColor: bgColor,
                        transitionDuration: time + 'ms'
                    }}
                        className={`toast--footer ${show} loaderr`}>
                    </div>
                }
            </div>
        </div>
    );

}