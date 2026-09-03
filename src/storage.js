import { supabase } from './supabase'

export async function saveObservation(obs, userId) {
	const payload = {
		user_id: userId,
		docente: obs.docente,
		grupo: obs.grupo,
		asignatura: obs.asignatura,
		fecha: obs.fecha,
		campo_formativo: Array.isArray(obs.campoFormativo) ? obs.campoFormativo.join(', ') : obs.campoFormativo,
		ejes: obs.ejes || [],
		elapsed_seconds: obs.elapsedSeconds || 0,
		bitacora: obs.bitacora || [],
		ratings: obs.ratings || {},
		feedback: obs.feedback || {},
		created_at: obs.createdAt ? new Date(obs.createdAt).toISOString() : new Date().toISOString(),
	}

	if (obs.id) payload.id = obs.id

	const { error } = await supabase.from('observations').upsert(payload)
	if (error) throw error
}

export async function listObservations(userId) {
	const { data, error } = await supabase
		.from('observations')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false })
	
	if (error) throw error
	
	return data.map(item => ({
		id: item.id,
		docente: item.docente,
		grupo: item.grupo,
		asignatura: item.asignatura,
		fecha: item.fecha,
		campoFormativo: item.campo_formativo ? item.campo_formativo.split(',').map(campo => campo.trim()).filter(Boolean) : [],
		ejes: item.ejes || [],
		elapsedSeconds: item.elapsed_seconds,
		bitacora: item.bitacora || [],
		ratings: item.ratings || {},
		feedback: item.feedback || {},
		createdAt: new Date(item.created_at).getTime()
	}))
}

export async function deleteObservation(id, userId) {
	const { error } = await supabase
		.from('observations')
		.delete()
		.eq('id', id)
		.eq('user_id', userId)
		
	if (error) throw error
}
