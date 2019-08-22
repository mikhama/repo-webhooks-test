const crypto = require('crypto');
const HOOK_SECRET = 'hello_everybody'

const createComparisonSignature = (body) => {
  const hmac = crypto.createHmac('sha1', HOOK_SECRET);
  const self_signature = hmac.update(JSON.stringify(body)).digest('hex');
  return `sha1=${self_signature}`;
}

const compareSignatures = (signature, comparison_signature) => {
  const source = Buffer.from(signature);
  const comparison = Buffer.from(comparison_signature);
  return crypto.timingSafeEqual(source, comparison);
}

const verifyGithubPayload = (req, res, next) => {
  const { headers, body } = req;

  const signature = headers['x-hub-signature'];
  const comparison_signature = createComparisonSignature(body);

  if (!compareSignatures(signature, comparison_signature)) {
    return res.status(401).send('Mismatched signatures');
  }

  const { action, ...payload } = body;
  req.event_type = headers['x-github-event'];
  req.action = action;
  req.payload = payload;
  next();
}

module.exports = verifyGithubPayload;