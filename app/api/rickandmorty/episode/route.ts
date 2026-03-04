import {SERVER_API_URL} from "@/app/lib/rickAndMortyApi";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(`${SERVER_API_URL}/episode`);
    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
    });

    try {
        const response = await fetch(url.toString(), {cache: "no-store"});
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch {
        return NextResponse.json({error: "Failed to fetch episodes"}, {status: 500});
    }
}
