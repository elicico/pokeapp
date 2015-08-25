var React = require("react");
var Sheet = require("./Sheet");
var Autocomplete = require("./Autocomplete")

var React = require('react');
var PropTypes = React.PropTypes;

var App = React.createClass({

  render: function() {
    return (
      <div className="app-container">
        <div className="sheets">
          <div className="app-container__title">crafty ditto</div>
          <div className="sheets__item--left">
            <Sheet />
          </div>
          <div className="sheets__item--right">
            <Sheet />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = App;
