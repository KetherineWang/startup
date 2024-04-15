import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Login } from './login/login'
import { Play } from './play/play'
import { Rank } from './rank/rank'


export default function App() {
  return (
    <div className='body'>
        <header className="header-title container-fluid text-center text-black">
            <h1>Echoes of keshi: A Lyric Odyssey</h1>

            <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item nav-tabs"><a className="nav-link text-black" href="index.html">Home</a></li>
                    <li className="nav-item nav-tabs"><a className="nav-link text-black" href="play.html">Play</a></li>
                    <li className="nav-item nav-tabs"><a className="nav-link text-black" href="rank.html">Rank</a></li>
                </ul>
            </nav>
        </header>

        <Login />
        <Play />
        <Rank />

        <footer className="container-fluid text-center text-black">
            <span className="authorName">Hongting (Ketherine) Wang</span>

            <br />

            <a href="https://github.com/KetherineWang/startup.git" className="text-black">GitHub</a>
        </footer>
    </div>
  );
}