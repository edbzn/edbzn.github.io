import { Link } from 'gatsby';
import React from 'react';
import rss from '../../static/icons/rss.svg';
import { rhythm } from '../utils/typography';
import { Service } from './service';

class Layout extends React.Component {
  render() {
    const { children, location, github, author } = this.props;
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: rhythm(0.4),
          marginBottom: rhythm(1.4),
          maxWidth: '698px',
        }}
      >
        <header
          style={{
            background: '#fff',
            paddingBottom: 18,
            paddingTop: 18,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
              fontFamily: "'Public Sans', sans-serif",
              fontSize: rhythm(1.4),
            }}
            to={`/`}
          >
            {location.pathname === '/' ? '/About me' : '/Blog'}
          </Link>
        </header>
        <main style={{ marginTop: rhythm(1) }}>{children}</main>
        <Service />
        <footer
          role="contentinfo"
          style={{ marginTop: rhythm(2), fontSize: 14, fontWeight: 100 }}
        >
          <div
            style={{
              textAlign: 'center',
              fontFamily: '"Public Sans", sans-serif',
              fontSize: 14,
            }}
          >
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0"
              style={{ boxShadow: 'none' }}
            >
              CC BY-SA 4.0
            </a>
            &nbsp;
            {new Date().getFullYear()}&nbsp;&copy;&nbsp;{author} ·{' '}
            <a href="/rss.xml" style={{ boxShadow: 'none' }}>
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
              RSS
            </a>{' '}
            ·{' '}
            <a href={github.repositoryUrl} style={{ boxShadow: 'none' }}>
              🔑&nbsp;Source&nbsp;code
            </a>{' '}
            ·{' '}
            <a href={github.sponsorUrl} style={{ boxShadow: 'none' }}>
              ❤️&nbsp;Become&nbsp;a&nbsp;GitHub&nbsp;Sponsor
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
