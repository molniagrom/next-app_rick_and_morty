"use client";

import React from "react";
import Link from "next/link";
import s from "./NavBar.module.scss";
import {BurgerMenu} from "@/components/BurgerMenu/BurgerMenu";
import {NAV_LINKS} from "@/app/constants/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const NavBar = () => {
    const {state, actions} = useRickAndMortyStore();

    return (
        <header className={s.header}>
            <div className={s.navContainer}>
                <nav className={s.mainLinks}>
                    {NAV_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} className={s.mainLink}>{item.title}</Link>
                    ))}
                </nav>
                <div className={s.rightControls}>
                    <button
                        type="button"
                        className={s.themeToggle}
                        onClick={actions.toggleTheme}
                        aria-label={state.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                        title={state.theme === "dark" ? "Light theme" : "Dark theme"}
                    >
                        {state.theme === "dark" ? "☀️ Light" : "🌑 Dark"}
                    </button>
                    <div className={s.mobileMenu}>
                        <BurgerMenu links={NAV_LINKS.map((item) => ({...item}))}/>
                    </div>
                </div>
            </div>
        </header>
    );
};
