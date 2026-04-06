import React from 'react';
import { Link } from 'react-router-dom';

const ReservationPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Volver al inicio
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Política de Reservas
          </h1>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            En Hostal Elizabetha buscamos ofrecer un proceso de reserva claro,
            transparente y confiable para todos nuestros huéspedes. Las reservas
            realizadas a través del sitio web estarán sujetas a las siguientes condiciones.
          </p>

          <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                1. Solicitud y confirmación
              </h2>
              <p>
                Toda reserva realizada a través del sitio web se considera una
                solicitud y estará sujeta a validación por parte de la administración.
                El huésped recibirá una notificación por correo electrónico con el
                resultado de la solicitud.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                2. Disponibilidad
              </h2>
              <p>
                La disponibilidad de habitaciones depende de las fechas seleccionadas,
                la ocupación y la validación de reservas previamente registradas en el sistema.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                3. Datos del huésped
              </h2>
              <p>
                El huésped es responsable de suministrar información veraz, completa
                y actualizada al momento de realizar la reserva.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                4. Aprobación o rechazo
              </h2>
              <p>
                Hostal Elizabetha se reserva el derecho de aceptar o rechazar solicitudes
                de reserva cuando existan inconsistencias en la información, falta de
                disponibilidad u otras razones operativas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                5. Check-in y check-out
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Check-in: a partir de las 2:00 PM</li>
                <li>Check-out: hasta las 11:00 AM</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                6. Cancelaciones
              </h2>
              <p>
                Las condiciones de cancelación podrán ser informadas por la administración
                según la reserva realizada. Se recomienda al huésped ponerse en contacto
                oportunamente para cualquier cambio o novedad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                7. Modificaciones
              </h2>
              <p>
                Las solicitudes de modificación de fechas o datos de la reserva estarán
                sujetas a revisión y disponibilidad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                8. Conducta y responsabilidad
              </h2>
              <p>
                El huésped se compromete a hacer uso adecuado de las instalaciones del hostal.
                Cualquier daño causado por mal uso podrá generar cobros adicionales o
                restricciones futuras.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                9. Contacto
              </h2>
              <p>
                Para resolver inquietudes relacionadas con reservas, el usuario puede
                comunicarse al correo:
                <br />
                <span className="font-semibold">reservas@elizabethahostal.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPolicy;