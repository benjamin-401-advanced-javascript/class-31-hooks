import React, { useReducer } from 'react';
import Auth from '../auth/auth';
import styles from './todo.module.scss';

const initialState = {
  item: '',
  toDoItems: [],
};

function reducer(state, action) {
  // state = the current state, before any changes are made
  // action = object with a {type: "", data: {} }
  switch (action.type) {
    case 'update item':
      return { ...state, item: action.data };
    case 'add todo item':
      return { ...state, toDoItems: action.data };
    case 'toggle todo item':
      return { ...state, toDoItems: action.data };
    default:
      throw new Error();
  }
}

export default function Todo(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleFormSubmit(e) {
    e.preventDefault();
    e.target.reset();
    const item = { title: state.item, status: false };
    // setState({ toDoItems: [...state.toDoItems, item] });
    dispatch({ type: 'add todo item', data: [...state.toDoItems, item] });
  }

  function handleChange(e) {
    dispatch({ type: 'update item', data: e.target.value });
    // setState({ item: e.target.value });
  }

  function toggle(e, id) {
    e.preventDefault();
    const toDoItems = state.toDoItems.map((item, idx) => (idx === id
      ? { title: item.title, status: !item.status } : item));
    // setState({ toDoItems });
    dispatch({ type: 'toggle todo item', data: toDoItems });
  }

  return (
    <section className={styles.todo}>

      <Auth capability="read">
        {state.toDoItems.map((item, idx) => <div key={idx} onClick={(e) => toggle(e, idx)}>
          <span className={styles[`complete-${item.status}`]}> {item.title} </span>
        </div>)}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>

    </section>
  );
}
