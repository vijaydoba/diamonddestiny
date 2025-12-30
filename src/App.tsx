import { useEffect, useMemo, useCallback, useState } from "react";
import type { Diamond } from "./types";
import "./styles.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

type Page = "home" | "collection" | "about" | "contact";

const safeStr = (v: unknown) => (v ?? "").toString().trim();
const hasLink = (v: unknown) => {
  const s = safeStr(v);
  return s.length > 0 && s !== "NONE" && s !== "NA" && s !== "N/A";
};

export default function App() {
  const [page, setPage] = useState<Page>("home"); // ✅ start at Home intro
  const [menuOpen, setMenuOpen] = useState(false);

  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  // Load diamonds once
  useEffect(() => {
    fetch("/data/diamonds.json")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data: Diamond[]) => setDiamonds(data))
      .catch((e) => console.error("Failed to load /data/diamonds.json:", e));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return diamonds;

    return diamonds.filter((d) => {
      const hay = [
        d.Shape,
        d.Carat,
        d.Color,
        d.Clarity,
        d.Cut,
        d.Pol,
        d.Sym,
        d.Fluro,
        d.Ratio,
      ]
        .map(safeStr)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [diamonds, query]);

  // Keep index valid when filtering changes
  useEffect(() => {
    if (filtered.length === 0) {
      setIndex(0);
      return;
    }
    setIndex((i) => Math.min(i, filtered.length - 1));
  }, [filtered.length]);

  const current = filtered[index];

  const prev = useCallback(() => {
    setIndex((i) => {
      const len = filtered.length;
      if (len === 0) return 0;
      return (i - 1 + len) % len;
    });
  }, [filtered.length]);

  const next = useCallback(() => {
    setIndex((i) => {
      const len = filtered.length;
      if (len === 0) return 0;
      return (i + 1) % len;
    });
  }, [filtered.length]);

  const go = useCallback((p: Page) => {
    setPage(p);
    setMenuOpen(false);
  }, []);

  // Keyboard shortcuts (Collection only)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);

      if (page !== "collection") return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, prev, next]);

  return (
    <div className="page">
      {/* Navbar */}
      <header className="nav">
        <div className="navLeft">
          <button
            className="burger"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div
            className="brand"
            role="button"
            tabIndex={0}
            onClick={() => go("home")}
          >
            <div className="logoDot" />
            <div>
              <div className="title">Diamond Destiny</div>
              <div className="subtitle">
                {diamonds.length} diamonds
                {page === "collection" && filtered.length
                  ? ` • ${index + 1}/${filtered.length}`
                  : ""}
              </div>
            </div>
          </div>

          <nav className="navLinks">
            <NavLink active={page === "home"} onClick={() => go("home")}>
              Home
            </NavLink>
            <NavLink
              active={page === "collection"}
              onClick={() => go("collection")}
            >
              Collection
            </NavLink>
            <NavLink active={page === "about"} onClick={() => go("about")}>
              About
            </NavLink>
            <NavLink active={page === "contact"} onClick={() => go("contact")}>
              Contact
            </NavLink>
          </nav>
        </div>

        <div className="navRight">
          {/* ✅ Search only on Collection */}
          {page === "collection" && (
            <input
              className="search"
              placeholder="Search: Round, 1.00, D, VVS2..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIndex(0);
              }}
            />
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="drawerOverlay" role="dialog" aria-modal="true">
          <button
            className="drawerBackdrop"
            aria-label="Close"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="drawer">
            <div className="drawerTop">
              <div className="drawerBrand">
                <div className="logoDot" />
                <div>
                  <div className="title">Diamond Destiny</div>
                  <div className="subtitle">{diamonds.length} diamonds</div>
                </div>
              </div>

              <button className="iconBtn" onClick={() => setMenuOpen(false)}>
                ✕
              </button>
            </div>

            <div className="drawerLinks">
              <button
                className={`drawerLink ${page === "home" ? "active" : ""}`}
                onClick={() => go("home")}
              >
                Home
              </button>

              <button
                className={`drawerLink ${
                  page === "collection" ? "active" : ""
                }`}
                onClick={() => go("collection")}
              >
                Collection
              </button>

              <button
                className={`drawerLink ${page === "about" ? "active" : ""}`}
                onClick={() => go("about")}
              >
                About
              </button>

              <button
                className={`drawerLink ${page === "contact" ? "active" : ""}`}
                onClick={() => go("contact")}
              >
                Contact
              </button>
            </div>

            {/* ✅ Drawer search only on Collection */}
            {page === "collection" && (
              <div className="drawerSearch">
                <input
                  className="search"
                  placeholder="Search diamonds..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                />
              </div>
            )}

            <div className="drawerFooter">
              <div className="smallNote">
                Tip: Use ← → keys in Collection to view diamonds one-by-one.
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Pages */}
      {page === "home" ? (
        <Home onOpenCollection={() => go("collection")} />
      ) : page === "collection" ? (
        <main className="oneWrap">
          {filtered.length === 0 ? (
            <div className="empty">No diamonds match your search.</div>
          ) : (
            <div className="oneCard">
              <div className="oneMedia">
                {hasLink(current?.["Image Link"]) ? (
                  <img
                    className="heroImg"
                    src={current["Image Link"]!}
                    alt={`${current.Shape} ${current.Carat}ct ${current.Color} ${current.Clarity}`}
                  />
                ) : (
                  <div className="heroFallback">No image</div>
                )}
              </div>

              <div className="oneBody">
                <div className="oneHeader">
                  <div>
                    <div className="modalTitle">
                      {current.Shape} • {current.Carat} ct
                    </div>
                    <div className="modalSub">
                      Color {current.Color} • Clarity {current.Clarity}
                    </div>
                  </div>

                  <div className="navPills">
                    <button
                      className="pillBtn"
                      onClick={prev}
                      aria-label="Previous diamond"
                    >
                      ← Prev
                    </button>
                    <button
                      className="pillBtn"
                      onClick={next}
                      aria-label="Next diamond"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                <div className="specCard">
                  <div className="specTitle">Specs</div>
                  <div className="specGrid">
                    <Spec k="Shape" v={current.Shape} />
                    <Spec k="Carat" v={current.Carat} />
                    <Spec k="Color" v={current.Color} />
                    <Spec k="Clarity" v={current.Clarity} />
                    <Spec k="Cut" v={current.Cut ?? "—"} />
                    <Spec k="Polish" v={current.Pol ?? "—"} />
                    <Spec k="Symmetry" v={current.Sym ?? "—"} />
                    <Spec k="Fluro" v={current.Fluro ?? "—"} />
                    <Spec k="Ratio" v={current.Ratio ?? "—"} />
                  </div>
                </div>

                <div className="actionsRow">
                  {hasLink(current?.["Video Link"]) ? (
                    <>
                      <a
                        className="btn"
                        href={current["Video Link"]!}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View diamond video
                      </a>

                      <details className="embedBox">
                        <summary className="btn secondary">
                          Try embedded video
                        </summary>
                        <div className="iframeWrap">
                          <iframe
                            title="Diamond video"
                            src={current["Video Link"]!}
                            allow="fullscreen"
                          />
                        </div>
                        <div className="smallNote">
                          If this is blank, the video site blocks embedding —
                          use “View diamond video”.
                        </div>
                      </details>
                    </>
                  ) : (
                    <div className="smallNote">
                      No video link for this diamond.
                    </div>
                  )}
                </div>

                <div className="smallNote">
                  Use search to filter. Use ← → for next/prev.
                </div>
              </div>
            </div>
          )}
        </main>
      ) : page === "about" ? (
        <About />
      ) : (
        <Contact />
      )}

      {/* Footer line removed (kept empty) */}
      <footer className="footer"></footer>
    </div>
  );
}

function NavLink({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className={`navLink ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Spec({ k, v }: { k: string; v: any }) {
  return (
    <div className="specRow">
      <div className="specK">{k}</div>
      <div className="specV">{String(v)}</div>
    </div>
  );
}
