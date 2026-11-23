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
  { titulo: "Corte", src: "/trabajos/resized_foto1_corte.jpg" },
  { titulo: "Color", src: "/trabajos/resized_foto2_color.jpg" },
  { titulo: "Peinado", src: "/trabajos/resized_foto3_peinado.jpg" },
  { titulo: "Barbería", src: "/trabajos/resized_foto4_barberia.jpg" },
  { titulo: "Balayage", src: "/trabajos/resized_foto5_balayage.jpg" },
  { titulo: "Corte", src: "/trabajos/resized_foto6_corte.jpg" },
  { titulo: "Tratamiento", src: "/trabajos/resized_foto7_tratamiento.jpg" },
  { titulo: "Recogido", src: "/trabajos/resized_foto8_recogido.jpg" },
];
const VACIO = { nombre: "", email: "", telefono: "", servicio: "", msg: "" };
// Si se quiere utilizar una foto, hay que guardarla en public/equipo/ y completar el "src", ejemplo "/equipo/peluquero-1.jpg".
// Si el "src" no tiene contenido, se va a mostrar el marco redondo que indicaría la posición de la foto.
const EQUIPO = [
  { iniciales: "P1", nombre: "Profesional 1", desc: "Especialista en corte y peinados.", src: "/equipo/resized_profesional1.jpg" },
  { iniciales: "P2", nombre: "Profesional 2", desc: "Especialista en color y tratamientos.", src: "/equipo/resized_profesional2.jpg" },
  { iniciales: "P3", nombre: "Profesional 3", desc: "Barbero y corte masculino.", src: "/equipo/resized_profesional3.jpg" },
];

const btn = "inline-block cursor-pointer rounded-full bg-accent px-6 py-3 font-bold text-[var(--accent-text)] no-underline hover:brightness-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const card = "rounded-2xl border border-line bg-surface p-4";
const field = "w-full rounded-xl border border-line bg-surface px-3 py-2 text-ink";

function Header() {
  const [abierto, setAbierto] = useState(false);
  const base = "rounded-lg px-2.5 text-muted no-underline hover:bg-tile hover:text-ink";
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-11 border-b border-line bg-surface">
      <div className="mx-auto flex min-h-14 max-w-4xl items-center justify-between gap-3 px-5">
        <a href="#inicio" onClick={() => setAbierto(false)} className="text-lg font-bold no-underline">Peluquería <span className="text-accent">Web</span></a>
        {/* Menú horizontal a partir de los 768px */}
        <nav aria-label="Principal" className="hidden gap-1 md:flex">
          {MENU.map(([id, texto]) => (
            <a key={id} href={`#${id}`} className={`${base} py-2 text-sm`}>{texto}</a>
          ))}
        </nav>
        {/* Botón hamburguesa cuando la pantalla es inferior a 768px */}
        <button type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="cursor-pointer rounded-lg p-2 text-ink hover:bg-tile md:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {abierto && (
        <nav id="menu-movil" aria-label="Menú móvil" className="border-t border-line px-5 py-2 md:hidden">
          <div className="mx-auto flex max-w-4xl flex-col">
            {MENU.map(([id, texto]) => (
              <a key={id} href={`#${id}`} onClick={() => setAbierto(false)} className={`${base} py-3 text-base`}>{texto}</a>
            ))}
          </div>
        </nav>
      )}
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
  const [enviando, setEnviando] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    // En el campo de teléfono solo se admiten números, "+" y "-".
    setV({ ...v, [name]: name === "telefono" ? value.replace(/[^0-9+-]/g, "") : value });
  };
  const enviar = (e) => {
    e.preventDefault();
    if (enviando) return; // Sirve para evitar envíos repetidos.
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
    setEnviado(false);
    if (Object.keys(er).length > 0) return;

    setEnviando(true);
    setTimeout(() => {
      // Como es una simulación, no se va a enviar a ningún servidor.
      setEnviando(false);
      setEnviado(true);
      setV(VACIO);
    }, 1500);
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
        <button type="submit" disabled={enviando} className={`${btn} disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100`}>{enviando ? "Enviando..." : "Enviar consulta"}</button>
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