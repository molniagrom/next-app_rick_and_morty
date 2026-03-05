import Image from "next/image";
import {SOCIAL_LINKS} from "@/app/constants/social";
import s from "./Footer.module.scss";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <p className={s.title}>About me</p>
                <div className={s.links}>
                    {SOCIAL_LINKS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.link}
                            aria-label={item.label}
                        >
                            <span className={s.iconWrap}>
                                <Image src={item.iconSrc} alt="" width={20} height={20} className={s.icon}/>
                            </span>
                            <span className={s.linkText}>{item.text}</span>
                        </a>
                    ))}
                </div>
                <p className={s.copy}>© {currentYear} Alina Groza / The Rick and Morty API</p>
            </div>
        </footer>
    );
};
