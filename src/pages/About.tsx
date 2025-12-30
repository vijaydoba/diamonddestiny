import "../styles.css";

export default function About() {
  return (
    <main className="pageWrap">
      <section className="pageCard">
        <h1 className="h1">About</h1>

        <p className="p">
          <strong>Diamond Destiny</strong> is a simple diamond viewing
          experience built from a curated spreadsheet. The goal is to make
          browsing easy: you see the diamond photo first, and if you want more
          detail, you can open the video/360 view (when available).
        </p>

        <div className="hr" />

        <p className="p">
          <strong>How it works</strong>
        </p>
        <ul className="list">
          <li className="listItem">
            Browse diamonds one-by-one in the <strong>Collection</strong>.
          </li>
          <li className="listItem">
            Use search to quickly find shape, carat, color, clarity, and more.
          </li>
          <li className="listItem">
            Open the diamond video/360 view to inspect sparkle and details.
          </li>
        </ul>

        <div className="hr" />

        <p className="p">
          <strong>Coming next</strong> (optional improvements):
        </p>
        <ul className="list">
          <li className="listItem">
            Filters (Shape, Color, Clarity) and sorting (Carat high → low).
          </li>
          <li className="listItem">Swipe navigation on mobile (left/right).</li>
          <li className="listItem">Share link per diamond (unique URL).</li>
        </ul>
      </section>
    </main>
  );
}
