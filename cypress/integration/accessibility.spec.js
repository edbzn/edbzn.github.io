/// <reference types="Cypress" />

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task('table', violationData);
}

describe('Accessibility tests', () => {
  it('Has no detectable accessibility violations on home', () => {
    cy.visit('/')
      .wait(1000)
      .get('main')
      .injectAxe()
      .checkA11y(
        null,
        {
          includedImpacts: ['critical', 'serious'],
        },
        terminalLog
      );
  });

  it('Has no detectable accessibility violations on blog', () => {
    cy.visit('/blog')
      .wait(1000)
      .get('main')
      .injectAxe()
      .checkA11y(
        null,
        {
          includedImpacts: ['critical', 'serious'],
        },
        terminalLog
      );
  });

  it('Has no detectable accessibility violations on a blog post', () => {
    cy.visit('/data-store-service-in-angular')
      .wait(1000)
      .get('main')
      .injectAxe()
      .checkA11y(
        null,
        {
          includedImpacts: ['critical', 'serious'],
        },
        terminalLog
      );
  });
});
