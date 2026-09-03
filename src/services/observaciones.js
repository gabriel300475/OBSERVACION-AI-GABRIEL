import { supabase } from '../supabase'

export async function crearObservacionCompleta(docenteId, notasGenerales, criteriosEvaluados) {
  try {
    const { data: observacion, error: obsError } = await supabase
      .from('observations')
      .insert([
        { docente_id: docenteId, notas_generales: notasGenerales, estado: 'completada' }
      ])
      .select()
      .single()

    if (obsError) throw obsError

    const criteriosConId = criteriosEvaluados.map(item => ({
      observation_id: observacion.id,
      criterio: item.criterio,
      calificacion: item.calificacion,
      evidencia_observada: item.evidencia
    }))

    const { error: critError } = await supabase
      .from('observation_criteria')
      .insert(criteriosConId)

    if (critError) throw critError

    return { success: true, observacionId: observacion.id }
  } catch (error) {
    console.error('Error al guardar la observación:', error.message)
    return { success: false, error: error.message }
  }
}
