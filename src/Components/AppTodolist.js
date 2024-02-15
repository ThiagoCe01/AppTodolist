import '../App.css';
import React, { useState } from "react";
import avatar from './img/avatar.png';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faDeleteLeft, faClock, faGrip, faSquareCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function AppTodolist (){
const [items, setItems] = useState([]);
const [newItem, setNewItem] = useState("");
const [filter, setFilter] = useState("all");


  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), title: newItem, completed: false }]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
 

  const filteredItems = filter === "completed" ? items.filter((item) => item.completed) : filter === "active" ? items.filter((item) => !item.completed) : items;
    return (
      

        <div className="todo">
          <main className='blockTop'>
          <div className='profile'>
            <p>Olá, tudo bem?</p>
            <div className='profileSettings'>
              <img src={avatar} />
            </div>
          </div>
      
      <div className='blockInput'>
      <p>Lista de atividades</p>
      <div className='Container-Input'>
      <input
        className="new-item-input"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Insira uma nova tarefa"
      />
      <button className="add-item-btn" onClick={handleAddItem}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </button>
      </div>
      <div className='filtered'>
        <p>Filtros</p>
      <div className="filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          <FontAwesomeIcon icon={faGrip}/> Todas
        </button>
        <button className={`filter-btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}> 
        <FontAwesomeIcon icon={faPenToSquare} /> Ativas
        </button>
        <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>
        <FontAwesomeIcon icon={faSquareCheck} /> Completas
        </button>
      </div>
      
        
      
      </div>
      </div>
      </main>
      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item.id} className={`item-container ${item.completed ? "completed" : ""}`}>
            <div className='itemComplete'>
              <div className='TitleAndChek'>
            <input type="checkbox" checked={item.completed} onChange={() => handleToggleCompleted(item.id)} />
            <span className="item-title">{item.title}</span>
            </div>
            <button className="delete-item-btn" onClick={() => handleDeleteItem(item.id)}>
            <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            </div>
            <span className='item-date'>
           <FontAwesomeIcon icon={faClock}/> { new Date (item.id).toLocaleString('pt-BR', { dateStyle: 'long' })}</span>
           
          </li>
        ))}
      </ul>
    </div>

    )
}