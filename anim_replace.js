const fs = require('fs');
let c = fs.readFileSync('f:\\Web Design\\Tuskerways\\web templates\\2\\index.html', 'utf8');

const repl = `                        {/* Feel Lanka — scattered animated line */}
                        <div style={{marginBottom:'1.4rem',lineHeight:1.05}}>
                            <style>
                                {\`
                                @keyframes scatterIn {
                                    0% {
                                        opacity: 0;
                                        transform: translate(calc(var(--rand-x) * 150px), calc(var(--rand-y) * 150px)) rotate(calc(var(--rand-r) * 180deg)) scale(0.2);
                                        filter: blur(12px);
                                    }
                                    100% {
                                        opacity: 1;
                                        transform: translate(0, 0) rotate(0deg) scale(1);
                                        filter: blur(0);
                                    }
                                }
                                .scatter-char {
                                    display: inline-block;
                                    opacity: 0;
                                    animation: scatterIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                                }
                                \`}
                            </style>
                            <div id="feel-lanka-headline" style={{fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.4rem,3vw,2.4rem)',fontWeight:600,color:'rgba(255,255,255,0.82)',display:'block',margin:'0 auto',letterSpacing:'0.04em'}}>
                                {"Feel Lanka — Beyond Travel, Into Experience.".split('').map((char, index) => {
                                    const rx = Math.sin(index * 13.46) * 1.5;
                                    const ry = Math.cos(index * 7.12) * 1.5;
                                    const rr = Math.sin(index * 5.51) * 2;
                                    const delay = 0.2 + (Math.abs(Math.sin(index * 8.3)) * 1.2);
                                    return (
                                        <span 
                                            key={index} 
                                            className="scatter-char" 
                                            style={{
                                                '--rand-x': rx,
                                                '--rand-y': ry,
                                                '--rand-r': rr,
                                                animationDelay: \`\${delay}s\`
                                            }}
                                        >
                                            {char === ' ' ? '\\u00A0' : char}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>`;

let normC = c.replace(/\r\n/g, '\n');
const regex = /\{\/\* Feel Lanka — single animated line \*\/\}.*?<\/div>/s;
if (regex.test(normC)) {
    normC = normC.replace(regex, repl);
    fs.writeFileSync('f:\\Web Design\\Tuskerways\\web templates\\2\\index.html', normC, 'utf8');
    console.log("Success with Regex");
} else {
    console.log("Could not find target");
}
