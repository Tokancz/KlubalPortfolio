<script setup lang="ts">
import { ArrowLeft, Check, X } from 'lucide-vue-next'
import AmbientBackdrop from '@/components/chrome/AmbientBackdrop.vue'
import BrandMark from '@/components/ui/BrandMark.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { siteUrl, email, instagram } from '@/data/profile'

/**
 * Usage terms for the artwork + the site's privacy policy. Keep the privacy
 * section in sync with what the site actually loads: today that is GitHub
 * Pages hosting and Google Fonts — no cookies, analytics or local storage.
 */
const LAST_UPDATED = '10 October 2026'
const year = new Date().getFullYear()
const siteLabel = siteUrl.replace(/^https?:\/\//, '')
</script>

<template>
  <AmbientBackdrop />

  <nav class="lnav" aria-label="Primary">
    <BrandMark href="/" />
    <a class="lnav__back" href="/"><ArrowLeft /> Back to portfolio</a>
  </nav>

  <main class="section container legal">
    <SectionHeader
      label="// LEGAL"
      accent="— USAGE & PRIVACY"
      title="Usage & privacy"
      :meta="`UPDATED ${LAST_UPDATED.toUpperCase()}`"
    />

    <!-- Plain-language summary; the full terms below are what apply. -->
    <div class="summary">
      <div class="summary__col">
        <p class="summary__kicker">// Personal use — go ahead</p>
        <ul>
          <li><Check /> Save it, use it as a wallpaper or reference</li>
          <li><Check /> Share it with credit and a link back</li>
          <li><Check /> Use it in school work, reviews and articles</li>
        </ul>
      </div>
      <div class="summary__col">
        <p class="summary__kicker summary__kicker--no">// Needs my written permission</p>
        <ul>
          <li><X /> Any commercial use, prints or merch</li>
          <li><X /> Editing it and publishing the result</li>
          <li><X /> AI training, NFTs, or claiming it as yours</li>
        </ul>
      </div>
      <p class="summary__privacy">
        <strong>Privacy in one line:</strong> no cookies, no analytics, no tracking. Details below.
      </p>
    </div>

    <ol class="toc">
      <li><a href="#usage">01 · Copyright &amp; usage</a></li>
      <li><a href="#privacy">02 · Privacy policy</a></li>
      <li><a href="#disclaimer">03 · Disclaimer</a></li>
    </ol>

    <article class="doc">
      <section id="usage">
        <h2><span>01</span> Copyright &amp; usage of my artwork</h2>
        <p>
          All renders, animations, videos, 3D models and images on {{ siteLabel }} (the
          “Artwork”) are original works by Matyáš Klubal, protected by copyright under Czech law
          (Act No. 121/2000 Coll., the Copyright Act) and international copyright treaties.
          <strong>© {{ year }} Matyáš Klubal. All rights reserved</strong>, except for the uses
          explicitly allowed below.
        </p>

        <h3>1.1 Personal, non-commercial use — allowed</h3>
        <p>You don't need to ask me to:</p>
        <ul>
          <li>view, download and keep copies of the Artwork for private use, for example as inspiration, a reference or a wallpaper;</li>
          <li>
            share the Artwork on social media or a personal, non-monetized website or post,
            <em>as long as</em> you credit “Matyáš Klubal” with a link to {{ siteLabel }} or
            {{ instagram.handle }}, don't alter the image, and don't crop out or remove any credit;
          </li>
          <li>use the Artwork, with credit, in school assignments, teaching, critiques, reviews or news reporting, within the limits the law allows for quotation;</li>
          <li>if you're a studio or recruiter reviewing my application: store and share this portfolio and my CV internally as part of that hiring process.</li>
        </ul>

        <h3>1.2 Uses that need my prior written permission</h3>
        <ul>
          <li>
            <strong>Any commercial use</strong>: advertising and marketing, products and
            merchandise, prints for sale, book, album or game covers, game or film assets, client
            projects, stock libraries, or anything else done for profit;
          </li>
          <li>use in monetized content, such as monetized videos or streams and sponsored posts;</li>
          <li>editing, remixing, tracing or otherwise creating derivative works and publishing or distributing them;</li>
          <li>selling, licensing or sublicensing the Artwork, or minting it as NFTs or other tokens;</li>
          <li>
            using the Artwork to train, fine-tune or evaluate AI or machine-learning models, or
            including it in datasets. I expressly reserve my rights against text and data mining
            under Article 4(3) of EU Directive 2019/790 and the Czech laws that implement it;
          </li>
          <li>presenting the Artwork as your own work, or removing my name, credit or watermark.</li>
        </ul>

        <h3>1.3 How to ask for permission</h3>
        <p>
          Email me at <a :href="`mailto:${email}`">{{ email }}</a> and tell me which piece you want
          to use, where, how, and for how long. Permission only counts if I give it in writing (an
          email is fine). It covers only what we agreed on, and I may ask for credit or a fee.
        </p>

        <h3>1.4 Third-party characters, brands and designs</h3>
        <p>
          Some pieces are fan art or studies inspired by existing franchises, for example the
          Ornithopter (<em>Dune</em>) and the Deluxo (<em>Back to the Future</em> /
          <em>Grand Theft Auto</em>). Those names, designs and trademarks belong to their owners.
          I show these pieces non-commercially as personal practice, and I'm not affiliated with
          or endorsed by those owners. Any permission I give covers only my own contribution, not
          the rights of third parties.
        </p>

        <h3>1.5 The website itself</h3>
        <p>
          The text, design and layout of this website are protected in the same way. You may not
          copy them in whole or in substantial part without my permission.
        </p>

        <h3>1.6 Misuse</h3>
        <p>
          If the Artwork is used in a way these terms don't allow, I may ask for it to be removed
          and I reserve all rights and claims available under applicable law.
        </p>
      </section>

      <section id="privacy">
        <h2><span>02</span> Privacy policy</h2>
        <p>
          This policy explains what personal data is processed when you visit {{ siteLabel }} or
          contact me, in line with the EU General Data Protection Regulation (GDPR, Regulation (EU)
          2016/679) and Czech Act No. 110/2019 Coll. on personal data processing.
        </p>

        <h3>2.1 Who is responsible</h3>
        <p>
          The data controller is Matyáš Klubal, Czech Republic. For any privacy question or request
          please email <a :href="`mailto:${email}`">{{ email }}</a>.
        </p>

        <h3>2.2 What this site doesn't do</h3>
        <p>
          This website uses <strong>no cookies, no analytics, no advertising, no tracking pixels
          and no browser storage</strong>. It has no accounts and no forms. I don't sell or share
          your data, and no automated decision-making or profiling takes place.
        </p>

        <h3>2.3 Hosting (GitHub Pages)</h3>
        <p>
          The site is hosted on GitHub Pages, operated by GitHub, Inc. (USA). When you open the
          site, your browser automatically sends technical data to GitHub's servers: your IP
          address, the date and time, the requested page, your browser and operating system, and
          the referring page. GitHub may log this data to deliver the site and keep it secure. I
          have no access to these logs. Legal basis: my legitimate interest in running a secure,
          working website (Art. 6(1)(f) GDPR). GitHub participates in the EU–U.S. Data Privacy
          Framework, which covers transfers to the USA. See the
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Statement</a>.
        </p>

        <h3>2.4 Fonts (Google Fonts)</h3>
        <p>
          The site's typefaces are loaded from Google Fonts, a service of Google Ireland Limited
          and Google LLC. To deliver them, your browser connects to Google's servers, which
          receive your IP address. Legal basis: my legitimate interest in consistent typography
          (Art. 6(1)(f) GDPR). See the
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>
          and the
          <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener">Google Fonts privacy FAQ</a>.
        </p>

        <h3>2.5 When you email me</h3>
        <p>
          If you email me, I process your email address, your name and whatever you write, only
          to reply to you and, for commissions or job offers, to discuss a possible collaboration.
          Legal basis: steps taken at your request before entering into a contract (Art. 6(1)(b)
          GDPR) and my legitimate interest in answering messages (Art. 6(1)(f) GDPR). I keep
          messages only as long as the conversation or the collaboration requires, unless the law
          requires me to keep them longer. My email is provided by Google (Gmail).
        </p>

        <h3>2.6 External links</h3>
        <p>
          The site links to Instagram (Meta Platforms Ireland Ltd.) and other external sites. Those
          services only receive data once you follow a link, and their own privacy policies apply.
          The CV you can open or download is a static file served from this site.
        </p>

        <h3>2.7 Your rights</h3>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>access the personal data I hold about you (Art. 15);</li>
          <li>have it corrected (Art. 16) or erased (Art. 17);</li>
          <li>restrict its processing (Art. 18);</li>
          <li>receive it in a portable format (Art. 20);</li>
          <li>object to processing based on legitimate interest (Art. 21);</li>
          <li>
            lodge a complaint with a supervisory authority. In the Czech Republic that is the
            Office for Personal Data Protection (Úřad pro ochranu osobních údajů), Pplk. Sochora 27,
            170 00 Praha 7,
            <a href="https://uoou.gov.cz" target="_blank" rel="noopener">uoou.gov.cz</a>.
          </li>
        </ul>
        <p>To use any of these rights, just email me. I'll reply within one month.</p>

        <h3>2.8 Changes</h3>
        <p>
          I may update this page when the site changes. The date at the top always shows the
          current version.
        </p>
      </section>

      <section id="disclaimer">
        <h2><span>03</span> Disclaimer</h2>
        <p>
          I put care into the content of this site but provide it as is, without guarantees. I'm
          not responsible for the content of external websites linked from here. Those sites'
          operators are responsible for them.
        </p>
      </section>
    </article>
  </main>

  <footer class="lfoot container">
    <p>© {{ year }} MATYÁŠ KLUBAL · ALL RIGHTS RESERVED</p>
    <a href="/">{{ siteLabel }}</a>
  </footer>
</template>

<style scoped lang="scss">
.lnav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: rgba(8, 10, 15, 0.82);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line-2);

  @include below-tablet {
    padding: 0 22px;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-2);
    transition: 0.15s;

    &:hover {
      color: var(--red);
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
}

.legal {
  max-width: 920px;
}

.summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid var(--line-2);
  background: var(--line-2);

  @include below-tablet {
    grid-template-columns: 1fr;
  }

  &__col,
  &__privacy {
    padding: 22px 24px;
    background: var(--bg-2);
  }

  &__kicker {
    @include mono-label(10px);
    margin: 0 0 14px;
    color: var(--success);

    &--no {
      color: var(--red);
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 5px 0;
    font-size: 15px;
    color: var(--fg-1);

    svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 3px;
    }
  }

  &__col:first-child svg {
    color: var(--success);
  }

  &__col:nth-child(2) svg {
    color: var(--red);
  }

  &__privacy {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 14px;
    color: var(--fg-2);

    strong {
      color: var(--fg-0);
    }
  }
}

.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  margin: 34px 0 0;
  padding: 0;
  list-style: none;

  a {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-2);
    transition: 0.15s;

    &:hover {
      color: var(--red);
    }
  }
}

.doc {
  section {
    padding-top: 56px;
    scroll-margin-top: 60px;
  }

  h2 {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin: 0 0 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line-2);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.1;
    text-transform: uppercase;

    span {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 400;
      color: var(--red);
    }
  }

  h3 {
    margin: 30px 0 10px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--fg-0);
  }

  p,
  li {
    font-size: 15px;
    line-height: 1.75;
    color: var(--fg-1);
  }

  p {
    margin: 0 0 12px;
  }

  ul {
    margin: 0 0 12px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;

    &::marker {
      color: var(--red);
    }
  }

  strong {
    color: var(--fg-0);
  }

  a {
    color: var(--fg-0);
    text-decoration: underline;
    text-decoration-color: var(--line-red);
    text-underline-offset: 3px;
    transition: 0.15s;

    &:hover {
      color: var(--red);
    }
  }
}

.lfoot {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 90px;
  padding-top: 26px;
  padding-bottom: 26px;
  border-top: 1px solid var(--line-2);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--fg-3);

  p {
    margin: 0;
  }

  a:hover {
    color: var(--red);
  }
}
</style>
