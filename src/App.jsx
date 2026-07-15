import {
  artistNotes,
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

import { useEffect, useState } from 'react'

function InstagramFeed() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/.netlify/functions/instagram-feed', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Instagram feed is unavailable')
        return response.json()
      })
      .then((data) => {
        setPosts(data.posts ?? [])
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('fallback')
      })

    return () => controller.abort()
  }, [])

  if (status === 'loading') {
    return <p className="feed-status">Connecting to Instagram...</p>
  }

  if (status === 'fallback' || posts.length === 0) {
    return (
      <div className="instagram-fallback">
        <img src={abstractConflictLogo} alt="Abstract Conflict illustrated logo" />
        <div>
          <p className="instagram-handle">@abstract.conflict</p>
          <p>See the latest artwork, studio updates, and new releases on Instagram.</p>
          <a className="action-button" href={siteContent.instagramUrl} target="_blank" rel="noreferrer">
            Open Instagram Profile ↗
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="instagram-grid">
      {posts.map((post) => (
        <a
          className="instagram-post"
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          key={post.id}
          aria-label="View this post on Instagram"
        >
          {post.mediaType === 'VIDEO' ? (
            <video src={post.mediaUrl} poster={post.thumbnailUrl} muted playsInline preload="metadata" />
          ) : (
            <img src={post.mediaUrl} alt={post.caption || 'Recent post by Abstract Conflict'} loading="lazy" />
          )}
          <span className="post-overlay">View on Instagram ↗</span>
        </a>
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

export default function App() {
  return (
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
              <a href="#instagram">Instagram</a>
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
                    <a className="action-button" href="#instagram">
                      Latest on Instagram
                    </a>
                    <a className="ghost-button" href="#about">
                      Meet the Artist
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="instagram-panel" id="instagram">
              <SectionTitle
                index="02"
                title="Latest on Instagram"
                body="The newest posts from @abstract.conflict. Follow along for finished work, experiments, studio updates, and releases."
              />
              <InstagramFeed />
              <div className="instagram-footer">
                <a className="ghost-button" href={siteContent.instagramUrl} target="_blank" rel="noreferrer">
                  Follow @abstract.conflict ↗
                </a>
              </div>
            </section>

            <section className="about-panel" id="about">
              <SectionTitle
                index="03"
                title="About the Artist"
                body="A haberdasherer turned brilliant visual artist."
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
  )
}
