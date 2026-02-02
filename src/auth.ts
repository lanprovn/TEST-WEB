import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            name: "Demo Account",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "demo@highlands.com" },
                password: { label: "Password", type: "password", placeholder: "123456" },
            },
            authorize: async (credentials) => {
                // MOCK LOGIN logic for demo purposes
                if (credentials.email === "demo@highlands.com" && credentials.password === "123456") {
                    return {
                        id: "1",
                        name: "Khách Hàng Demo",
                        email: "demo@highlands.com",
                        image: "https://github.com/shadcn.png"
                    }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login
            return !!auth
        },
    },
})
