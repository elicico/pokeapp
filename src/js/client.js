var Client = function (url, verb) {
  this._verb = verb;
  this._url = url;
  this._params = {};
  this._headers = {};
  this._body = null;
}

Client.prototype = {
  params: function(params) {
    this._params = params;
    return this;
  },

  headers: function(headers) {
    this._headers = headers;
    return this;
  },

  body: function(body) {
    this._body = body;
    return this;
  },

  done: function(cb) {
    var xhr = new XMLHttpRequest;

    var queryString = [];
    for (var key in this._params) {
      var value = this._params[key];
      queryString.push(key + "=" + value);
    }
    queryString = queryString.join("&");

    xhr.open(this._verb, this._url + "?" + queryString, true);

    for (var key in this._headers) {
      var value = this._headers[key];
      xhr.setRequestHeader(key, value);
    }

    xhr.onerror = function(error) {
      cb(error);
    }

    xhr.onload = function() {

      if (xhr.status >= 200 && xhr.status < 300) {
        var bodyToBeParsed = xhr.responseText;
        cb(null, JSON.parse(bodyToBeParsed));
      }
      else {
        cb(xhr);
      }
    }

    xhr.send(JSON.stringify(this._body));

  }
};

module.exports = {
  get: function(url) {
    return new Client(url, "GET");
  },

  post: function(url) {
    return new Client(url, "POST");
  }
};
