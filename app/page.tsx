import Link from "next/dist/client/link";
import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta";

export default function Home() {
    return (
        <main className={s.main}>
            <HeadMeta title={"Welcome to My Next Application"}/>
            If you want to view the characters, click here 👉 <Link className={s.navLink} href="/characters">Characters</Link>
        </main>
    );
}