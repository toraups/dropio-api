/**
 * Basic Helmet configuration
 * Keeps defaults but makes a few important tweaks
 * suitable for APIs and learning setups
 */
const options = {
  contentSecurityPolicy: false,

  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },

  referrerPolicy: {
    policy: "no-referrer",
  },

  frameguard: {
    action: "deny",
  },

  hidePoweredBy: true,

  noSniff: true,
};

export default options;
