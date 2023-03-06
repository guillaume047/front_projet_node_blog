import React from "react";
import Menu from "@/components/Menu";
import Head from "next/head";
import {useRouter} from "next/router";
import * as process from "process";

interface IProps {
    title: string
    children: React.ReactNode
}

const BaseLayout = ({children, title}: IProps) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} - {title}</title>
            </Head>

            <body className="flex flex-col bg-slate-100 h-screen">
            {router.pathname !== '/auth/login' && <Menu/>}
            <div className="flex-row my-10">
                {children}
            </div>
            </body>
        </>
    )
}

export default BaseLayout
