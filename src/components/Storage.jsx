import React, { useCallback, useState } from 'react';
import CloudIconsS from './CloudIconsS';
import StorageItem from './StorageItem';
import './Storage.css';

const Storage = ({
  state,
  type = "kudo",
  accountName = "Alexey Dubnyak",
  serviceName = "ARES Kudo Drive",
  onItemClick
}) => {
  // If `state` prop is not provided, component works in uncontrolled mode
  const [internalState, setInternalState] = useState('standard');
  const effectiveState = state ?? internalState; // controlled has priority

  const toggleState = useCallback(() => {
    if (state === undefined) {
      setInternalState(prev => (prev === 'active' ? 'standard' : 'active'));
    }
    if (onItemClick) onItemClick();
  }, [state, onItemClick]);
  const getServiceName = () => {
    switch (type) {
      case "google drive":
        return "Google Drive";
      case "dropbox":
        return "Dropbox";
      case "kudo":
      default:
        return serviceName;
    }
  };

  const getAccountEmail = () => {
    switch (type) {
      case "google drive":
        return "alexey.dubnyak@graebert.com";
      case "dropbox":
        return "dubnyak404@gmail.com";
      case "kudo":
      default:
        return accountName;
    }
  };

  return (
    <div className="storage">
      {/* Header */}
      <button
        className={`storage__header ${effectiveState === 'active' ? 'storage__header--active' : ''}`}
        onClick={toggleState}
        type="button"
        aria-expanded={effectiveState === 'active'}
        aria-label={`${effectiveState === 'active' ? 'Свернуть' : 'Развернуть'} ${getServiceName()}`}
      >
        <CloudIconsS type={type} state={effectiveState} />
        <span className="storage__header-text">
          {getServiceName()}
        </span>
      </button>

      {/* Storage Item */}
      <StorageItem
        state={effectiveState}
        label={getAccountEmail()}
        onClick={toggleState}
      />

      {/* Progress Bar (only for kudo) */}
      {type === "kudo" && (
        <div className="storage__progress">
          <div className="storage__progress-bar" />
        </div>
      )}
    </div>
  );
};

export default Storage;
