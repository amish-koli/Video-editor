import { useEffect, useRef, useState } from "react";
import { SITE, PROJECTS } from "./data";

const secs = (d) =>
  d
    .split(":")
    .map(Number)
    .reduce((a, b) => a * 60 + b, 0);
const fmt = (s) =>
  String(Math.floor(s / 60)).padStart(2, "0") +
  ":" +
  String(s % 60).padStart(2, "0");

function Thumb({ p }) {
  const style = p.thumb
    ? { backgroundImage: `url(${p.thumb})` }
    : {
        backgroundImage: `linear-gradient(135deg,hsl(${p.hue} 80% 55%),hsl(${(p.hue + 60) % 360} 70% 25%))`,
      };
  return (
    <div className="thumb" style={style}>
      <i />
      <em>{p.duration}</em>
    </div>
  );
}

function Timeline() {
  const ref = useRef(null);
  const [x, setX] = useState(34);
  const [tc, setTc] = useState("00:00");
  const total = PROJECTS.reduce((a, p) => a + secs(p.duration), 0);

  function move(e) {
    const r = ref.current.getBoundingClientRect();
    const min = 34;
    const max = r.width - 2;
    const px = Math.min(max, Math.max(min, e.clientX - r.left));
    setX(px);
    setTc(fmt(Math.round(((px - min) / (max - min)) * total)));
  }

  return (
    <div className="tl glass" ref={ref} onPointerMove={move} aria-hidden="true">
      <span className="tc">{tc}</span>
      <div className="lane" data-l="V1">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="clip"
            style={{
              flex: Math.max(secs(p.duration), 40),
              background: `hsl(${p.hue} 85% 68%)`,
            }}
          >
            {p.title}
          </div>
        ))}
      </div>
      <div className="lane" data-l="A1">
        <div className="wave" />
      </div>
      <div className="head" style={{ left: x }} />
    </div>
  );
}

function VideoDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (project && !ref.current.open) ref.current.showModal();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {project && (
        <>
          {project.link ? (
            <iframe
              src={project.link}
              title={project.title}
              style={{
                width: "100%",
                height: "70vh",
                border: "0",
                display: "block",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Thumb p={project} />
          )}

          <div className="dbody">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <dl>
              <dt>Category</dt>
              <dd>{project.category}</dd>

              <dt>Published</dt>
              <dd>{project.date}</dd>

              <dt>Tools</dt>
              <dd>{project.software.join(", ")}</dd>

              <dt>Tags</dt>
              <dd>{project.tags.join(", ")}</dd>
            </dl>

            <button className="btn ghost" onClick={() => ref.current.close()}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

function Work() {
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const list = PROJECTS.filter((p) => cat === "All" || p.category === cat);

  return (
    <section id="work">
      <h2>Work</h2>
      <div className="chips">
        {cats.map((c) => (
          <button
            key={c}
            className="chip"
            aria-pressed={c === cat}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {list.length ? (
          list.map((p) => (
            <button
              key={p.id}
              className="card glass"
              onClick={() => setOpen(p)}
            >
              <Thumb p={p} />
              <div className="t">
                <h3>{p.title}</h3>
                <small>{p.category}</small>
              </div>
            </button>
          ))
        ) : (
          <p className="empty">No videos in this category yet.</p>
        )}
      </div>
      <VideoDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/xjyklogw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Message sent successfully ✓");
        form.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact">
      <h2>Let's work together</h2>

      <form className="glass" onSubmit={submit}>
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>

        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>

        <label>
          Project details
          <textarea name="message" rows="4" required />
        </label>

        <button className="btn" type="submit">
          Send by email
        </button>

        {status && <p>{status}</p>}
      </form>
    </section>
  );
}
export default function App() {
  return (
    <>
      <nav className="glass">
        <b>{SITE.name}</b>
        <div>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <main className="wrap">
        <header className="hero">
          <h1>{SITE.headline}</h1>
          <p>{SITE.intro}</p>
          <a className="btn" href="#work">
            See my work
          </a>
          <a className="btn ghost" href="#contact">
            Hire me
          </a>
          <Timeline />
        </header>
        <Work />
        <section id="about">
          <h2>About</h2>
          <div className="two">
            <div>
              {SITE.about.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
            <div className="tools">
              {SITE.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </footer>
    </>
  );
}
