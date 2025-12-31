import "../styles.css";

export default function Contact() {
  return (
    <main className="pageWrap">
      <section className="pageCard">
        <h1 className="h1">Contact</h1>

        <p className="p">
          Want to ask a question or request a specific diamond? Reach out using
          any option below.
        </p>

        <div className="hr" />

        <div className="contactGrid">
          <div className="contactRow">
            <div className="contactLabel">Email</div>
            <div className="contactValue">
              <strong>diamonddestiny1103@gmail.com</strong>
            </div>
          </div>

          <div className="contactRow">
            <div className="contactLabel">WhatsApp</div>
            <div className="contactValue">
              <strong>+49 1785793147</strong>
            </div>
          </div>
          <div className="contactRow">
            <div className="contactLabel">WhatsApp</div>
            <div className="contactValue">
              <strong>+91 8306141092</strong>
            </div>
          </div>
        </div>

        <div className="hr" />

        <p className="p">
          If you want, I can also add a simple contact form (name + email +
          message) that sends to your email.
        </p>
      </section>
    </main>
  );
}
