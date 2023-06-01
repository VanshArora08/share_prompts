// import React from 'react'
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import '@styles/globals.css'

export const metadata = {
    title: "promptopia",
    description: "Discover and share the best AI prompts"
}

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav/>
                        {children}
                    </main>
                </Provider>        
            </body>
        </html>
    )
}
