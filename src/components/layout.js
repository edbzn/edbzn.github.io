import { Link } from 'gatsby';
import React from 'react';
import rss from '../../static/icons/rss.svg';
import { rhythm } from '../utils/typography';
import { Service } from './service';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: rhythm(0.4),
          marginBottom: rhythm(1.4),
          maxWidth: rhythm(26),
        }}
      >
        <header
          style={{
            background: '#fff',
            paddingBottom: 18,
            paddingTop: 18,
          }}
        >
          <span
            style={{
              marginBottom: 0,
              marginTop: 0,
              fontFamily: "'Merriweather', 'Georgia', serif",
              fontSize: rhythm(0.9),
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
                fontWeight: '100',
              }}
              to={`/`}
            >
              <strong>edbzn</strong>.github.io
            </Link>
          </span>
        </header>
        <main style={{ marginTop: rhythm(1) }}>{children}</main>
        <Service />
        <footer
          role="contentinfo"
          style={{ marginTop: rhythm(2), fontSize: 14, fontWeight: 100 }}
        >
          <div style={{ textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} · Edouard Bozon ·{' '}
            <a href="/rss.xml">
              <img
                src={rss}
                alt="RSS feed icon"
                style={{
                  width: 14,
                  marginBottom: -2,
                  marginRight: 2,
                  marginLeft: 2,
                }}
              />{' '}
              RSS feed
            </a>{' '}
            · This website is under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0">
              CC BY-SA 4.0
            </a>{' '}
            license
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
