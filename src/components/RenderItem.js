import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editItem, delItem, status } from "../actions/TodosAction";

const ItemRender = (props) => {

  const dispatch = useDispatch();

  const [changeType, setChangeType] = useState(false);
  const editTypeItem = () => {
    setChangeType(true);
  };

  const handleStatus = () => {
    dispatch(status(props.item))
  }

  const handleEditItem = (e) => {
    dispatch(editItem({title : e.target.value, id : props.item.id, status : props.item.status}))
  }

  const handleDel = () => {
    dispatch(delItem(props.item))
  }

  const resetPropertis = (e) => {
    e.preventDefault();
    setChangeType(false);
  }

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={handleStatus}
          key={props.item.status}
          defaultChecked={props.item.status}
        />
      </div>
      {changeType ? (
        <form className="Item" onSubmit={resetPropertis} onBlur={resetPropertis}>
          <input
            autoFocus
            onChange={handleEditItem}
            type="input"
            defaultValue={props.item.title}
            autoComplete="off"
            spellCheck="false"
        />
        </form>
      ) : (
        <button
          onClick={handleStatus}
          className={`${props.item.status ? "done" : ""}`}
        >
          {props.item.title}
        </button>
      )}
      <div className="btn-icon-list">
        <i className="fas fa-edit btn-icon-edit" onClick={editTypeItem} />
        <i className="fas fa-trash btn-icon-remove" onClick={handleDel} />
      </div>
    </>
  );
};

export default ItemRender;
