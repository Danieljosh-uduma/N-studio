import RootLayout from "../components/layout/root.js"
import { rstyle } from "../../../appNstudio/css.js"
import "../styles/base_css.js"

export default function Homepage() {
    const rootLayout = RootLayout(HeroSection)
    // const card = Card({
    //     title: "Sample Card",
    //     description: "This is a sample card description.",
    //     imageUrl: "/public/assets/image.jg"
    // })

    return ({
        canvas: () => `
            ${rootLayout.canvas()}
        `,
        style: rootLayout.style,
        action: rootLayout.action
    })
}

function HeroSection() {
    return ({
        canvas: () => `
            <section class='section__hero'>
                <div class='hero'>
                    <h1 class='logo'>Studio Framer</h1>
                    <div class='hero__container'>
                        <div>
                            <h2>Join us today.</h2>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                </div>
                </div>
            </section>
        `,
        style: rstyle('.hero', {
            width: '75%',
            height: '500px',
            boxShadow: '0 5px 8px #0227422f',
            borderRadius: '10px',
            margin: '40px auto',
            padding: "20px 40px"
        })+rstyle('hero__container', {

        })+rstyle('.hero h1', {
            textAlign: 'center'
        })+rstyle('.section__hero', {
            height: "100vh"
        })
    })
}