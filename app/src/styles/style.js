import { style, rstyle } from '../../../appNstudio/css.js'

style('*', {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0
});
style('body', {
    background: '#18181c',
    fontFamily: "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#e0e0e0',
    minHeight: '100vh'
});
style('.div', {
    background: 'rgba(35,35,43,0.65)',
    width: 'min(500px, 90%)',
    margin: '120px auto 0',
    padding: '2rem 2.5rem',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #2d2d38',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
});
style('h1', {
    fontSize: '2.5em',
    marginBottom: '1.5rem',
    fontWeight: 700,
    letterSpacing: '1px',
    color: 'transparent',
    textShadow: '0 2px 8px rgba(33,150,243,0.08)',
    position: 'relative',
    zIndex: 1,
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
style('button', {
    marginTop: '1rem',
    background: '#ff6ec4',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1.1em',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
    boxShadow: '0 2px 8px rgba(162,89,247,0.15)',
    position: 'relative',
    zIndex: 1,
    animation: 'buttonPulse 2s infinite alternate',
});
style('@keyframes buttonPulse', rstyle('0%', {
    transform: 'scale(1)',
    boxShadow: '0 2px 8px rgba(162,89,247,0.15)'
})+rstyle('100%', {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(255,110,196,0.25)'
}))
style('button:hover', {
    background: 'linear-gradient(90deg, #00eaff 0%, #ff6ec4 50%, #a259f7 100%)',
    transform: 'scale(1.07)',
    color: '#fff',
});
style('.new', {
    background: '#23232b',
    color: '#a259f7',
    fontWeight: 'bold',
    border: '2px solid #a259f7',
    marginLeft: '1rem',
    boxShadow: 'none',
    position: 'relative',
    zIndex: 1,
    animation: 'newBtnAnim 3s infinite alternate',
});
style('.new:hover', {
    background: 'linear-gradient(90deg, #a259f7, #ff6ec4, #00eaff)',
    color: '#fff !important',
});
