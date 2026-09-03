import { useEffect, useState } from 'react'
import { BookOpen, Check, ChevronRight, LogOut, Plus, Save } from 'lucide-react'
import { blankObservation } from './models'
import { saveObservation } from './storage'
import { isSupabaseConfigured, supabase } from './supabase'
import AuthScreen from './components/AuthScreen'
import SessionForm from './components/SessionForm'
import Timer from './components/Timer'
import LiveLog from './components/LiveLog'
import RatingGrid from './components/RatingGrid'
import FeedbackForm from './components/FeedbackForm'
import History from './components/History'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [observation, setObservation] = useState(blankObservation)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState('observation')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  useEffect(() => { if (!isSupabaseConfigured) { setAuthLoading(false); return undefined }; supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setAuthLoading(false) }); const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null)); return () => listener.subscription.unsubscribe() }, [])
  const update = next => { setObservation(next); setError('') }
  const save = async () => { if (!observation.docente.trim()) { setError('Indica el nombre del docente para guardar.'); return }; try { await saveObservation(observation, user.id); setNotice('Observación guardada'); setTimeout(() => setNotice(''), 2000) } catch { setError('No se pudo guardar. Revisa la configuración de Supabase.') } }
  const open = item => { setObservation(item); setRunning(false); setTab('observation') }
  const addLog = entry => update({ ...observation, bitacora: [...observation.bitacora, entry] })
  const newObservation = () => { setObservation(blankObservation()); setRunning(false); setError(''); setTab('observation') }
  if (authLoading) return <div className="loading-screen">Cargando tu espacio...</div>
  if (!user) return <AuthScreen />
  return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark"><BookOpen size={20} /></div><div><strong>Observador <em>NEM</em></strong><span>bitácora de aula</span></div></div><nav><button className={tab === 'observation' ? 'nav-active' : ''} onClick={() => setTab('observation')}>Observación</button><button className={tab === 'history' ? 'nav-active' : ''} onClick={() => setTab('history')}>Historial</button></nav><button className="new-button" onClick={newObservation}><Plus size={17} />Nueva observación</button><button className="logout-button" onClick={() => supabase.auth.signOut()} title="Cerrar sesión" aria-label="Cerrar sesión"><LogOut size={17} /></button></header>
    {tab === 'history' ? <History onOpen={open} userId={user.id} /> : <main className="workspace"><div className="intro"><div><span className="eyebrow">Instrumento de acompañamiento pedagógico</span><h1>Observar para <i>comprender.</i></h1><p>Registra la sesión con atención, reúne evidencias y abre una conversación significativa.</p></div><div className="intro-rule"><span>Sesión activa</span><ChevronRight size={16} /></div></div><SessionForm observation={observation} onChange={update} /><Timer seconds={observation.elapsedSeconds} running={running} onTick={() => setObservation(current => ({ ...current, elapsedSeconds: current.elapsedSeconds + 1 }))} onToggle={() => setRunning(value => !value)} onStop={() => setRunning(false)} /><LiveLog bitacora={observation.bitacora} elapsedSeconds={observation.elapsedSeconds} onAdd={addLog} onRemove={id => update({ ...observation, bitacora: observation.bitacora.filter(entry => entry.id !== id) })} /><RatingGrid ratings={observation.ratings} onRate={(key, level) => update({ ...observation, ratings: { ...observation.ratings, [key]: level } })} /><FeedbackForm feedback={observation.feedback} onChange={feedback => update({ ...observation, feedback })} /><div className="save-row">{error && <span className="form-error">{error}</span>}<button className="button save-button" onClick={save}><Save size={17} />Guardar observación</button></div></main>}
    {notice && <div className="toast"><Check size={17} />{notice}</div>}
  </div>
}
