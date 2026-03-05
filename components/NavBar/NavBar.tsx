import React from "react";
import Link from "next/link";
import s from "./NavBar.module.scss";
import {BurgerMenu} from "@/components/BurgerMenu/BurgerMenu";

const navLinks = [
    {href: "/", title: "Main"},
    {href: "/characters", title: "Characters"},
    {href: "/episodes", title: "Episodes"},
    {href: "/locations", title: "Locations"},
    {href: "/genetic-data", title: "Genetic Data"},
    {href: "/infinite-dimensions", title: "Infinite Dimensions"},
];

export const NavBar = () => {
    return (
        <header className={s.header}>
            <div className={s.navContainer}>
                <nav className={s.mainLinks}>
                    {navLinks.map((item) => (
                        <Link key={item.href} href={item.href} className={s.mainLink}>{item.title}</Link>
                    ))}
                </nav>
                <div className={s.mobileMenu}>
                    <BurgerMenu links={navLinks}/>
                </div>
            </div>
        </header>
    );
};
