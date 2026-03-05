import React from "react";
import Link from "next/link";
import s from "./NavBar.module.scss";
import {BurgerMenu} from "@/components/BurgerMenu/BurgerMenu";
import {NAV_LINKS} from "@/app/constants/navigation";

export const NavBar = () => {
    return (
        <header className={s.header}>
            <div className={s.navContainer}>
                <nav className={s.mainLinks}>
                    {NAV_LINKS.map((item) => (
                        <Link key={item.href} href={item.href} className={s.mainLink}>{item.title}</Link>
                    ))}
                </nav>
                <div className={s.mobileMenu}>
                    <BurgerMenu links={NAV_LINKS.map((item) => ({...item}))}/>
                </div>
            </div>
        </header>
    );
};
