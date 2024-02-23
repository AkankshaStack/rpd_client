import React from 'react';

const TrainForm = ({
  editableTrain,
  isEditing,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <form>
      <label>
        Train Name:
        <input
          type="text"
          name="trainName"
          value={editableTrain.trainName || ''}
          onChange={onInputChange}
        />
      </label>
      <label>
        Platform:
        <input
          type="text"
          name="platformNumber"
          value={editableTrain.platformNumber || ''}
          onChange={onInputChange}
        />
      </label>
      <label>
        Arrival Time:
        <input
          type="text"
          name="arrivalTime"
          value={editableTrain.arrivalTime || ''}
          onChange={onInputChange}
        />
      </label>
      {isEditing ? (
        <>
          <button type="button" onClick={onSave}>
            Save
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <button type="button" onClick={onSave}>
          Add Train
        </button>
      )}
    </form>
  );
};

export default TrainForm;