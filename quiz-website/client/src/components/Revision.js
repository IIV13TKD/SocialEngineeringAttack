import React from "react";
import "./Revision.css";

const Revision = () => {
  return (
    <div className="revision-container">
      <h2>Revision Materials</h2>
      <p className="intro-text">
        Improve your cybersecurity awareness by familiarizing yourself with common social engineering tactics. Review the materials below to learn more about phishing, vishing, and pretexting.
      </p>

      <section>
        <h3>Phishing</h3>
        <ul>
          <li>
            <strong>Definition:</strong> Phishing is a scam where attackers send fraudulent emails to trick you into revealing sensitive information.
          </li>
          <li>
            <strong>Red Flags:</strong>
            <ul>
              <li>Urgent requests and threats (e.g., "your account will be closed").</li>
              <li>Suspicious sender addresses or links.</li>
              <li>Poor grammar or unexpected attachments.</li>
            </ul>
          </li>
          <li>
            <strong>Tips:</strong>
            <ul>
              <li>Avoid clicking on unknown links.</li>
              <li>Visit your bank's website directly to verify the email.</li>
              <li>Report suspicious emails to your bank.</li>
            </ul>
          </li>
          <li>
          </li>
        </ul>
      </section>

      <section>
        <h3>Vishing</h3>
        <ul>
          <li>
            <strong>Definition:</strong> Vishing (voice phishing) uses phone calls or voicemails to trick you into revealing personal or financial information.
          </li>
          <li>
            <strong>Red Flags:</strong>
            <ul>
              <li>Unsolicited calls from unknown numbers.</li>
              <li>Urgent requests for OTPs or account details.</li>
              <li>Callers requesting sensitive information immediately.</li>
            </ul>
          </li>
          <li>
            <strong>Tips:</strong>
            <ul>
              <li>Never provide OTPs or sensitive data over the phone.</li>
              <li>Hang up and call your bank using the official number.</li>
              <li>Be cautious if the caller refuses to provide verifiable credentials.</li>
            </ul>
          </li>
          <li>
          </li>
        </ul>
      </section>

      <section>
        <h3>Pretexting</h3>
        <ul>
          <li>
            <strong>Definition:</strong> Pretexting involves creating a fabricated scenario to trick someone into giving away personal or confidential information.
          </li>
          <li>
            <strong>Red Flags:</strong>
            <ul>
              <li>Unexpected requests for sensitive data.</li>
              <li>Fake scenarios that pressure you to respond quickly.</li>
            </ul>
          </li>
          <li>
            <strong>Tips:</strong>
            <ul>
              <li>Always verify the identity of the person making the request.</li>
              <li>Contact the organization directly using known contact details.</li>
            </ul>
          </li>
          <li>
          </li>
        </ul>
      </section>

      <section>
        <h3>General Cybersecurity Best Practices</h3>
        <ul>
          <li>Keep your systems and software updated.</li>
          <li>Use strong, unique passwords and enable multi-factor authentication.</li>
          <li>Be cautious with unsolicited emails, calls, or messages.</li>
          <li>Regularly back up your important data.</li>
        </ul>
      </section>
    </div>
  );
};

export default Revision;
