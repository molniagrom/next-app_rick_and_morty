import React from 'react';
import Link from "next/link"; // Можно использовать упрощенный импорт
import s from './NavBar.module.scss'; // Импортируем стили

export const NavBar = () => {
    return (
        <nav className={s.navContainer}>
            <Link href="/" className={s.navLink}>
                Main
            </Link>
            <Link href="/characters" className={s.navLink}>
                Characters
            </Link>
        </nav>
    );
};