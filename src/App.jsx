import { useEffect, useState } from 'react'
import {
  artistNotes,
  featuredWorks,
  homeHighlights,
  siteContent,
} from './data/siteContent'
import artistPortrait from '../img/sc-hero.png'
import abstractConflictLogo from '../img/logo-ac.png'

function SectionTitle({ index, title, body }) {
  return (
    <div className="section-title">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
    </div>
  )
}

function ArtworkCard({ work, onOpen }) {
  return (
    <article className="artwork-card">
      <button className="artwork-image-button" type="button" onClick={() => onOpen(work)}>
        <img src={work.image} alt={work.alt} />
      </button>
      <div className="artwork-copy">
        <div className="artwork-heading">
          <h3>{work.title}</h3>
          <span className="availability-badge">{work.availability}</span>
        </div>
        <p className="artwork-meta">
          {work.medium} · {work.year}
        </p>
        <p className="artwork-description">{work.description}</p>
      </div>
    </article>
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
        Interest
        <select name="interest" defaultValue="Original artwork">
          <option>Original artwork</option>
          <option>Prints</option>
          <option>Commission</option>
          <option>Exhibition / gallery inquiry</option>
        </select>
      </label>
      <label>
        Budget
        <select name="budget" defaultValue="Not sure yet">
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
          placeholder="Tell the studio which piece, print, or project you have in mind."
          required
        />
      </label>
      <button className="action-button" type="submit">
        Send Inquiry
      </button>
    </form>
  )
}

function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [artwork, onClose])

  if (!artwork) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <button className="modal-scrim" type="button" onClick={onClose} aria-label="Close artwork preview" />
      <div className="modal-card">
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        <img src={artwork.image} alt={artwork.alt} />
        <div className="modal-details">
          <h3>{artwork.title}</h3>
          <p>
            {artwork.medium} · {artwork.year}
          </p>
          <p>{artwork.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeArtwork, setActiveArtwork] = useState(null)

  return (
    <>
      <div className="page-shell">
        <div className="content-board">
          <header className="masthead" id="home">
            <div className="brand-stack">
              <img className="brand-logo" src={abstractConflictLogo} alt="" />
              <div>
                <p className="brand-kicker">{siteContent.kicker}</p>
                <h1>{siteContent.artistName}</h1>
              </div>
            </div>

            <nav className="top-tabs" aria-label="Primary">
              <a href="#home">Home</a>
              <a href="#artwork">Artwork</a>
              <a href="#about">About the Artist</a>
            </nav>
          </header>

          <div className="marquee-bar" aria-label="Studio update">
            <span>✦ WELCOME TO THE ABSTRACT CONFLICT ONLINE STUDIO ✦ ORIGINALS · PRINTS · COMMISSIONS ✦</span>
          </div>

          <main className="board-main">
            <section className="home-panel">
              <div className="hero-layout">
                <div className="hero-art-panel">
                  <div className="hero-image-frame">
                    <img
                      src={artistPortrait}
                      alt="The artist in a yellow sweatshirt, holding a lighter in front of a painted mural."
                    />
                    <p className="image-caption">SC // ARTIST AT WORK // 2026</p>
                  </div>
                </div>

                <div className="hero-copy-panel">
                  <SectionTitle
                    index="01"
                    title="Home"
                    body={siteContent.positioning}
                  />
                  <div className="highlight-list">
                    {homeHighlights.map((item) => (
                      <div key={item.title} className="highlight-card">
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </div>
                    ))}
                  </div>
                  <div className="hero-actions">
                    <a className="action-button" href="#artwork">
                      View Artwork
                    </a>
                    <a className="ghost-button" href="#about">
                      Meet the Artist
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="artwork-panel" id="artwork">
              <SectionTitle
                index="02"
                title="Artwork"
                body="A tighter gallery inspired by the reference site’s centered shopping-window feel, but rebuilt as a collector-facing portfolio."
              />
              <div className="artwork-grid">
                {featuredWorks.map((work) => (
                  <ArtworkCard key={work.id} work={work} onOpen={setActiveArtwork} />
                ))}
              </div>
            </section>

            <section className="about-panel" id="about">
              <SectionTitle
                index="03"
                title="About the Artist"
                body="A short studio profile, a few grounding notes about the work, and a direct contact path for buyers, galleries, and commissions."
              />
              <div className="about-layout">
                <div className="about-copy">
                  {artistNotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}

                  <div className="contact-block">
                    <div className="contact-item">
                      <span>Email</span>
                      <p>{siteContent.contactEmailLabel}</p>
                    </div>
                    <div className="contact-item">
                      <span>Instagram</span>
                      <a href={siteContent.instagramUrl} target="_blank" rel="noreferrer">
                        {siteContent.instagramHandle}
                      </a>
                    </div>
                    <div className="contact-item">
                      <span>Best for</span>
                      <p>Originals, print inquiries, commissions, and gallery outreach.</p>
                    </div>
                  </div>
                </div>

                <div className="about-form-panel">
                  <h3>Start an inquiry</h3>
                  <p>
                    Use the form for available work, edition requests, commissions, or exhibition conversations.
                  </p>
                  <InquiryForm />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <ArtworkModal artwork={activeArtwork} onClose={() => setActiveArtwork(null)} />
    </>
  )
}
