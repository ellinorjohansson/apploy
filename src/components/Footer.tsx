import { FooterVariation, FooterCardVariation} from "@digi/arbetsformedlingen"
import { DigiFooter, DigiFooterCard, DigiIconAccessibilityUniversal, DigiIconSign, DigiIconGlobe, DigiIconEnvelope } from "@digi/arbetsformedlingen-react"
import "../styles/components/Footer.css"
import { CustomLinkButton } from "./buttons/CustomLinkButton"

export const Footer = () => {


 
    const handleReturn = () => {
        window.scrollTo({ top: 0, left: 0})
    }
    return (
        <div className="foot-wrapper">
            <DigiFooter afVariation={FooterVariation.SMALL}>
                <div slot="content-top" className="foot-container">
                    <div className="first-wrapper">
                        <DigiFooterCard afType={FooterCardVariation.ICON}>
                            <ul>
                                <li>
                                    <a href="#">
                                        <DigiIconAccessibilityUniversal></DigiIconAccessibilityUniversal>
                                        Tillgänglighetsredogörelse
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <DigiIconSign></DigiIconSign>
                                        Teckenspråk
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <DigiIconGlobe></DigiIconGlobe>
                                        Other languages
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <DigiIconEnvelope></DigiIconEnvelope>
                                        Mejla vår funktionbrevlåda
                                    </a>
                                </li>
                            </ul>
                        </DigiFooterCard>
                        <DigiFooterCard>
                            <ul>
                                <li>
                                    <a href="#">
                                        Om oss
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Vanliga frågor
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Kundservice
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Integritetspolicy
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Villkor
                                    </a>
                                </li>
                            </ul>
                        </DigiFooterCard>
                    </div>
                    <div className="second-wrapper">     
                        <div>
                            <DigiFooterCard>
                                <a href="#">Kontakta vår kundtjänst</a>
                                <p>Telefon: 0771-60 0001 <br/> Öppettider: Vardagar 08:00-16:30</p>
                            </DigiFooterCard>
                        </div>
                    </div>
                    <div>
                        <div className="button-wrapper">
                            <CustomLinkButton afHref="#" onClick={handleReturn}>
                                Till toppen
                            </CustomLinkButton>
                        </div>
                    </div>
                </div>
                <div slot="content-bottom-left">
                    <address>
                        <ul>                        
                            <li>
                                <span>Storgatan 12, 123 45</span>
                                <p>Fantasistad</p>
                            </li>
                            <li>
                                <span>Telefon:</span>
                                <a href="+46123456789">012-345 67 89</a>
                            </li>
                            <li>
                                <div>
                                    <DigiIconEnvelope></DigiIconEnvelope>
                                    <span>E-post:</span>
                                </div>
                                <a href="mailto:kontakt@foretagsnamn.se">kontakt@foretagsnamn.se</a>
                            </li>
                        </ul>
                    </address>
                </div>
                <div slot="content-bottom-right">
                    <p>Följ oss på</p>
                    <a href="#">Facebook</a>
                    <a href="#">Youtube</a>
                    <a href="#">Linkedin</a>
                    <a href="#">Instagram</a>
                </div>
            </DigiFooter>
        </div>
    )
}