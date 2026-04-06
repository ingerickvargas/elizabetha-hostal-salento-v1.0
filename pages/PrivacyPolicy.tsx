import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
            Política de Tratamiento de Datos Personales
          </h1>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013,
            Hostal Elizabetha informa a sus usuarios, huéspedes y visitantes
            sobre el tratamiento de los datos personales recolectados a través
            de su sitio web y canales de atención.
          </p>

          <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                1. Responsable del tratamiento
              </h2>
              <p>
                Hostal Elizabetha
                <br />
                Salento, Quindío, Colombia
                <br />
                Correo de contacto: reservas@elizabethahostal.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                2. Datos que recolectamos
              </h2>
              <p>Podemos recolectar y tratar los siguientes datos personales:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Fechas de check-in y check-out</li>
                <li>Número de huéspedes</li>
                <li>Información asociada a la reserva</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                3. Finalidad del tratamiento
              </h2>
              <p>La información recolectada será utilizada para:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Gestionar solicitudes de reserva</li>
                <li>Confirmar o rechazar reservas</li>
                <li>Enviar notificaciones y correos relacionados con la estadía</li>
                <li>Atender consultas o solicitudes del usuario</li>
                <li>Cumplir obligaciones legales y contractuales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                4. Almacenamiento y seguridad
              </h2>
              <p>
                Hostal Elizabetha adopta medidas razonables de seguridad para
                proteger la información personal contra acceso no autorizado,
                pérdida, alteración o uso indebido.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                5. Compartición de datos
              </h2>
              <p>
                Los datos personales no serán vendidos ni compartidos con
                terceros, salvo cuando sea necesario para la prestación del
                servicio, por requerimiento legal o por autoridad competente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                6. Derechos del titular
              </h2>
              <p>El titular de los datos podrá ejercer los siguientes derechos:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado sobre el uso de sus datos</li>
                <li>Solicitar la eliminación de sus datos cuando sea procedente</li>
                <li>Presentar consultas o reclamos relacionados con sus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                7. Atención de consultas y reclamos
              </h2>
              <p>
                Para consultas, correcciones o solicitudes relacionadas con el
                tratamiento de datos personales, el usuario puede escribir a:
                <br />
                <span className="font-semibold">reservas@elizabethahostal.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                8. Vigencia
              </h2>
              <p>
                La presente política entra en vigencia a partir de su publicación
                en el sitio web y podrá ser modificada en cualquier momento para
                ajustarse a cambios normativos o de operación.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;