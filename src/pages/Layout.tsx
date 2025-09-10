import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";

export const Layout = () => {
    return (
    <>
        <DigiTypography
            afVariation={TypographyVariation.SMALL}
        >
            <header>
                <Header/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
                </footer>
        </DigiTypography>
    </>)
}