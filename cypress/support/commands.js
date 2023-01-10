import '@plone/volto/cypress/add-commands';
import { ploneAuth } from '@plone/volto/cypress/support/constants';

const HOSTNAME = Cypress.env('BACKEND_HOST') || 'localhost';
const GUILLOTINA_API_URL = `http://${HOSTNAME}:8081/db/web`;
const PLONE_SITE_ID = Cypress.env('SITE_ID') || 'plone';
const PLONE_API_URL =
  Cypress.env('API_PATH') || `http://${HOSTNAME}:55001/${PLONE_SITE_ID}`;

const ploneAuthObj = {
  user: ploneAuth[0],
  pass: ploneAuth[1],
};

// Set PLONE_SITE_ID and PLONE_API_URL as cypress environment variables
//   if testing without using localhost or a site id of `plone`.

// --- CUSTOM COMMANDS -------------------------------------------------------------
Cypress.Commands.add('custom_command', () => {
  // Custom code here...
});

// --- CREATE CONTENT --------------------------------------------------------
Cypress.Commands.add(
  'createContent',
  ({
    contentType,
    contentId,
    contentTitle,
    contentDescription,
    path = '',
    allow_discussion = false,
    transition = '',
    bodyModifier = (body) => body,
    image = false,
  }) => {
    let api_url, auth;

    api_url = PLONE_API_URL;
    auth = ploneAuthObj;

    const defaultParams = {
      method: 'POST',
      url: `${api_url}/${path}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {
        '@type': contentType,
        id: contentId,
        title: contentTitle,
        description: contentDescription,
        allow_discussion: allow_discussion,
      },
    };

    if (contentType === 'File') {
      const params = {
        ...defaultParams,
        body: bodyModifier({
          ...defaultParams.body,
          file: {
            data: 'dGVzdGZpbGUK',
            encoding: 'base64',
            filename: 'lorem.txt',
            'content-type': 'text/plain',
          },
        }),
      };

      return cy.request(params);
    }
    if (contentType === 'Image') {
      const params = {
        ...defaultParams,
        body: bodyModifier({
          ...defaultParams.body,
          image: {
            data:
              'iVBORw0KGgoAAAANSUhEUgAAANcAAAA4CAMAAABZsZ3QAAAAM1BMVEX29fK42OU+oMvn7u9drtIPisHI4OhstdWZyt4fkcXX5+sAg74umMhNp86p0eJ7vNiKw9v/UV4wAAAAAXRSTlMAQObYZgAABBxJREFUeF7tmuty4yAMhZG4X2zn/Z92J5tsBJwWXG/i3XR6frW2Y/SBLIRAfaQUDNt8E5tLUt9BycfcKfq3R6Mlfyimtx4rzp+K3dtibXkor99zsEqLYZltblTecciogoh+TXfY1Ve4dn07rCDGG9dHSEEOg/GmXl0U1XDxTKxNK5De7BxsyyBr6gGm2/vPxKJ8F6f7BXKfRMp1xIWK9A+5ks25alSb353dWnDJN1k35EL5f8dVGifTf/4tjUuuFq7u4srmXC60yAmldLXIWbg65RKU87lcGxJCFqUPv0IacW0PmSivOZFLE908inPToMmii/roG+MRV/O8FU88i8tFsxV3a06MFUw0Qu7RmAtdV5/HVVaOVMTWNOWSwMljLhzhcB6XIS7OK5V6AvRDNN7t5VJWQs1J40UmalbK56usBG/CuCHSYuc+rkUGeMCViNRARPrzW52N3oQLe6WifNliSuuGaH3czbVNudI9s7ZLUCLHVwWlyES522o1t14uvmbblmVTKqFjaZYJFSTPP4dLL1kU1z7p0lzdbRulmEWLxoQX+z9ce7A8GqEEucllLxePuZwdJl1Lezu0hoswvTPt61DrFcRuujV/2cmlxaGBC7Aw6cpovGANwRiSdOAWJ5AGy4gLL64dl0QhUEAuEUNws+XxV+OKGPdw/hESGYF9XEGaFC7sNLMSXWJjHsnanYi87VK428N2uxpOjOFANcagLM5l+7mSycM8KknZpKLcGi6jmzWGr/vLurZ/0g4u9AZuAoeb5r1ceQhyiTPY1E4wUR6u/F3H2ojSpXMMriBPT9cezTto8Cx+MsglHL4fv1Rxrb1LVw9yvyQpJ3AhFnLZfuRLH2QsOG3FGGD20X/th/u5bFAt16Bt308KjF+MNOXgl/SquIEySX3GhaZvc67KZbDxcCDORz2N8yCWPaY5lyQZO7lQ29fnZbt3Xu6qoge4+DjXl/MocySPOp9rlvdyznahRyHEYd77v3LhugOXDv4J65QXfl803BDAdaWBEDhfVx7nKofjoVCgxnUAqw/UAUDPn788BDvQuG4TDtdtUPvzjSlXAB8DvaDOhhrmhwbywylXAm8CvaouikJTL93gs3y7Yy4VYbIxOHrcMizPqWOjqO9l3Uz52kibQy4xxOgqhJvD+w5rvokOcAlGvNCfeqCv1ste1stzLm0f71Iq3ZfTrPfuE5nhPtF+LvQE2lffQC7pYtQy3tdzdrKvd5TLVVzDetScS3nEKmmwDyt1Cev1kX3YfbvzNK4fzrlw+cB6vm+uiUgf2zdXI62241LawCb7Pi5FXFPF8KpzDoF/Sw2lg+GrHNbno1mhPu+VCF/vfMnw06PnUl6j48dVHD3jHNHPua+fc3o/5yp/zsGi0vYtzi3Pz5mHd4T6BWMIlewacd63AAAAAElFTkSuQmCC',
            encoding: 'base64',
            filename: 'image.png',
            'content-type': 'image/png',
          },
        }),
      };

      return cy.request(params);
    }
    if (
      ['Document', 'News Item', 'Folder', 'CMSFolder'].includes(contentType)
    ) {
      const params = {
        ...defaultParams,
        body: {
          ...defaultParams.body,
          blocks: {
            'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
            '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'slate' },
          },
          blocks_layout: {
            items: [
              'd3f1c443-583f-4e8e-a682-3bf25752a300',
              '7624cf59-05d0-4055-8f55-5fd6597d84b0',
            ],
          },
        },
      };

      if (image) {
        let sourceFilename = 'cypress/fixtures/halfdome2022.jpg';
        let imageObject = {
          encoding: 'base64',
          filename: 'image.jpg',
          'content-type': 'image/jpg',
        };
        if (typeof image === 'object') {
          sourceFilename = image.sourceFilename;
          imageObject = {
            ...imageObject,
            ...image,
          };
        }
        cy.readFile(sourceFilename, 'base64').then((encodedImage) => {
          const withImageParams = {
            ...params,
            body: bodyModifier({
              ...params.body,
              preview_image: {
                ...imageObject,
                data: encodedImage,
              },
            }),
          };

          return cy.request(withImageParams).then(() => {
            if (transition) {
              cy.setWorkflow({
                path: path || contentId,
                review_state: transition,
              });
            }
            console.log(`${contentType} created`);
          });
        });
      } else {
        const documentParams = {
          ...params,
          body: bodyModifier({
            ...params.body,
          }),
        };
        return cy.request(documentParams).then(() => {
          if (transition) {
            cy.setWorkflow({
              path: path || contentId,
              review_state: transition,
            });
          }
          console.log(`${contentType} created`);
        });
      }
    } else {
      return cy
        .request({
          method: 'POST',
          url: `${api_url}/${path}`,
          headers: {
            Accept: 'application/json',
          },
          auth: auth,
          body: bodyModifier({
            '@type': contentType,
            id: contentId,
            title: contentTitle,
            allow_discussion: allow_discussion,
          }),
        })
        .then(() => {
          if (transition) {
            cy.setWorkflow({
              path: path || contentId,
              review_state: transition,
            });
          }
          console.log(`${contentType} created`);
        });
    }
  },
);
