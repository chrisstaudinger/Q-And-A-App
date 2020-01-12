const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-t3f5y7r6.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'rvWgSnXWdasN5GdsbeYZ9vCHzd0cmowG',
  issuer: `https://dev-t3f5y7r6.au.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = {
  checkJwt
}