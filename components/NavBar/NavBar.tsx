import React from "react";
import Link from "next/link";
import s from "./NavBar.module.scss";

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
            <nav className={s.mainLinks}>
                {navLinks.map((item) => (
                    <Link key={item.href} href={item.href} className={s.mainLink}>{item.title}</Link>
                ))}
            </nav>
        </header>
    );
};
