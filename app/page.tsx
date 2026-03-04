import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import Link from "next/link";

export default function Home() {
    return (
        <main className={s.main}>
            <HeadMeta title={"Rick and Morty Database"}/>

            <div className={s.welcomeContainer}>
                <div className={s.headerSection}>
                    <h1 className={s.mainTitle}>Welcome to the Character Database</h1>
                    <h2 className={s.subtitle}>Rick and Morty Character Database</h2>
                </div>

                <div className={s.contentSection}>
                    <div className={s.infoCard}>
                        <h3>🚀 Explore the Multiverse</h3>
                        <p>Discover thousands of characters from the iconic Rick and Morty series. Each character has a unique story, abilities, and place in the infinite multiverse.</p>
                    </div>

                    <div className={s.featuresGrid}>
                        <Link href="/infinite-dimensions" className={s.featureLink}>
                            <div className={s.featureItem}>
                                <span className={s.featureIcon}>🌌</span>
                                <h4>Infinite Dimensions</h4>
                                <p>Characters from different realities and timelines</p>
                            </div>
                        </Link>
                        <Link href="/genetic-data" className={s.featureLink}>
                            <div className={s.featureItem}>
                                <span className={s.featureIcon}>🧬</span>
                                <h4>Genetic Data</h4>
                                <p>Detailed information about origin and biology</p>
                            </div>
                        </Link>
                        <Link href="/locations" className={s.featureLink}>
                            <div className={s.featureItem}>
                                <span className={s.featureIcon}>📍</span>
                                <h4>Locations</h4>
                                <p>Character locations throughout the universe</p>
                            </div>
                        </Link>
                        <Link href="/episodes" className={s.featureLink}>
                            <div className={s.featureItem}>
                                <span className={s.featureIcon}>⚡</span>
                                <h4>Episodes</h4>
                                <p>Participation in key series events</p>
                            </div>
                        </Link>
                    </div>

                    <div className={s.ctaSection}>
                        <Link href="/characters" className={s.exploreButton}>
                            🚀 Explore Characters
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
