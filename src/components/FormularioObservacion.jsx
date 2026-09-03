import { useState } from 'react'
import { crearObservacionCompleta } from '../services/observaciones'

const criteriosIniciales = [
  { criterio: 'Manejo del tiempo y secuencia didáctica', calificacion: 'Logrado', evidencia: '' },
  { criterio: 'Participación activa e interacción con alumnos', calificacion: 'En proceso', evidencia: '' },
  { criterio: 'Uso de recursos y materiales educativos', calificacion: 'Logrado', evidencia: '' },
]

export function FormularioObservacion({ docenteId }) {
  const [notasGenerales, setNotasGenerales] = useState('')
  const [criterios, setCriterios] = useState(criteriosIniciales)
  const [guardando, setGuardando] = useState(false)

  const manejarCambioCriterio = (index, campo, valor) => {
    setCriterios(actuales => actuales.map((criterio, criterioIndex) => (
      criterioIndex === index ? { ...criterio, [campo]: valor } : criterio
    )))
  }

  const manejarEnvio = async event => {
    event.preventDefault()
    setGuardando(true)

    const resultado = await crearObservacionCompleta(docenteId, notasGenerales, criterios)

    setGuardando(false)
    if (resultado.success) {
      alert('Observación registrada con éxito.')
      setNotasGenerales('')
    } else {
      alert(`Error al guardar: ${resultado.error}`)
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="espacio-formulario">
      <h2>Nueva Observación de Aula</h2>

      <div className="seccion-criterios">
        <h3>Criterios Evaluados</h3>
        {criterios.map((item, index) => (
          <div key={item.criterio} className="tarjeta-criterio" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <strong>{item.criterio}</strong>
            <br />
            <label>
              Nivel de Logro:{' '}
              <select
                value={item.calificacion}
                onChange={event => manejarCambioCriterio(index, 'calificacion', event.target.value)}
              >
                <option value="Logrado">Logrado</option>
                <option value="En proceso">En proceso</option>
                <option value="Requiere apoyo">Requiere apoyo</option>
              </select>
            </label>
            <textarea
              placeholder="Evidencias observadas en clase..."
              value={item.evidencia}
              onChange={event => manejarCambioCriterio(index, 'evidencia', event.target.value)}
              rows={2}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
        ))}
      </div>

      <div className="seccion-notas">
        <label htmlFor="notas-generales"><strong>Notas / Comentarios Generales:</strong></label>
        <textarea
          id="notas-generales"
          value={notasGenerales}
          onChange={event => setNotasGenerales(event.target.value)}
          rows={4}
          style={{ width: '100%' }}
          placeholder="Anotaciones globales durante la visita..."
        />
      </div>

      <button type="submit" disabled={guardando} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        {guardando ? 'Guardando...' : 'Finalizar Observación'}
      </button>
    </form>
  )
}
