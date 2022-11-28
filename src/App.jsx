import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WishList from './components/WishList';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import WishInput from './components/WishInput';
import logo from './assets/logo.png';

const initialWishes = [
  { id: uuidv4(), text: 'Aprender React', done: false },
  { id: uuidv4(), text: 'Dar de alta a los alumnos en Moodle', done: false },
  { id: uuidv4(), text: 'Preparar apuntes', done: false },
  { id: uuidv4(), text: 'Desayunar', done: true },
];

/**
 * Manage a wishlist
 * @returns HTML with a WishList
 */
function App() {
  const [wishes, setWishes] = useState(initialWishes);
  return (
    <div className="container-fluid">
      <img src={logo} width="100px" />
      <h3 style={{ marginTop: 20, fontSize: 20 }}>Welcome to my Wishlist</h3>
      <WishInput
        onNewWish={(NewWish) => {
          console.log('Se ha lanzado el evento');
          setWishes([...wishes, NewWish]);
        }}
      />
      <WishList
        wishes={wishes}
        onUpdateWish={(updatedWish) => {
          /* const updatedWishes = wishes.map((wish) => {
        if (wish.id === updatedWish.id){
          return updatedWish;
        }
        return wish;
        }); */
          const updatedWishes = [...wishes];
          const modifyWish = updatedWishes.find((wish) => wish.id === updatedWish.id);
          modifyWish.done = updatedWish.done;

          setWishes(updatedWishes);
        }}
      />
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>

    </div>
  );
}

export default App;
