import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client"
import './index.css'
import App from './app'

const root = createRoot(document.getElementById("reactEntry"));

root.render(
    <App></App>
);