import { supabase } from './supabase'

export async function saveObservation(obs, userId) {
	const { error } = await supabase.from('observations').upsert({
		id: Number.isSafeInteger(obs.id) ? obs.id : undefined,
		user_id: userId,
		docente: obs.docente,
		grupo: obs.grupo,
		asignatura: obs.asignatura,
		fecha: obs.fecha,
		campo_formativo: obs.campoFormativo,
		ejes: obs.ejes,
		elapsed_seconds: obs.elapsedSeconds,
		bitacora: obs.bitacora,
		ratings: obs.ratings,
		feedback: obs.feedback,
		created_at: new Date(obs.createdAt).toISOString(),
	})
	if (error) throw error
}

export async function listObservations(userId) {
	const { data, error } = await supabase.from('observations').select('*').eq('user_id', userId).order('created_at', { ascending: false })
	if (error) throw error
	return data.map(item => ({ id: item.id, docente: item.docente, grupo: item.grupo, asignatura: item.asignatura, fecha: item.fecha, campoFormativo: item.campo_formativo, ejes: item.ejes || [], elapsedSeconds: item.elapsed_seconds, bitacora: item.bitacora || [], ratings: item.ratings || {}, feedback: item.feedback || {}, createdAt: new Date(item.created_at).getTime() }))
}

export async function deleteObservation(id, userId) {
	const { error } = await supabase.from('observations').delete().eq('id', id).eq('user_id', userId)
	if (error) throw error
}
