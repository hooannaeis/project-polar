const functions = require('firebase-functions');
const random = require('random');
const seedrandom = require('seedrandom');

const { adjectives, animals } = require('./words');

/**
 * @Method: Returns a random animal from the words list.
 * @returns {string}
 */
function animal() {
  return animals[random.int(0, animals.length)];
}

/**
 * @Method: Returns a random adjective from the words list.
 * @returns {string}
 */
function adjective() {
  return adjectives[random.int(0, adjectives.length)];
}


/**
 * returns a random adjective + animal
 * if you input the same inputSeed, the
 * returned string will be the same each time
 *
 * @export
 * @param {Number} inputSeed (Optional) random seed to fix the result ot
 * @returns string adjective-animal
 */
exports.main = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return true;
  }

  if (req.query.inputSeed) {
    // if inputSeed is not a number, create a random one
    random.use(seedrandom(req.query.inputSeed));
  }
  const friendlyName = `${adjective()}-${animal()}`.toLowerCase();
  res.send(friendlyName);
});
