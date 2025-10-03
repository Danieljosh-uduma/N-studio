import { style, rstyle } from "../../../appNstudio/css.js";
import { useStore } from "../../../appNstudio/frame.js";  

const theme = useStore('theme')

style('.dark', {
    backgroundColor: "#01111cff",
    color: '#f3f3f3',
    width: "100%",
    height: "100%"
})
style('.light', {
    backgroundColor: "#f3f3f3",
    color: '#01111cff'
})

style("*", {
    padding: '0',
    margin: "0",
    boxSizing: "border-box",
    transition: 'all 0.3s ease-in'
})
style("body", {
    fontFamily: "sans-serif"
})
style("li", {
    listStyle: "none",
    transition: "all 0.5s ease",
    cursor: "pointer",
})
style('li:hover', {
    textDecoration: 'underline'
})
style("ul", {
    display: "flex",
    gap: "30px",
})
style("header", {
    width: "100%",
    height: "100px",
    boxShadow: "0 2px 4px #0227422f",
    padding: "0 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})
style('h1', {
    fontSize: '3rem'
})
style('h2', {
    fontSize: '2.5rem'
})
style('h3', {
    fontSize: "2rem"
})
style('.logo', {
    fontWeight: 700,
    color: 'transparent',
    textShadow: '0 2px 8px rgba(33,150,243,0.08)',
    background: 'linear-gradient(90deg, #a259f7, #ff6ec4, #00eaff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'textGradientAnim 4s linear infinite',
    backgroundSize: '200% 200%',
});
style('@keyframes textGradientAnim', rstyle('0%', {
    backgroundPosition: '0% 50%',})+rstyle('50%', {
    backgroundPosition: '100% 50%'})+rstyle('100%', {
    backgroundPosition: '0% 50%'
}))
