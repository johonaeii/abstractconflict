import { useEffect, useState } from 'react'
import {
  bioParagraphs,
  buyingNotes,
  featuredWorks,
  siteContent,
  studioPosts,
} from './data/siteContent'

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="section-copy">{body}</p> : null}
    </div>
  )
}

function PatternBand() {
  return <div className="pattern-band" aria-hidden="true" />
}

function WorkCard({ work }) {
  return (
    <article className="work-card">
      <div className="work-frame">
        <img src={work.image} alt={work.alt} />
      </div>
      <div className="work-meta">
        <div>
          <h3>{work.title}</h3>
          <p>
            {work.medium} · {work.year}
          </p>
        </div>
        <span className="availability-pill">{work.availability}</span>
      </div>
      <a
        className="text-link"
        href="#contact"
      >
        {work.inquiryLabel}
      </a>
    </article>
  )
}

function StudioGrid({ posts, onPreview }) {
  return (
    <div className="studio-grid">
      {posts.map((post, index) => (
        <button
          key={post.id}
          className={`studio-tile tile-${(index % 3) + 1}`}
          type="button"
          onClick={() => onPreview(post)}
        >
          <img src={post.image} alt={post.alt} />
          <span>{post.caption}</span>
        </button>
      ))}
    </div>
  )
}

function InquiryForm() {
  return (
    <form
      className="inquiry-form"
      name="portfolio-inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="portfolio-inquiry" />
      <input type="hidden" name="bot-field" />
      <label>
        Name
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        Artwork interest
        <select name="artwork-interest" defaultValue="Original painting">
          <option>Original painting</option>
          <option>Print edition</option>
          <option>Commission</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>
        Budget range
        <select name="budget-range" defaultValue="Not sure yet">
          <option>Under $500</option>
          <option>$500 - $1,500</option>
          <option>$1,500 - $5,000</option>
          <option>$5,000+</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="full-width">
        Message
        <textarea
          name="message"
          rows="5"
          placeholder="Tell me which piece, print, or commission direction you have in mind."
          required
        />
      </label>
      <button className="button button-primary" type="submit">
        Send Inquiry
      </button>
    </form>
  )
}

function PreviewModal({ post, onClose }) {
  useEffect(() => {
    if (!post) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [post, onClose])

  if (!post) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        <img src={post.image} alt={post.alt} />
        <div className="modal-copy">
          <p>{post.caption}</p>
          <a className="text-link" href={post.instagramUrl} target="_blank" rel="noreferrer">
            View on Instagram
          </a>
        </div>
      </div>
      <button className="modal-scrim" type="button" onClick={onClose} aria-label="Close preview" />
    </div>
  )
}

export default function App() {
  const [previewPost, setPreviewPost] = useState(null)

  return (
    <>
      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true" />
            {siteContent.artistName}
          </a>
          <nav className="nav">
            <a href="#work">Work</a>
            <a href="#studio">Studio</a>
            <a href="#buying">Buying</a>
            <a href="#bio">Bio</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">Visual Art Portfolio</p>
              <h1>{siteContent.artistName}</h1>
              <p className="hero-text">{siteContent.positioning}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  View Work
                </a>
                <a className="button button-secondary" href="#contact">
                  Inquire / Buy Prints
                </a>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-frame">
                <img
                  src="/artworks/hero-feature.svg"
                  alt="Featured surreal pastel artwork with graphic eyes and jagged hypnotic patterns."
                />
              </div>
              <PatternBand />
            </div>
          </section>

          <section className="featured-section" id="work">
            <SectionHeading
              eyebrow="Featured Works"
              title="A clean digital gallery for bold, strange, collectible work."
              body="Paintings, drawings, and prints presented with the pacing and clarity of a professional collector portfolio."
            />
            <div className="works-grid">
              {featuredWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </section>

          <section className="studio-section" id="studio">
            <SectionHeading
              eyebrow="Recent Studio Work"
              title="Current process, handled like portfolio material."
              body="A curated look at ongoing paintings, print prep, and works in progress."
            />
            <StudioGrid posts={studioPosts} onPreview={setPreviewPost} />
            <a
              className="button button-primary"
              href={siteContent.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Follow the Process
            </a>
          </section>

          <section className="buying-section" id="buying">
            <div className="buying-panel">
              <SectionHeading
                eyebrow="Prints / Commissions / Buying Info"
                title="Straightforward ways to collect the work."
                body="Whether you are looking for an original, a limited print, or a commission, the process is direct and conversation-led."
              />
              <div className="notes-grid">
                {buyingNotes.map((note) => (
                  <div key={note} className="note-card">
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bio-section" id="bio">
            <SectionHeading
              eyebrow="Artist Bio"
              title="Surreal, playful, and grounded enough for serious walls."
            />
            <div className="bio-card">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="contact-card">
              <SectionHeading
                eyebrow="Contact / Inquiry"
                title="Collectors, galleries, and clients can reach the studio here."
                body="Use the form for original work, print availability, commissions, or exhibition conversations."
              />
              <div className="contact-grid">
                <div className="contact-details">
                  <div className="trust-box">
                    <span className="detail-label">Email</span>
                    <p>{siteContent.contactEmailLabel}</p>
                  </div>
                  <div className="trust-box">
                    <span className="detail-label">Instagram</span>
                    <a href={siteContent.instagramUrl} target="_blank" rel="noreferrer">
                      {siteContent.instagramHandle}
                    </a>
                  </div>
                  <div className="trust-box">
                    <span className="detail-label">Best for</span>
                    <p>Original inquiries, print requests, commissions, and gallery outreach.</p>
                  </div>
                </div>
                <InquiryForm />
              </div>
            </div>
          </section>
        </main>
      </div>
      <PreviewModal post={previewPost} onClose={() => setPreviewPost(null)} />
    </>
  )
}
