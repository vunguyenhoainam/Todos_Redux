import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RenderItem from "./components/RenderItem";
import "./components/css/style.css";
import { addItem, delAll, checkAll } from "./actions/TodosAction";

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector( state => state )

  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("az");
  const [filterStatus, setFilterStatus] = useState("All");
  const [statusCheck, setStatusCheck] = useState(false);
  // console.log("DATASTORE",dataState);

  const countActive = dataState.TodosReducer.dataTodos.filter( item => item.status === true);
  // const countActive = dataState;
  console.log("ACTIVE :",countActive.length);
  console.log("NOT_ACTIVE :",(dataState.TodosReducer.dataTodos.length) - (countActive.length));

  const handleSearch = dataState.TodosReducer.dataTodos.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  
  const handleFilterName = handleSearch.sort((a, b) => {
    const filterAfter = (filterName === "az") ? 1 : -1;
    return filterAfter * a.title.localeCompare(b.title);
  });

  const handleFilterStatus = handleFilterName.filter(item => {
    if(filterStatus === "Complete") return item.status === true;
    else if(filterStatus === "Uncomplete") return item.status === false;
    else return dataState.TodosReducer.dataTodos;
  })

  const inputRef = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const valueInput = inputRef.current.value;
    if(valueInput !== ""){
      dispatch(addItem(valueInput));
      inputRef.current.value = "";
    }
  }

  const handleDelAll = () => {
    dispatch(delAll());
  }

  const handleCheckAll = () => {
    setStatusCheck(!statusCheck);
    dispatch(checkAll(statusCheck));
  }

  return (
    <section className="container">
      <div className="header">
        <h1>My to-dos</h1>
        <form className="form-search">
          <input 
            type="text"
            placeholder="Search..."
            autoComplete="off"
            spellCheck="false"
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        <select name="#" className="form-filter" onChange={e => setFilterName(e.target.value)}>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
        <select name="#" className="form-filter" onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">ALL</option>
          <option value="Complete">Complete</option>
          <option value="Uncomplete">Uncomplete</option>
        </select>
      </div>
      <form className="form-submit" onSubmit = { handleAdd } onBlur = { handleAdd }>
        <input
          type="text"
          placeholder="Create a new to-do..."
          autoComplete="off"
          spellCheck="false"
          ref={inputRef}
        />
      </form>
      <div className="btn-control">
        <p className="btn-control-checkAll" onClick={handleCheckAll}>Check All</p>
        <div>
          <span className="All">All : { dataState.TodosReducer.dataTodos.length }</span>
          <span className="Complete">Complete : { countActive.length }</span>
          <span className="UnComplete">UnComplete : { (dataState.TodosReducer.dataTodos.length) - (countActive.length) }</span>
        </div>
        <p className="btn-control-deleteAll" onClick={ handleDelAll }>Delete All</p>
      </div>
      <div className="list-element">
        <ul>
            {
              handleFilterStatus.map((item) => (
                <li key = {item.id}>
                  <RenderItem item = {item}/>
                </li>
              ))
            }
        </ul>
      </div>
    </section>
  );
};

export default App;
