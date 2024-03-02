'use client'
import { useSession } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/task">Task</a>
                    </li>
                    <li>
                        <a href="/auth/logout">Logout</a>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/auth/login">Login</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav;