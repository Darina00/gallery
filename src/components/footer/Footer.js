import React from 'react';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer-wrapper">
            <hr />
            <span>&copy; 2018-{year}</span>
        </footer>
    )
}