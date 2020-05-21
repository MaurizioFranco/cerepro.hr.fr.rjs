import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import './LoadingSpinnerComponent.css';
import proxima_arrow from '../../images/proxima_red_great_arrow.png'

export const LoadingSpinnerComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker({delay:100000});

  return (
    <div>
    {
       (promiseInProgress === true) ? 
    		   /*<h3>Hey I'm a spinner loader wannabe !!!</h3>*/ 
    		   
    		   <div className="loader">
                   <img src={proxima_arrow} alt="loading..." />
               </div> 
       : null
    }
  </div>
  )
};