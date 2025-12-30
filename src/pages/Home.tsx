import "../styles.css";

export default function Home({
  onOpenCollection,
}: {
  onOpenCollection: () => void;
}) {
  return (
    <main className="homeWrap">
      {/* HERO */}
      <section className="homeHero">
        <div className="homeHeroCard">
          <div className="homeHeroLeft">
            <div className="homeBadge">
              <span className="homeBadgeDot" />
              Precision-Curated Diamond Portfolio
            </div>

            <h1 className="homeTitle">
              Discover Diamonds
              <span className="homeTitleSoft"> with Clarity & Confidence</span>
            </h1>

            <p className="homeText">
              Welcome to <strong>Diamond Destiny</strong> — a clean, premium
              viewing experience built for focus. Browse diamonds{" "}
              <strong>one-by-one</strong>, check key specs instantly, and open
              the <strong>360°/video view</strong> (when available) to inspect
              sparkle, symmetry, and proportions in detail — like viewing a
              stone in person.
            </p>

            <div className="homeCtas">
              <button className="btn homePrimary" onClick={onOpenCollection}>
                View Diamond Collection
              </button>

              <button className="homeGhost" onClick={onOpenCollection}>
                Explore one-by-one →
              </button>
            </div>

            <div className="homeMiniStats">
              <div className="homeStat">
                <div className="homeStatK">Photo First</div>
                <div className="homeStatV">Instant clarity</div>
              </div>
              <div className="homeStat">
                <div className="homeStatK">Specs</div>
                <div className="homeStatV">Cut • Color • Clarity</div>
              </div>
              <div className="homeStat">
                <div className="homeStatK">360°/Video</div>
                <div className="homeStatV">When available</div>
              </div>
            </div>
          </div>

          <div className="homeHeroRight">
            <div className="homeMock">
              <div className="homeMockTop">
                <span className="homePill">Round</span>
                <span className="homePill">1.00 ct</span>
                <span className="homePill">D</span>
                <span className="homePill">VVS2</span>
              </div>

              <div className="homeMockImage">
                <div className="homeMockSparkle" />
                <div className="homeMockHint">Preview</div>
              </div>

              <div className="homeMockBottom">
                <div className="homeMockLine" />
                <div className="homeMockLine short" />
                <div className="homeMockLine" />
              </div>
            </div>

            <div className="homeHintCard">
              <div className="homeHintTitle">Quick tip</div>
              <div className="homeHintText">
                Open <strong>Collection</strong> to browse diamonds one-by-one.
                On desktop, use arrow keys <strong>← →</strong> to switch
                diamonds faster.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="homeSection">
        <div className="homeSectionHead">
          <h2 className="homeH2">Why this collection feels premium</h2>
          <p className="homeText muted">
            Minimal design, quick browsing, and clear information — built for a
            smooth mobile and desktop experience.
          </p>
        </div>

        <div className="homeGrid3">
          <Card
            title="Curated Presentation"
            text="A portfolio-style view that stays clean, modern, and easy to trust."
          />
          <Card
            title="Photo → 360° Flow"
            text="Start with the image, then open video/360 only when you want deeper inspection."
          />
          <Card
            title="Fast Search"
            text="Search by shape, carat, color, clarity, and more — all in one line."
          />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="homeSection">
        <div className="homeSplit">
          <div className="homePanel">
            <h3 className="homeH3">What you can check instantly</h3>
            <ul className="homeList">
              <li>Shape, carat, color, clarity</li>
              <li>Cut / Polish / Symmetry</li>
              <li>Fluorescence and ratio</li>
              <li>Video/360 inspection (if present)</li>
            </ul>
            <button className="btn secondary w100" onClick={onOpenCollection}>
              Open Collection
            </button>
          </div>

          <div className="homePanel">
            <h3 className="homeH3">How to use</h3>
            <div className="homeSteps">
              <Step
                n="1"
                t="Open Collection"
                d="Browse diamonds one-by-one with a clean viewer."
              />
              <Step
                n="2"
                t="Use Search"
                d="Type shape/carat/color/clarity to filter instantly."
              />
              <Step
                n="3"
                t="Open 360°/Video"
                d="Inspect details closely when a link is available."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="homeSection">
        <div className="homeCta">
          <h2 className="homeH2">Ready to explore?</h2>
          <p className="homeText muted">
            Browse your curated diamond portfolio in a clean one-by-one view
            designed for phones and desktops.
          </p>
          <button className="btn w100" onClick={onOpenCollection}>
            View Collection
          </button>
        </div>
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="homeCard">
      <div className="homeCardTitle">{title}</div>
      <div className="homeCardText">{text}</div>
    </div>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="homeStep">
      <div className="homeStepNum">{n}</div>
      <div>
        <div className="homeStepTitle">{t}</div>
        <div className="homeStepText">{d}</div>
      </div>
    </div>
  );
}
