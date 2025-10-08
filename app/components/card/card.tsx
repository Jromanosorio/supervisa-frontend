import Link from "next/link";
import React from "react";

interface CardProps {
    service: string;
    data: string;
    description?: string;
    route?: string;
    icon: React.ReactNode;
}

export default function CardCustomComponent(props: CardProps) {
    return (
        <Link className="card w-[100%] max-w-[300px] border-2 p-4 rounded-md flex flex-col gap-2" href={`/${props.route}`}>
            {props.icon}
            <p className="font-bold text-[30px]">{props.data}</p>
            <h1 className="font-semibold">{props.service}</h1>
        </Link>
    )
}