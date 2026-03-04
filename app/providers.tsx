"use client";

import {PropsWithChildren} from "react";
import {RickAndMortyProvider} from "@/app/store/RickAndMortyStore";

export const Providers = ({children}: PropsWithChildren) => {
    return <RickAndMortyProvider>{children}</RickAndMortyProvider>;
};
