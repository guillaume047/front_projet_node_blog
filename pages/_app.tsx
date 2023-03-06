import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import ProtectRoute from "@/components/ProtectRoute";
import {QueryClient, QueryClientProvider} from "react-query";

export default function App({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                staleTime: 1000 * 60 * 15, // 15 mins (time before the data is considered old & needs to be refetched)
                cacheTime: 1000 * 60 * 60 * 1, // 1 hour (time until inactive queries will be removed from the cache)
            },
            mutations: {
                retry: false,
            },
        },
    })

    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <ProtectRoute>
                        <Component {...pageProps} />
                    </ProtectRoute>
                </QueryClientProvider>
            </RecoilRoot>
        </>
    )
}
