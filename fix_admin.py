import sys

with open(r'd:\Tuskerways\web templates\2\admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The component starts around 767 and ends around 1075
start_idx = 766 # 0-indexed for line 767
end_idx = 1074   # 0-indexed for line 1075

new_code = """        const PageHeadingsSection = ({ config, onUpdate }) => {
            const [activeSubTab, setActiveSubTab] = React.useState('index');
            
            const pagesHead = [
                { id: 'index', name: "Home Page", icon: "home" },
                { id: 'ourWay', name: "Our Way", icon: "compass" },
                { id: 'signatureJournal', name: "Journeys", icon: "map" },
                { id: 'dailyEscapes', name: "Daily", icon: "sun" },
                { id: 'grandEscapes', name: "Grand", icon: "globe" },
                { id: 'sriLankaEdit', name: "SL Edit", icon: "edit" },
                { id: 'tourPage', name: "Individual Tour Pages", icon: "map-pin" }
            ];

            const fontsArr = [
                { id: "'Elegant Woman Demo', serif", name: "Elegant Woman (Serif)" },
                { id: "'Outfit', sans-serif", name: "Outfit (Sans)" },
                { id: "'Playfair Display', serif", name: "Playfair Display (Serif)" },
                { id: "'Inter', sans-serif", name: "Inter (Sans)" }
            ];

            const currentPage = pagesHead.find(p => p.id === activeSubTab);

            const TypographyBlock = ({ label, prefix, colorClass }) => {
                const linkKey = `${activeSubTab}${prefix}Link`;
                const fontKey = `${activeSubTab}${prefix}Font`;
                const sizeKey = `${activeSubTab}${prefix}Size`;
                const isLinked = config[linkKey] && config[linkKey] !== 'custom';

                return (
                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h5 className={`text-[11px] font-bold uppercase tracking-widest ${colorClass}`}>{label}</h5>
                            <div className="flex items-center gap-2">
                                <label className="text-[8px] text-slate-600 font-black uppercase">Link:</label>
                                <select 
                                    value={config[linkKey] || "custom"} 
                                    onChange={e => onUpdate({ [linkKey]: e.target.value })} 
                                    className={`bg-white/5 border-none rounded-lg px-2 py-1 text-[9px] font-bold outline-none cursor-pointer ${colorClass}`}
                                >
                                    <option value="custom">Custom</option>
                                    <option value="heading">Global Heading</option>
                                    <option value="subheading">Global Subhead</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] text-slate-500 font-black uppercase">Font Family</label>
                                <select 
                                    disabled={isLinked}
                                    value={config[fontKey] || ""} 
                                    onChange={e => onUpdate({ [fontKey]: e.target.value })} 
                                    className={`w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white ${isLinked ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Default</option>
                                    {fontsArr.map(f => (<option key={f.id} value={f.id}>{f.name}</option>))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] text-slate-500 font-black uppercase">Size (px)</label>
                                <input 
                                    type="number" 
                                    value={config[sizeKey] || ""} 
                                    onChange={e => onUpdate({ [sizeKey]: parseInt(e.target.value) })} 
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                                />
                            </div>
                        </div>
                    </div>
                );
            };

            return (
                <section className="glass p-8 rounded-3xl animate-fadeIn space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div>
                            <h2 className="text-xl font-bold">Page-Specific Typography</h2>
                            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Granular control for every text unit</p>
                        </div>
                        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/50 rounded-2xl border border-white/5">
                            {pagesHead.map(p => (
                                <button key={p.id} onClick={() => setActiveSubTab(p.id)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center gap-2 ${activeSubTab === p.id ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                    <i data-lucide={p.icon} className="w-3.5 h-3.5"></i>
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="animate-fadeIn" key={activeSubTab}>
                        <div className="bg-slate-900/40 p-10 rounded-3xl border border-white/10 space-y-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                    <i data-lucide={currentPage.icon} className="w-6 h-6"></i>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{currentPage.name} Settings</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Customize or Link styles</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {/* Row 1 */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                                        <i data-lucide="layout" className="w-4 h-4 text-primary"></i>
                                        <h4 className="text-[10px] text-white uppercase font-black tracking-widest">Row 1: Master Hero Elements</h4>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <TypographyBlock label="Master Hero Title" prefix="Title" colorClass="text-primary" />
                                        <TypographyBlock label="Master Hero Subtitle" prefix="Desc" colorClass="text-primary" />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                                        <i data-lucide="type" className="w-4 h-4 text-amber-400"></i>
                                        <h4 className="text-[10px] text-white uppercase font-black tracking-widest">Row 2: Secondary Content Elements</h4>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <TypographyBlock label="Section Heading Text" prefix="SecTitle" colorClass="text-amber-400" />
                                        <TypographyBlock label="General Page Text (Body)" prefix="SecText" colorClass="text-amber-400" />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                {['index', 'dailyEscapes', 'grandEscapes', 'signatureJournal', 'tourPage'].includes(activeSubTab) && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                                            <i data-lucide="image" className="w-4 h-4 text-emerald-400"></i>
                                            <h4 className="text-[10px] text-white uppercase font-black tracking-widest">Row 3: Tour Cards Elements</h4>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <TypographyBlock label="Card Heading" prefix="CardTitle" colorClass="text-emerald-400" />
                                            <TypographyBlock label="Card Subtext" prefix="CardText" colorClass="text-emerald-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            );
        };
"""

# Splice the new code in
final_lines = lines[:start_idx] + [new_code + "\\n"] + lines[end_idx+1:]

with open(r'd:\Tuskerways\web templates\2\admin.html', 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print("Replacement complete.")
