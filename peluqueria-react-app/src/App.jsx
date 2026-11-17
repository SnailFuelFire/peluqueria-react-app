import { useState } from "react";

const WA = "https://wa.me/5493510000000?text=Hola!%20Quisiera%20consultar%20por%20un%20turno.";
const MAPA = "https://www.google.com/maps/search/?api=1&query=Cordoba+Argentina";

const MENU = [
  ["inicio", "Inicio"], ["servicios", "Servicios"], ["galeria", "Galería"],
  ["equipo", "Equipo"], ["contacto", "Contacto"],
];
const SERVICIOS = [
  ["Corte", "Corte de mujer, hombre o niños con lavado y peinado.", "Desde $12.000"],
  ["Color y mechas", "Coloración, mechas, balayage y retoque de raíz.", "Desde $35.000"],
  ["Peinados", "Brushing, ondas y recogidos para eventos.", "Desde $15.000"],
  ["Barbería", "Corte y perfilado de barba con toalla caliente.", "Desde $10.000"],
  ["Tratamientos", "Hidratación, keratina y nutrición capilar.", "Desde $25.000"],
];
// Si se quiere utilizar una foto, hay que guardarla en public/trabajos/ y completar el "src", ejemplo: "/trabajos/corte-1.jpg".
// Si el "src" no tiene contenido, se van a mostrar los cuadrados que indicarían la posición de las fotos.
const TRABAJOS = [
  { titulo: "Corte", src: "" },
  { titulo: "Color", src: "" },
  { titulo: "Peinado", src: "" },
  { titulo: "Barbería", src: "" },
  { titulo: "Balayage", src: "" },
  { titulo: "Corte", src: "" },
  { titulo: "Tratamiento", src: "" },
  { titulo: "Recogido", src: "" },
];
const VACIO = { nombre: "", email: "", telefono: "", servicio: "", msg: "" };
// Si se quiere utilizar una foto, hay que guardarla en public/equipo/ y completar el "src", ejemplo "/equipo/peluquero-1.jpg".
// Si el "src" no tiene contenido, se va a mostrar el marco redondo que indicaría la posición de la foto.
const EQUIPO = [
  { iniciales: "P1", nombre: "Profesional 1", desc: "Especialista en corte y peinados.", src: "" },
  { iniciales: "P2", nombre: "Profesional 2", desc: "Especialista en color y tratamientos.", src: "" },
  { iniciales: "P3", nombre: "Profesional 3", desc: "Barbero y corte masculino.", src: "" },
];

const btn = "inline-block cursor-pointer rounded-full bg-accent px-6 py-3 font-bold text-[var(--accent-text)] no-underline hover:brightness-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const card = "rounded-2xl border border-line bg-surface p-4";
const field = "w-full rounded-xl border border-line bg-surface px-3 py-2 text-ink";

function Header() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-11 border-b border-line bg-surface">
      <div className="mx-auto flex min-h-14 max-w-4xl flex-wrap items-center justify-between gap-3 px-5">
        <a href="#inicio" className="text-lg font-bold no-underline">Peluquería <span className="text-accent">Web</span></a>
        <nav aria-label="Principal" className="flex flex-wrap gap-1">
          {MENU.map(([id, texto]) => (
            <a key={id} href={`#${id}`} className="rounded-lg px-2.5 py-2 text-sm text-muted no-underline hover:bg-tile hover:text-ink">{texto}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Portada() {
  const datos = [["Horarios", "Lun a vie 9 a 20 h · Sáb 9 a 17 h"], ["Dirección", "Av. Ejemplo 123, Córdoba Capital"], ["Contacto", "WhatsApp: +54 9 351 000-0000"]];
  return (
    <div id="inicio" className="pb-12 pt-16">
      <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Tu estilo, en tu barrio.</h1>
      <p className="mb-6 max-w-xl text-lg text-muted">Cortes, color, peinados y barbería con atención personalizada en el corazón de Córdoba.</p>
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        {datos.map(([t, v]) => (
          <div key={t} className={card}>
            <b className="mb-0.5 block text-xs uppercase tracking-wider text-accent">{t}</b>{v}
          </div>
        ))}
      </div>
      <a className={btn} href={WA} target="_blank" rel="noopener">Escribinos por WhatsApp</a>
    </div>
  );
}

function Seccion({ id, titulo, sub, children }) {
  return (
    <section id={id} className="border-t border-line py-10">
      <h2 className="mb-1.5 text-3xl font-bold">{titulo}</h2>
      <p className="mb-5 text-muted">{sub}</p>
      {children}
    </section>
  );
}

function Contacto() {
  const [v, setV] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    // En el campo de teléfono solo se admiten números, "+" y "-".
    setV({ ...v, [name]: name === "telefono" ? value.replace(/[^0-9+-]/g, "") : value });
  };
  const enviar = (e) => {
    e.preventDefault();
    const er = {};
    const largo = v.nombre.trim().length;
    if (largo < 2 || largo > 60) er.nombre = "Ingresá un nombre de 2 a 60 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) er.email = "Ingresá un correo válido.";
    const tel = v.telefono.trim();
    if (tel) {
      const digitos = tel.replace(/[^0-9]/g, "").length;
      if (!/^[0-9+-]+$/.test(tel) || digitos < 8 || digitos > 15) er.telefono = "Ingresá solo números";
    }
    if (v.msg.trim().length < 10) er.msg = "Escribí tu consulta (mínimo 10 caracteres).";
    setErrores(er);
    const ok = Object.keys(er).length === 0;
    setEnviado(ok);
    if (ok) setV(VACIO);
  };

  const campo = (name, label, extra = {}) => (
    <>
      <label htmlFor={name} className="mb-1 mt-3 block text-[.95rem] font-bold">{label}</label>
      {name === "msg"
        ? <textarea id={name} name={name} value={v[name]} onChange={cambiar} className={`${field} min-h-28`} />
        : <input id={name} name={name} value={v[name]} onChange={cambiar} className={field} {...extra} />}
      <p className="min-h-[1.1em] text-sm text-red-500">{errores[name]}</p>
    </>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="mb-3.5 rounded-2xl border border-line bg-tile p-6 text-center">
          <p className="mb-3 font-bold">Av. Ejemplo 123, Córdoba</p>
          <a className={btn} href={MAPA} target="_blank" rel="noopener">Ver en el mapa</a>
        </div>
        <p>Seguinos: <a href="https://instagram.com/" target="_blank" rel="noopener" className="underline">Instagram</a> · <a href="https://facebook.com/" target="_blank" rel="noopener" className="underline">Facebook</a></p>
      </div>
      <form onSubmit={enviar} noValidate>
        {campo("nombre", "Nombre", { autoComplete: "name" })}
        {campo("email", "Correo electrónico", { type: "email", autoComplete: "email" })}
        {campo("telefono", "Teléfono (opcional)", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
        <label htmlFor="servicio" className="mb-1 mt-3 block text-[.95rem] font-bold">Servicio de interés</label>
        <select id="servicio" name="servicio" value={v.servicio} onChange={cambiar} className={field}>
          <option value="">Seleccioná una opción</option>
          {SERVICIOS.map(([t]) => <option key={t} value={t}>{t}</option>)}
          <option value="Otro">Otro</option>
        </select>
        <p className="min-h-[1.1em]" />
        {campo("msg", "Mensaje")}
        <button type="submit" className={btn}>Enviar consulta</button>
        {enviado && <div role="status" className="mt-3 rounded-xl bg-tile px-3.5 py-3">¡Gracias! Recibimos tu consulta y te responderemos pronto.</div>}
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header />
      <main className="mx-auto max-w-4xl px-5">
        <Portada />
        <Seccion id="servicios" titulo="Servicios" sub="Precios de referencia; pueden variar según largo y tratamiento.">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map(([t, d, p]) => (
              <div key={t} className={card}>
                <h3 className="text-lg font-bold">{t}</h3>
                <p className="text-[.95rem] text-muted">{d}</p>
                <span className="mt-2.5 block font-bold text-accent">{p}</span>
              </div>
            ))}
          </div>
        </Seccion>
        <Seccion id="galeria" titulo="Nuestros trabajos" sub="Algunos de los estilos que realizamos.">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {TRABAJOS.map((t, i) =>
              t.src ? (
                <img key={i} src={t.src} alt={`Trabajo de ${t.titulo.toLowerCase()}`} loading="lazy"
                  className="aspect-square w-full rounded-xl border border-line object-cover" />
              ) : (
                <div key={i} role="img" aria-label={`Foto de ${t.titulo.toLowerCase()}`}
                  className="grid aspect-square place-items-center rounded-xl border border-line bg-tile p-2 text-center text-sm text-muted">
                  Foto {i + 1}<br />{t.titulo}
                </div>
              )
            )}
          </div>
        </Seccion>
        <Seccion id="equipo" titulo="Nuestro equipo" sub="Tres profesionales a tu disposición.">
          <div className="grid gap-3.5 sm:grid-cols-3">
            {EQUIPO.map((m) => (
              <div key={m.nombre} className={card}>
                {m.src ? (
                  <img src={m.src} alt={`Foto de ${m.nombre}`} loading="lazy" className="mb-2 h-14 w-14 rounded-full object-cover" />
                ) : (
                  <div aria-hidden="true" className="mb-2 grid h-14 w-14 place-items-center rounded-full bg-tile font-bold text-accent">{m.iniciales}</div>
                )}
                <h3 className="text-lg font-bold">{m.nombre}</h3>
                <p className="text-[.95rem] text-muted">{m.desc}</p>
              </div>
            ))}
          </div>
        </Seccion>
        <Seccion id="contacto" titulo="Contacto" sub="Escribinos y te respondemos a la brevedad.">
          <Contacto />
        </Seccion>
      </main>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">© {new Date().getFullYear()} Peluquería Web · Córdoba, Argentina</footer>
    </div>
  );
}