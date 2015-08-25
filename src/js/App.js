var React = require("react");
var Sheet = require("./Sheet");
var Autocomplete = require("./Autocomplete")

var React = require('react');
var PropTypes = React.PropTypes;

var App = React.createClass({

  render: function() {
    return (
      <div>
      <div className="app-container">
          <div className="sheet-container">
            <div className="app-container__title">crafty ditto</div>
              <div className="sheet--left">
                <Sheet />
              </div>
              <div className="sheet--right">
                <Sheet />
              </div>
          </div>
      </div>
      </div>
    );
  }

});

module.exports = App;
