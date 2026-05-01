const fs = require('fs');

const path = 'f:\\Web Design\\Tuskerways\\web templates\\2\\index.html';
let c = fs.readFileSync(path, 'utf8');

const repl = `                        {/* Feel Lanka — scattered animated line */}
                        <div style={{marginBottom:'1.4rem',lineHeight:1.05}}>
                            <style>
                                {\`
                                @keyframes scatterIn {
                                    0% {
                                        opacity: 0;
                                        transform: translate(calc(var(--rand-x) * 100px), calc(var(--rand-y) * 100px)) rotate(calc(var(--rand-r) * 180deg)) scale(0.2);
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
                                    animation: scatterIn 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                                }
                                \`}
                            </style>
                            <div id="feel-lanka-headline" style={{fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.4rem,3vw,2.4rem)',fontWeight:600,color:'rgba(255,255,255,0.82)',display:'block',margin:'0 auto',letterSpacing:'0.04em'}}>
                                {"Feel Lanka — Beyond Travel, Into Experience.".split(' ').map((word, wIndex, arr) => (
                                    <span key={wIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: wIndex !== arr.length - 1 ? '0.25em' : '0' }}>
                                        {word.split('').map((char, cIndex) => {
                                            const index = wIndex * 15 + cIndex;
                                            const rx = Math.sin(index * 13.46) * 1.5;
                                            const ry = Math.cos(index * 7.12) * 1.5;
                                            const rr = Math.sin(index * 5.51) * 2;
                                            // subtle stagger
                                            const delay = 0.1 + (Math.abs(Math.sin(index * 8.3)) * 0.9);
                                            return (
                                                <span 
                                                    key={cIndex} 
                                                    className="scatter-char" 
                                                    style={{
                                                        '--rand-x': rx,
                                                        '--rand-y': ry,
                                                        '--rand-r': rr,
                                                        animationDelay: \`\${delay}s\`
                                                    }}
                                                >
                                                    {char}
                                                </span>
                                            );
                                        })}
                                    </span>
                                ))}
                            </div>
                        </div>`;

let normC = c.replace(/\r\n/g, '\n');
const regex = /\{\/\* Feel Lanka — scattered animated line \*\/\}.*?<\/div>.*?<\/div>/s;

if (regex.test(normC)) {
    normC = normC.replace(regex, repl);
    fs.writeFileSync(path, normC, 'utf8');
    console.log("Success with Regex 2");
} else {
    console.log("Could not find scattered animated line section");
}
