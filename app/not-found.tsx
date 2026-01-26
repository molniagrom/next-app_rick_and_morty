import Link from 'next/link'
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

export default function NotFound() {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <HeadMeta title={"404 - Not Found"}/>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/" style={{color: '#ff9800', textDecoration: 'underline'}}>
                Return to Home Page
            </Link>
        </div>
    )
}