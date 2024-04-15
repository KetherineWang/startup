import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login'
import { Play } from './play/play'
import { Rank } from './rank/rank'

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>;
}

export default function App() {
  return (
    <BrowserRouter>
        <div className='body'>
            <header className="header-title container-fluid text-center text-white">
                <h1>Echoes of keshi: A Lyric Odyssey</h1>

                <nav>
                    <ul className="nav justify-content-center">
                        <li className="nav-item nav-tabs"><NavLink className="nav-link text-white" to="">Home</NavLink></li>
                        <li className="nav-item nav-tabs"><NavLink className="nav-link text-white" to="play">Play</NavLink></li>
                        <li className="nav-item nav-tabs"><NavLink className="nav-link text-white" to="rank">Rank</NavLink></li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/rank' element={<Rank />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="container-fluid text-center text-white">
                <span className="authorName">Hongting (Ketherine) Wang</span>

                <br />

                <a href="https://github.com/KetherineWang/startup.git" className="text-white">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}