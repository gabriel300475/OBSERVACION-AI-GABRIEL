import { useEffect, useState } from 'react'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { formatTime } from '../models'
import { deleteObservation, listObservations } from '../storage'
export default function History({ onOpen, userId }) {
	const [items, setItems] = useState([]); const [error, setError] = useState('')
	useEffect(() => { listObservations(userId).then(setItems).catch(() => setError('No se pudo cargar el historial.')) }, [userId])
	const remove = async id => { try { await deleteObservation(id, userId); setItems(x => x.filter(item => item.id !== id)) } catch { setError('No se pudo eliminar la observación.') } }
	return <main className="history"><div className="history-header"><div><span className="kicker">archivo / sesiones guardadas</span><h1>Historial de observaciones</h1></div><span className="history-total">{items.length} registros</span></div>{error && <p className="form-error">{error}</p>}{items.length ? <div className="history-list">{items.map(item => <article className="history-card" key={item.id} onClick={() => onOpen(item)}><div className="history-main"><span>{item.fecha} · {item.grupo || 'Grupo sin registrar'}</span><h2>{item.docente}</h2><p>{item.asignatura || 'Actividad sin nombre'}</p></div><div className="history-time"><small>Tiempo</small><strong>{formatTime(item.elapsedSeconds)}</strong></div><button className="icon-button delete" onClick={e => { e.stopPropagation(); remove(item.id) }} aria-label="Eliminar observación" title="Eliminar observación"><Trash2 size={17} /></button><ArrowUpRight className="open-arrow" size={20} /></article>)}</div> : <div className="history-empty"><h2>Aún no hay observaciones</h2><p>Las sesiones que guardes aparecerán aquí para volver a consultarlas.</p></div>}</main>
}
