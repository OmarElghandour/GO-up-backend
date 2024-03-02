'use client'
import { SessionProvider, useSession } from "next-auth/react"

const Provider = ({children , session} : {children: React.ReactNode , session: any}) =>  {

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}