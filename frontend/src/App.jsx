import { useEffect, useState } from 'react'
import {
  Activity, ArrowUpRight, Bot, Boxes, Check, ChevronRight, CircleHelp,
  Command, Cpu, GitBranch, LayoutDashboard, LifeBuoy, Plus, Search,
  Settings2, ShieldCheck, Sparkles, Terminal, Workflow, Zap, Bell,
  MoreHorizontal, Play, Clock3, Menu
} from 'lucide-react'

const API = 'http://127.0.0.1:8000/api'
const fallback = {
  metrics: [
    { label: 'Agents online', value: '08', change: '+2 this week' },
    { label: 'Tasks completed', value: '1,284', change: '+18.6%' },
    { label: 'Success rate', value: '98.4%', change: '+1.2%' },
    { label: 'Time saved', value: '42.8h', change: 'This month' }
  ],
  agents: [
    { name: 'Research Navigator', kind: 'Research', status: 'Active', tasks: 324, color: 'violet' },
    { name: 'Code Sentinel', kind: 'Engineering', status: 'Active', tasks: 218, color: 'blue' },
    { name: 'Workflow Pilot', kind: 'Automation', status: 'Idle', tasks: 176, color: 'cyan' }
  ],
  activity: [
    { title: 'Repository scan completed', detail: 'Code Sentinel · 2 minutes ago', status: 'Success' },
    { title: 'Research brief generated', detail: 'Research Navigator · 14 minutes ago', status: 'Success' },
    { title: 'Workflow waiting for approval', detail: 'Workflow Pilot · 28 minutes ago', status: 'Review' }
  ]
}

const nav = [
  { label: 'Workspace', items: [['Overview', LayoutDashboard], ['AI Agents', Bot], ['Workflows', Workflow], ['Tool Registry', Boxes]] },
  { label: 'Build & monitor', items: [['Runs & Logs', Terminal], ['Integrations', GitBranch], ['Security', ShieldCheck]] }
]

function App() {
  const [data, setData] = useState(fallback)
  const [apiStatus, setApiStatus] = useState('Checking')
  const [active, setActive] = useState('Overview')
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetch(`${API}/dashboard`)
      .then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json() })
      .then(d => { setData(d); setApiStatus('Connected') })
      .catch(() => setApiStatus('Demo mode'))
  }, [])

  const filteredAgents = data.agents.filter(a => `${a.name} ${a.kind}`.toLowerCase().includes(query.toLowerCase()))
  const toast = message => { setNotice(message); window.setTimeout(() => setNotice(''), 2800) }

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'show' : ''}`}>
      <div className="brand"><div className="brand-mark"><Command size={20}/></div><div><b>nova<span>mcp</span></b><small>AGENT OPERATIONS</small></div></div>
      <div className="workspace-switch"><div className="workspace-icon">N</div><div className="workspace-name"><b>Nova Workspace</b><small>Personal workspace</small></div><ChevronRight size={16}/></div>
      {nav.map(group => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(([label, Icon]) => <button key={label} className={`nav-item ${active === label ? 'selected' : ''}`} onClick={() => { setActive(label); setMenuOpen(false); if(label !== 'Overview') toast(`${label} view is a starter placeholder — connect your tools to enable it.`) }}><Icon size={17}/><span>{label}</span>{label === 'AI Agents' && <i className="nav-count">8</i>}</button>)}</div>)}
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><b>Build something<br/>extraordinary.</b><p>Connect tools. Create agents. Automate the impossible.</p><button onClick={() => toast('Agent builder starter flow coming next.')}>Explore builder <ArrowUpRight size={14}/></button></div>
        <button className="nav-item"><Settings2 size={17}/><span>Settings</span></button>
        <button className="nav-item"><LifeBuoy size={17}/><span>Help & support</span></button>
        <div className="profile"><div className="avatar">AA</div><div><b>Azan Akhunzada</b><small>Local administrator</small></div><MoreHorizontal size={18}/></div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu icon-btn" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18}/></button>
        <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14}/><b>{active}</b></div>
        <div className="top-actions"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search agents..."/><kbd>⌘ K</kbd></div><button className="icon-btn" onClick={() => toast('You are all caught up.')}><Bell size={17}/><i/></button><div className="top-avatar">AA</div></div>
      </header>

      <div className="content">
        <div className="welcome-row"><div><div className="eyebrow"><span className="pulse-dot"></span> YOUR AI COMMAND CENTER</div><h1>Build at the speed of <em>thought.</em></h1><p className="subtitle">Your agents are ready. What will you make happen today?</p></div><button className="primary-btn" onClick={() => toast('New agent setup is ready to be connected to your agent runtime.')}><Plus size={17}/> Create agent</button></div>

        <section className="hero">
          <div className="hero-glow"></div><div className="hero-copy"><div className="hero-chip"><Sparkles size={13}/> NOVA INTELLIGENCE</div><h2>One workspace.<br/><span>Infinite possibilities.</span></h2><p>Orchestrate AI agents, connect your tools, and turn complex workflows into effortless outcomes.</p><button className="hero-btn" onClick={() => toast('Opening the agent playground starter flow.')}><Play size={15} fill="currentColor"/> Launch playground <ChevronRight size={15}/></button></div>
          <div className="orb-scene"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit orbit-three"></div><div className="orb"><div className="orb-core"><Sparkles size={35}/></div></div><div className="float-node node-a"><Cpu size={17}/></div><div className="float-node node-b"><Workflow size={17}/></div><div className="float-node node-c"><Zap size={17}/></div><div className="orb-caption"><span className="pulse-dot"></span> MULTI-AGENT ENGINE <small>READY TO EXECUTE</small></div></div>
          <div className="hero-foot"><span><ShieldCheck size={14}/> Private by design</span><span><Activity size={14}/> Local-first architecture</span><span><Zap size={14}/> Tool-ready foundation</span></div>
        </section>

        <div className="section-heading"><div><h3>Workspace overview</h3><p>Live signals from your AI operations</p></div><button className="subtle-btn" onClick={() => { setApiStatus('Refreshing'); fetch(`${API}/dashboard`).then(r => r.json()).then(d => {setData(d);setApiStatus('Connected')}).catch(() => setApiStatus('Demo mode')) }}><Activity size={14}/> Refresh data</button></div>
        <section className="metrics">{data.metrics.map((m, i) => <div className="metric-card" key={m.label}><div className="metric-top"><span>{m.label}</span><span className={`metric-icon mi-${i}`}><Activity size={16}/></span></div><div className="metric-value">{m.value}</div><div className="metric-change"><span className="trend">↗</span> {m.change}</div><div className={`metric-spark spark-${i}`}><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>)}</section>

        <div className="lower-grid">
          <section className="panel agents-panel"><div className="panel-head"><div><h3>Your AI agents <span className="count-pill">{filteredAgents.length}</span></h3><p>Specialized intelligence, working together</p></div><button className="text-btn" onClick={() => toast('Agent directory is ready to extend.')}>View all <ChevronRight size={14}/></button></div><div className="agent-list">{filteredAgents.map((a, i) => <div className="agent-row" key={a.name}><div className={`agent-symbol ${a.color}`}><Bot size={20}/></div><div className="agent-info"><b>{a.name}</b><small>{a.kind} <span>·</span> {a.tasks} tasks</small></div><span className={`status ${a.status === 'Active' ? 'active' : 'idle'}`}><i/>{a.status}</span><button className="dots" onClick={() => toast(`${a.name}: agent details placeholder.`)}><MoreHorizontal size={18}/></button></div>)}{filteredAgents.length === 0 && <div className="empty">No agents match “{query}”.</div>}</div><button className="add-agent" onClick={() => toast('Create agent flow: connect a model, tools, and instructions.')}><Plus size={16}/> Add another agent</button></section>
          <section className="panel activity-panel"><div className="panel-head"><div><h3>Recent activity</h3><p>Everything happening across your workspace</p></div><button className="dots" onClick={() => toast('Activity options coming soon.')}><MoreHorizontal size={18}/></button></div><div className="activity-list">{data.activity.map((a, i) => <div className="activity-row" key={a.title}><div className={`activity-icon ai-${i}`}>{i === 0 ? <Check size={16}/> : i === 1 ? <Sparkles size={16}/> : <Clock3 size={16}/>}</div><div className="activity-info"><b>{a.title}</b><small>{a.detail}</small></div><span className={`activity-status ${a.status === 'Review' ? 'review' : ''}`}>{a.status}</span></div>)}</div><div className="api-state"><span className={`state-dot ${apiStatus === 'Connected' ? 'online' : ''}`}></span><span>Backend status</span><b>{apiStatus}</b><span className="api-endpoint">127.0.0.1:8000</span></div></section>
        </div>
        <footer><span>© 2026 NOVAMCP</span><span>BUILT FOR THE NEXT ERA OF WORK <span className="footer-star">✳</span></span><a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">API documentation <ArrowUpRight size={12}/></a></footer>
      </div>
    </main>
    {notice && <div className="toast"><Check size={16}/>{notice}</div>}
  </div>
}

export default App
