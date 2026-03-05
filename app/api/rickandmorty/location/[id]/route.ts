import {SERVER_API_URL} from "@/app/lib/rickAndMortyApi";
import {NextResponse} from "next/server";

type RouteContext = {
    params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
    const {id} = await context.params;

    try {
        const response = await fetch(`${SERVER_API_URL}/location/${id}`, {cache: "no-store"});
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});
    } catch {
        return NextResponse.json({error: "Failed to fetch location"}, {status: 500});
    }
}
