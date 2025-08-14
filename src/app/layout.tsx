import type { Metadata } from 'next'
import Providers from './providers'
import "./globals.css"

export const metadata: Metadata = {
    title: 'Vritti',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
            //     style={{
            //         background: `radial-gradient(circle at center,
            // #FBE5D1 0%,
            // #ffffff 100%
            //   )`,
            //     }}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
