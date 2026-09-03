export const CAMPOS = ['Lenguajes', 'Saberes y Pensamiento Científico', 'Ética, Naturaleza y Sociedades', 'De lo Humano y lo Comunitario']
export const EJES = ['Inclusión', 'Pensamiento crítico', 'Interculturalidad crítica', 'Igualdad de género', 'Vida saludable', 'Apropiación de las culturas por la lectura y la escritura', 'Artes y experiencias estéticas']
export const DIMENSIONES = [
  { key: 'planificacion', label: 'Planificación y propósito', desc: 'El objetivo de la clase es claro y está alineado con el campo formativo.' },
  { key: 'gestion', label: 'Gestión del aula y tiempo', desc: 'Normas de convivencia, transiciones ágiles, aprovechamiento del tiempo.' },
  { key: 'metodologia', label: 'Metodología activa e interdisciplinariedad', desc: 'Proyectos, problemas o codiseño; relación entre campos formativos.' },
  { key: 'interaccion', label: 'Interacción y participación', desc: 'Preguntas de nivel superior, diálogo, trabajo colaborativo.' },
  { key: 'retroalimentacion', label: 'Retroalimentación a estudiantes', desc: 'Feedback oportuno y específico durante la clase, no solo al final.' },
  { key: 'evaluacion', label: 'Evaluación formativa', desc: 'Usa evidencias del proceso de aprendizaje, no solo calificación final.' },
  { key: 'contexto', label: 'Aprendizaje situado y vínculo con el contexto', desc: 'Conecta contenidos con la comunidad o la realidad del grupo.' },
  { key: 'inclusion', label: 'Inclusión y atención a la diversidad', desc: 'Participación equitativa; adaptación a distintos ritmos y estilos.' },
]
export const NIVELES = [{ v: 1, label: 'Inicial' }, { v: 2, label: 'En proceso' }, { v: 3, label: 'Logrado' }, { v: 4, label: 'Destacado' }]
export const formatTime = (seconds = 0) => {
  const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
export function blankObservation() {
  const now = Date.now()
  return { id: now, docente: '', grupo: '', asignatura: '', fecha: new Date().toISOString().slice(0, 10), campoFormativo: CAMPOS[0], ejes: [], elapsedSeconds: 0, bitacora: [], ratings: {}, feedback: { fortalezas: '', oportunidades: '', acuerdos: '' }, createdAt: now }
}
