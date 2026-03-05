"use client";

import React from "react";
import Link from "next/link";
import s from "./BurgerMenu.module.scss";

type NavLink = {
    href: string,
    title: string,
}

type BurgerMenuProps = {
    links: NavLink[],
}

export const BurgerMenu = ({links}: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div className={s.burgerRoot}>
            <button
                type="button"
                className={`${s.burgerButton} ${isOpen ? s.burgerButtonOpen : ""}`}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label="Open navigation menu"
            >
                <span className={s.burgerLine}/>
                <span className={s.burgerLine}/>
                <span className={s.burgerLine}/>
            </button>

            {isOpen && (
                <div className={s.overlay} onClick={() => setIsOpen(false)}>
                    <div className={s.menuPanel} onClick={(e) => e.stopPropagation()}>
                        <nav className={s.menuLinks}>
                            {links.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={s.menuLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};
