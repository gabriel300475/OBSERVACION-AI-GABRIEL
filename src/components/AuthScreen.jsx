import { useState } from 'react'
import { ArrowRight, BookOpen, LoaderCircle } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../supabase'

export default function AuthScreen() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async event => {
    event.preventDefault(); setMessage(''); setLoading(true)
    const result = mode === 'login' ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (result.error) setMessage(result.error.message.includes('Invalid login') ? 'Correo o contraseña incorrectos.' : result.error.message)
    else if (mode === 'signup') setMessage('Cuenta creada. Revisa tu correo para confirmar el acceso.')
  }
  return <main className="auth-page"><div className="auth-aside"><div className="brand auth-brand"><div className="brand-mark"><BookOpen size={20} /></div><div><strong>Observador <em>NEM</em></strong><span>bitácora de aula</span></div></div><div className="auth-quote"><span className="eyebrow">Acompañamiento pedagógico</span><h1>Observar para <i>comprender.</i></h1><p>Un espacio privado para registrar evidencias, conversar sobre la práctica y acompañar el aprendizaje.</p></div></div><section className="auth-card"><span className="kicker">{mode === 'login' ? 'bienvenido de nuevo' : 'comienza tu registro'}</span><h2>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2><p className="auth-help">{mode === 'login' ? 'Accede a tus observaciones guardadas.' : 'Usa un correo institucional o personal.'}</p>{!isSupabaseConfigured ? <div className="config-message">Falta configurar Supabase. Copia `.env.example` como `.env` y agrega las credenciales de tu proyecto.</div> : <form onSubmit={submit}><label>Correo electrónico<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@escuela.edu.mx" required /></label><label>Contraseña<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" minLength="6" required /></label>{message && <p className="auth-message">{message}</p>}<button className="button save-button auth-submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={17} /> : <ArrowRight size={17} />}{mode === 'login' ? 'Entrar a mi espacio' : 'Crear mi cuenta'}</button></form>}{isSupabaseConfigured && <button className="auth-switch" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}>{mode === 'login' ? '¿Aún no tienes cuenta? Regístrate' : 'Ya tengo una cuenta'}</button>}</section></main>
}
