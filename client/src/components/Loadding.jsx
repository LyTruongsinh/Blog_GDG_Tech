import React, { useContext } from 'react';
import { LoadingContext } from '../LoaddingContext';

const LoadingOverlay = () => {
  const { isLoading } = useContext(LoadingContext);

  return isLoading ? (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  ) : null;
};

export default LoadingOverlay;
