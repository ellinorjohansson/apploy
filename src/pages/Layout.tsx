import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";
import { useReducer } from "react";
import { JobReducer } from "../reducers/SaveJobReducer";
import { JobsContext } from "../contexts/SaveJobContext";

export const Layout = () => {
    const [jobs, dispatch] = useReducer(JobReducer, []);

    return (  
        <JobsContext.Provider value={{ jobs, dispatch }}>
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
        </JobsContext.Provider>
    )
}