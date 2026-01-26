import Link from "next/dist/client/link";
import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {NavBar} from "@/components/NavBar/NavBar";

export default function Home() {
    return (
        <main className={s.main}>
            <HeadMeta title={"Welcome to My Next Application"}/>
            <NavBar/>
        </main>
    );
}