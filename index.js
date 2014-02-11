
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var debug = require('debug')('monlog-cli');
var request = require('superagent');
var assert = require('assert');
var only = require('only');

/**
 * Expose `Monlog` client.
 */

module.exports = Monlog;

/**
 * Initialize a new Monlog client.
 *
 * @param {Object} opts
 * @api public
 */

function Monlog(opts) {
  assert(opts.url, 'monlog --url required');
  this.url = opts.url;
}

/**
 * Respond with stats.
 *
 * @param {Function} fn
 * @api public
 */

Monlog.prototype.stats = function(fn){
  request
  .get(this.url + '/stats')
  .end(function(err, res){
    if (err) return fn(err);
    if (res.error) return fn(res.error);
    fn(null, res.body);
  });
};

/**
 * Query with `str` and return an emitter.
 *
 * @param {String} str
 * @param {Object} opts
 * @return {Emitter}
 * @api public
 */

Monlog.prototype.query = function(str, opts){
  var e = new Emitter;
  var url = this.url;

  opts = opts || {};
  opts.query = str;

  request
  .get(url)
  .query(opts)
  .end(function(err, res){
    if (err) return e.emit('error', err);
    if (res.error) return e.emit('error', res.error);

    res.body.forEach(function(log){
      e.emit('data', log);
    });

    e.emit('end');
  });

  return e;
};