'use client'

import { Provider } from 'jotai'

export default function AtomProvider({ children }: {children: React.ReactNode }) {
    return (
        <Provider>
            {children}
        </Provider>
    )
}