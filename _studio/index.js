var F=(o,t,...e)=>({type:o,props:{...t,children:e.flat().map(i=>typeof i=="object"?i:j(i))}}),j=o=>({type:"TEXT_ELEMENT",props:{nodeValue:o,children:[]}}),y=o=>o.startsWith("on"),O=o=>o!=="children"&&!y(o),x=(o,t)=>{let e=o.type==="TEXT_ELEMENT"?document.createTextNode(""):document.createElement(o.type);return Object.keys(o.props).filter(y).forEach(i=>{let s=i.toLowerCase().substring(2);e.addEventListener(s,o.props[i])}),Object.keys(o.props).filter(O).forEach(i=>{i==="class"?e.className=o.props[i]:e[i]=o.props[i]}),o.props.children.forEach(i=>x(i,e)),o.dom=e,t.appendChild(e),e},S=(o,t,e)=>{if(!t)x(e,o);else if(!e)o.removeChild(t.dom);else if(t.type!==e.type){let i=x(e,o);o.replaceChild(i,t.dom)}else if(typeof e.type=="string"){let i=e.dom=t.dom,s=t.props||{},l=e.props||{};Object.keys(s).filter(c=>c!=="children").forEach(c=>{if(!(c in l))if(y(c)){let b=c.toLowerCase().substring(2);i.removeEventListener(b,s[c])}else c==="class"?i.className="":i[c]=""}),Object.keys(l).filter(c=>c!=="children").forEach(c=>{if(s[c]!==l[c])if(y(c)){let b=c.toLowerCase().substring(2);s[c]&&i.removeEventListener(b,s[c]),i.addEventListener(b,l[c])}else c==="class"?i.className=l[c]:i[c]=l[c]});let p=t.props.children,d=e.props.children,f=Math.max(p.length,d.length);for(let c=0;c<f;c++)S(i,p[c],d[c])}else e.type==="TEXT_ELEMENT"&&(t.props.nodeValue!==e.props.nodeValue&&(t.dom.nodeValue=e.props.nodeValue),e.dom=t.dom)},E=o=>{let e=new DOMParser().parseFromString(o.trim(),"text/html");return T(e.body.firstChild)},T=o=>{if(o.nodeType===Node.TEXT_NODE)return j(o.nodeValue);let t={};Array.from(o.attributes).forEach(i=>{t[i.name]=i.value});let e=Array.from(o.childNodes).map(T);return F(o.tagName.toLowerCase(),t,...e)};var z={};function r(o,t){let e=M(o,t);z[o]=e,u(e)}function M(o,t){if(typeof t=="string")return`${o} { ${t} }`;let e=`${o} {
`;for(let i in t)if(t.hasOwnProperty(i)){let s=t[i],l=i.replace(/([A-Z])/g,"-$1").toLowerCase();e+=`  ${l}: ${s};
`}return e+=`}
`,e}var C=class{constructor(t=document){this.base=t?t.getElementById("base"):null,this.oldVDom=null,this.state={},this.style={},this.actions={},this.config={},this.initRouter()}setConfig(t){this.config=t,this.config.tailwind&&this.injectTailwind(),this.handleRoute(window.location.pathname)}initRouter(){window.addEventListener("popstate",()=>{this.handleRoute(window.location.pathname)})}handleRoute(t){if(!this.config.routes)return;let e=this.config.routes[t];if(!e){let s=Object.keys(this.config.routes).find(l=>t.endsWith(l)&&l!=="/");e=s?this.config.routes[s]:this.config.routes["/"]}this.navigate(e,null,!1)}injectTailwind(){if(document.head.querySelector('script[src*="tailwindcss"]'))return;let t=document.createElement("script");t.src="https://cdn.tailwindcss.com",document.head.appendChild(t)}setState(t){Object.assign(this.state,t),this.render()}async render(){if(!this.base&&!this.currentFrame){console.error("Rendering Error: 1101");return}let t=await this.getCanvas();if(t===null)return;let e=E(t);this.injectActions(e),this.oldVDom?S(this.base,this.oldVDom,e):this.base&&(this.base.innerHTML="",x(e,this.base)),this.oldVDom=e,this.style.style&&this.updateStyles()}async getCanvas(){if(!this.currentFrame)return null;let t=await this.currentFrame();for(let e in this.state){let i=new RegExp(`{{\\s*${e}\\s*}}`,"g");t=t.replace(i,this.state[e])}return t}injectActions(t){if(!t)return;let e=t.props.id;if(e&&this.actions[e]){let i=this.actions[e];t.props[`on${i.type}`]=i.func}t.props.children&&t.props.children.forEach(i=>this.injectActions(i))}navigate(t,e=null,i=!0){if(typeof t=="string"){let l=this.config.routes[t];if(l)return i&&history.pushState({},"",t),this.navigate(l,e,!1);console.error(`Route ${t} not found`);return}let s=typeof t=="function"?t(e):t;if(this.currentFrame=s.canvas,this.actions={},s.action&&(Array.isArray(s.action)?s.action:[s.action]).forEach(p=>{this.addEvent(p.id,{func:p.func,type:p.type})}),s.style){let l=typeof s.style=="string"?s.style:JSON.stringify(s.style);this.addStyle(l)}if(s.state?this.setState(s.state):this.render(),i&&typeof t=="function"){let l=Object.keys(this.config.routes).find(p=>this.config.routes[p]===t);l&&history.pushState({},"",l)}}addEvent(t,{func:e,type:i}){this.actions[t]={func:e,type:i}}addStyle(t){this.style.style=t,this.updateStyles()}updateStyles(){let t=document.head.querySelector("style#studio-style");t||(t=document.createElement("style"),t.id="studio-style",document.head.appendChild(t)),t.textContent=this.style.style||""}addDOMStyle(t){let e=document.head.querySelector("style#studio-injected-style");e||(e=document.createElement("style"),e.id="studio-injected-style",document.head.appendChild(e)),e.textContent+=t}},v=new C,k=(o,t)=>v.navigate(o,t);var u=o=>v.addDOMStyle(o);var n={primary:"#6366F1",background:"#0F172A",accent:"#06B6D4",text:"#F8FAFC",gray:{400:"#94A3B8",500:"#64748B",700:"#334155",800:"#1E293B"},gradient:"linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)",gradientHover:"linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)",border:"rgba(255, 255, 255, 0.1)",glass:"rgba(15, 23, 42, 0.6)"},a={xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},m={sm:"4px",md:"8px",lg:"12px",full:"9999px"};r(".btn",{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:`${a.md} ${a.xl}`,borderRadius:m.full,fontWeight:"600",fontSize:"0.95rem",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",border:"none",outline:"none",gap:"8px",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"});r(".btn:active",{transform:"scale(0.96)"});r(".btn-primary",{background:n.gradient,color:n.text,boxShadow:"0 10px 15px -3px rgba(99, 102, 241, 0.3)"});r(".btn-primary:hover",{background:n.gradientHover,boxShadow:"0 20px 25px -5px rgba(99, 102, 241, 0.4)",transform:"translateY(-2px)"});r(".btn-secondary",{background:n.gray[800],color:n.text,border:`1px solid ${n.border}`});r(".btn-secondary:hover",{background:n.gray[700],borderColor:"rgba(255, 255, 255, 0.2)"});r(".btn-ghost",{background:"transparent",color:n.gray[400],boxShadow:"none"});r(".btn-ghost:hover",{color:n.text,background:n.glass});var $=({id:o,label:t,variant:e="primary",icon:i=""})=>({canvas:()=>`
            <button id="${o}" class="btn btn-${e}">
                ${i?`<span>${i}</span>`:""}
                ${t}
            </button>
        `,action:[]});r(".home-wrapper",{width:"100vw",height:"100vh",overflow:"hidden",position:"relative",backgroundColor:n.background,display:"flex",alignItems:"center",justifyContent:"center",perspective:"1000px"});var W=`
    @keyframes blob-float {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes pulse-soft {
        0% { opacity: 0.4; transform: scale(1); }
        100% { opacity: 0.6; transform: scale(1.1); }
    }
`;u(W);r(".blob",{position:"absolute",borderRadius:"50%",filter:"blur(100px)",zIndex:"1",animation:"blob-float 20s infinite alternate ease-in-out"});r(".blob-primary",{width:"500px",height:"500px",background:n.primary,top:"-10%",left:"-10%",opacity:"0.4"});r(".blob-accent",{width:"400px",height:"400px",background:n.accent,bottom:"10%",right:"5%",opacity:"0.3",animationDelay:"-5s"});r(".hero-card",{zIndex:"10",textAlign:"center",padding:"64px",backgroundColor:"rgba(255, 255, 255, 0.03)",backdropFilter:"blur(20px)",borderRadius:"32px",border:`1px solid ${n.border}`,boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)",maxWidth:"800px",width:"90%",transition:"all 0.5s ease"});u(`
    @media (max-width: 768px) {
        .hero-card {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            padding: 24px !important;
            border: none !important;
        }
        .hero-title {
            font-size: 3rem !important;
        }
    }
`);r(".hero-badge",{display:"inline-block",padding:"6px 16px",borderRadius:m.full,backgroundColor:"rgba(99, 102, 241, 0.1)",color:"#818CF8",fontSize:"0.8rem",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"24px",border:"1px solid rgba(99, 102, 241, 0.2)"});r(".hero-title",{fontSize:"4.5rem",fontWeight:"900",color:n.text,lineHeight:"1.1",marginBottom:"24px",letterSpacing:"-0.04em"});r(".hero-title span",{background:n.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"});r(".hero-subtitle",{fontSize:"1.25rem",color:n.gray[400],maxWidth:"600px",margin:"0 auto 40px auto",lineHeight:"1.6"});var R=()=>{let o=$({id:"start-btn",label:"Get Started",variant:"primary",icon:"\u{1F680}"}),t=$({id:"docs-btn",label:"Read Documentation",variant:"ghost"});return{canvas:()=>`
            <div class="home-wrapper">
                <div class="blob blob-primary"></div>
                <div class="blob blob-accent"></div>
                
                <div class="hero-card">
                    <div class="hero-badge">v1.1.6 \u2014 Lightspeed Beta</div>
                    <h1 class="hero-title">Build <span>Faster</span> with Studio</h1>
                    <p class="hero-subtitle">
                        The minimal reactive framework designed for modern web engineers who value 
                        performance, purity, and pixel-perfection.
                    </p>
                    
                    <div class="flex gap-4 justify-center">
                        ${o.canvas()}
                        ${t.canvas()}
                    </div>
                </div>
            </div>
        `,action:[{id:"start-btn",type:"click",func:()=>k("/docs")},{id:"docs-btn",type:"click",func:()=>k("/docs")}]}};r(".navbar",{position:"fixed",top:"0",left:"0",right:"0",height:"64px",backgroundColor:n.glass,backdropFilter:"blur(12px)",borderBottom:`1px solid ${n.border}`,display:"flex",alignItems:"center",padding:`0 ${a.xl}`,zIndex:"1000",justifyContent:"space-between"});r(".menu-toggle",{display:"none",backgroundColor:"transparent",border:"none",color:n.text,fontSize:"1.5rem",cursor:"pointer",padding:a.sm,marginRight:a.sm});u(`
    @media (max-width: 1024px) {
        .navbar {
            padding: 0 ${a.lg};
        }
        .menu-toggle {
            display: block;
        }
        .search-container, .nav-links {
            display: none;
        }
    }
`);r(".nav-logo",{fontSize:"1.25rem",fontWeight:"800",color:n.text,display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"});r(".nav-logo span",{background:n.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"});r(".search-container",{position:"relative",width:"320px"});r(".search-input",{width:"100%",backgroundColor:"rgba(255, 255, 255, 0.05)",border:`1px solid ${n.border}`,borderRadius:m.md,padding:`${a.sm} ${a.md} ${a.sm} 36px`,color:n.text,fontSize:"0.9rem",transition:"all 0.3s ease"});r(".search-input:focus",{outline:"none",borderColor:n.primary,backgroundColor:"rgba(255, 255, 255, 0.08)",boxShadow:"0 0 0 2px rgba(99, 102, 241, 0.2)"});r(".search-icon",{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:n.gray[500],pointerEvents:"none"});var I=()=>({canvas:()=>`
            <nav class="navbar">
                <div class="flex items-center gap-4">
                    <button id="mobile-menu-btn" class="menu-toggle">\u2630</button>
                    <a href="/" class="nav-logo">
                        <span>Studio</span>Framer
                    </a>
                </div>
                
                <div class="search-container">
                    <span class="search-icon">\u{1F50D}</span>
                    <input type="text" class="search-input" placeholder="Search documentation...">
                </div>
                
                <div class="nav-links flex gap-6 items-center">
                    <a href="/docs" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Docs</a>
                    <a href="https://github.com" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">GitHub</a>
                </div>
            </nav>
        `,action:[{id:"mobile-menu-btn",type:"click",func:()=>{let o=document.querySelector(".sidebar");o&&o.classList.toggle("mobile-open")}}]});r(".sidebar",{position:"fixed",top:"64px",left:"0",bottom:"0",width:"280px",padding:`${a.xl} ${a.lg}`,backgroundColor:n.background,borderRight:`1px solid ${n.border}`,overflowY:"auto",zIndex:"500",transition:"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"});u(`
    @media (max-width: 1024px) {
        .sidebar {
            transform: translateX(-100%);
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
        }
        .sidebar.mobile-open {
            transform: translateX(0);
        }
    }
`);r(".sidebar-category",{marginBottom:a.xl});r(".sidebar-category-title",{fontSize:"0.75rem",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.05em",color:n.text,marginBottom:a.sm,paddingLeft:a.sm});r(".sidebar-link",{display:"block",padding:`${a.sm} ${a.sm}`,fontSize:"0.9rem",color:n.gray[400],textDecoration:"none",borderRadius:"6px",transition:"all 0.2s ease",marginBottom:"2px"});r(".sidebar-link:hover",{color:n.text,backgroundColor:"rgba(255, 255, 255, 0.05)"});r(".sidebar-link.active",{color:"#818CF8",fontWeight:"600",backgroundColor:"rgba(99, 102, 241, 0.1)"});var A=({categories:o=[]})=>({canvas:()=>`
            <aside class="sidebar">
                ${o.map(t=>`
                    <div class="sidebar-category">
                        <div class="sidebar-category-title">${t.title}</div>
                        <div class="sidebar-links">
                            ${t.links.map(e=>`
                                <a href="${e.href}" class="sidebar-link ${e.active?"active":""}">
                                    ${e.label}
                                </a>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </aside>
        `,action:[]});r(".dashboard-container",{display:"flex",paddingTop:"64px",minHeight:"100vh",backgroundColor:n.background});r(".dashboard-content",{marginLeft:"280px",padding:`${a.xl} ${a.xl} 100px 100px`,width:"100%",maxWidth:"1000px",marginRight:"auto",transition:"all 0.3s ease"});u(`
    @media (max-width: 1200px) {
        .dashboard-content {
            padding: ${a.xl} ${a.xl} 100px 40px;
        }
    }
    @media (max-width: 1024px) {
        .dashboard-content {
            margin-left: 0;
            padding: ${a.xl} ${a.lg} 100px ${a.lg};
        }
    }
`);r(".doc-header",{marginBottom:a.xl});r(".doc-title",{fontSize:"2.25rem",fontWeight:"800",color:n.text,letterSpacing:"-0.025em",marginBottom:a.sm});r(".doc-description",{fontSize:"1.125rem",color:n.gray[400],lineHeight:"1.6",maxWidth:"700px"});var D=({title:o,description:t,children:e,categories:i})=>{let s=I(),l=A({categories:i});return{canvas:()=>`
            <div class="doc-wrapper">
                ${s.canvas()}
                
                <div class="dashboard-container">
                    ${l.canvas()}
                    
                    <main class="dashboard-content">
                        <header class="doc-header">
                            <h1 class="doc-title">${o}</h1>
                            <p class="doc-description">${t}</p>
                        </header>
                        
                        <div class="doc-body text-slate-300">
                            ${e}
                        </div>
                    </main>
                </div>
            </div>
        `,action:[...s.action,...l.action]}};r(".api-item",{marginBottom:"64px",borderBottom:`1px solid ${n.border}`,paddingBottom:"32px"});r(".api-name",{fontSize:"1.5rem",fontWeight:"700",color:n.primary,marginBottom:a.md,display:"flex",alignItems:"center",gap:"12px"});r(".api-badge",{fontSize:"0.7rem",padding:"2px 8px",borderRadius:m.sm,backgroundColor:"rgba(6, 182, 212, 0.1)",color:n.accent,border:"1px solid rgba(6, 182, 212, 0.2)"});r(".api-signature",{fontFamily:"monospace",padding:a.md,backgroundColor:"rgba(255, 255, 255, 0.03)",borderRadius:m.md,color:n.gray[400],marginBottom:a.lg});var h=({name:o,type:t,signature:e,description:i,exampleCode:s})=>`
        <div class="api-item" id="${o.toLowerCase()}">
            <h3 class="api-name">
                ${o}
                <span class="api-badge">${t}</span>
            </h3>
            <div class="api-signature">${e}</div>
            <p class="mb-6 text-slate-400 leading-relaxed">${i}</p>
            ${s||""}
        </div>
    `;r(".code-block",{backgroundColor:n.gray[800],borderRadius:m.lg,border:`1px solid ${n.border}`,margin:`${a.xl} 0`,overflow:"hidden",position:"relative"});r(".code-header",{display:"flex",justifyContent:"space-between",alignItems:"center",padding:`${a.sm} ${a.lg}`,backgroundColor:"rgba(0, 0, 0, 0.2)",borderBottom:`1px solid ${n.border}`,fontSize:"0.75rem",color:n.gray[500],textTransform:"uppercase",fontWeight:"600"});r(".code-content",{padding:a.lg,margin:"0",overflowX:"auto",fontFamily:'"Fira Code", "JetBrains Mono", source-code-pro, Menlo, Monaco, Consolas, monospace',fontSize:"0.875rem",lineHeight:"1.7",color:"#E2E8F0"});r(".copy-btn",{padding:"4px 8px",fontSize:"0.7rem",borderRadius:m.sm,backgroundColor:"rgba(255, 255, 255, 0.05)",border:`1px solid ${n.border}`,color:n.gray[400],transition:"all 0.2s ease",cursor:"pointer"});r(".copy-btn:hover",{backgroundColor:"rgba(255, 255, 255, 0.1)",color:n.text,borderColor:n.gray[500]});r(".copy-btn.copied",{color:n.accent,borderColor:n.accent,backgroundColor:"rgba(6, 182, 212, 0.1)"});r(".code-comment",{color:n.gray[500]});r(".code-keyword",{color:"#C084FC"});r(".code-string",{color:"#4ADE80"});r(".code-function",{color:"#60A5FA"});var g=({id:o=`cb-${Math.random().toString(36).substr(2,9)}`,language:t="javascript",code:e=""})=>{let i=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),s=/(['"`].*?['"`])|(\/\/.+)|(\/\*[\s\S]*?\*\/)|\b(const|let|var|export|import|from|return|if|else|function|async|await|class|constructor|export|default|null|undefined|true|false)\b|(\b\w+(?=\s*\())/g,l=i.replace(s,(d,f,c,b,B,P)=>f?`<span class="code-string">${d}</span>`:c||b?`<span class="code-comment">${d}</span>`:B?`<span class="code-keyword">${d}</span>`:P?`<span class="code-function">${d}</span>`:d),p=`copy-${o}`;return{canvas:()=>`
            <div class="code-block" id="${o}">
                <div class="code-header">
                    <span>${t}</span>
                    <button id="${p}" class="copy-btn">Copy</button>
                </div>
                <pre class="code-content"><code>${l}</code></pre>
            </div>
        `,action:[{id:p,type:"click",func:()=>{navigator.clipboard.writeText(e).then(()=>{let d=document.getElementById(p);if(d){let f=d.innerText;d.innerText="Copied!",d.classList.add("copied"),setTimeout(()=>{d.innerText=f,d.classList.remove("copied")},2e3)}})}}]}};function w(){let o=[{title:"Getting Started",links:[{label:"Introduction",href:"#intro",active:!0},{label:"Installation",href:"#install"},{label:"Folder Structure",href:"#structure"}]},{title:"State Hooks",links:[{label:"usePixel",href:"#usepixel"},{label:"useStore",href:"#usestore"}]},{title:"Styling",links:[{label:"style",href:"#style"},{label:"rstyle",href:"#rstyle"},{label:"injectCSS",href:"#injectcss"}]},{title:"Navigation",links:[{label:"navigate",href:"#navigate"}]}],t=g({language:"bash",code:`mkdir my-app
cd my-app
npx studio-framer init
npm install
npx studio-framer serve`}),e=g({language:"bash",code:"npm install studio-framer"}),i=g({language:"javascript",code:`const [getCount, setCount] = usePixel('count', 0);

// Update state
setCount(prev => prev + 1);

// UI
canvas: () => \`<button>Count: {{count}}</button>\``}),s=g({language:"javascript",code:"const userEmail = useStore('email');"}),l=g({language:"javascript",code:`style('.card', {
  padding: '20px',
  backgroundColor: '#fff'
});`}),p=g({language:"javascript",code:`const cssString = rstyle('.dynamic', {
  color: active ? 'red' : 'blue'
});`}),d=g({language:"javascript",code:"injectCSS(`@keyframes spin { ... }`);"}),f=g({language:"javascript",code:`// To a route
navigate('/docs');

// To a component
navigate(homePage);`}),c=g({language:"text",code:`/
\u251C\u2500\u2500 _studio-frame/       # Core Framework Engine
\u2502   \u251C\u2500\u2500 css.js           # Atomic CSS System
\u2502   \u251C\u2500\u2500 frame.js         # Studio Class & Router
\u2502   \u251C\u2500\u2500 server.js        # SPA Dev Server
\u2502   \u2514\u2500\u2500 vdom.js          # Virtual DOM Engine
\u251C\u2500\u2500 src/                 # Application Source
\u2502   \u251C\u2500\u2500 components/      # UI Components
\u2502   \u2502   \u251C\u2500\u2500 atoms/       # High-fidelity Atoms
\u2502   \u2502   \u2514\u2500\u2500 layout/      # Layout Containers
\u2502   \u251C\u2500\u2500 pages/           # Application Pages
\u2502   \u2514\u2500\u2500 styles/          # Design System
\u251C\u2500\u2500 index.html           # HTML Entry Point
\u251C\u2500\u2500 index.js             # App Initialization
\u2514\u2500\u2500 studio.config.js     # Framework Configuration`}),b=`
        <section id="intro" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Introduction</h2>
            <p class="text-slate-400 mb-4">
                Studio Framer is a next-generation JavaScript framework built for designers and engineers. 
                It combines the power of a reactive Virtual DOM with the simplicity of atomic styling.
            </p>
        </section>

        <section id="install" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Installation</h2>
            <p class="text-slate-400 mb-6">
                You can start a new project instantly using our scaffolding tool, or install it manually as a library.
            </p>
            
            <div class="mb-10">
                <h3 class="text-xl font-semibold text-slate-200 mb-4">1. Quick Start (Scaffold)</h3>
                ${t.canvas()}
            </div>

            <div>
                <h3 class="text-xl font-semibold text-slate-200 mb-4">2. Manual Installation</h3>
                ${e.canvas()}
            </div>
        </section>

        <section id="structure" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Folder Structure</h2>
            <p class="text-slate-400 mb-6">
                Studio projects are organized into a clear, modular structure that separates the core engine 
                from your application source.
            </p>
            ${c.canvas()}
        </section>

        <section id="usepixel" class="mb-20">
            ${h({name:"usePixel",type:"Hook",signature:"usePixel(name, initialValue)",description:"Atomic state management that triggers granular re-renders. Returns a getter and a setter.",exampleCode:i.canvas()})}
        </section>

        <section id="usestore" class="mb-20">
            ${h({name:"useStore",type:"Utility",signature:"useStore(key)",description:"Directly access a value from the global framework state.",exampleCode:s.canvas()})}
        </section>

        <section id="style" class="mb-20">
            ${h({name:"style",type:"CSS",signature:"style(selector, styleObject)",description:"Automatically converts a JS object to CSS and injects it into the DOM.",exampleCode:l.canvas()})}
        </section>

        <section id="rstyle" class="mb-20">
            ${h({name:"rstyle",type:"CSS",signature:"rstyle(selector, styleObject)",description:"Converts a JS object to a CSS string but does NOT inject it. Useful for dynamic inline styles or SSR.",exampleCode:p.canvas()})}
        </section>

        <section id="injectcss" class="mb-20">
            ${h({name:"injectCSS",type:"CSS",signature:"injectCSS(cssText)",description:"Injects raw CSS text directly into the document head.",exampleCode:d.canvas()})}
        </section>

        <section id="navigate" class="mb-20">
            ${h({name:"navigate",type:"Router",signature:"navigate(path | component, props = null)",description:"Programmable navigation supporting both route strings and framework components.",exampleCode:f.canvas()})}
        </section>
    `;return D({title:"Documentation",description:"Learn how to build lighting-fast interfaces with Studio.",categories:o,children:b})}var L={tailwind:!0,theme:{darkMode:!0},routes:{"/":R,"/docs":w}};v.setConfig(L);console.log("Studio Framer Initialized with Routing and Design System");
