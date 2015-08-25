var React = require('react');

var Spinner = React.createClass({
  render: function() {
    return (
      <div className="spinner">
        <div className="spinner__cube spinner__cube--1"></div>
        <div className="spinner__cube spinner__cube--2"></div>
        <div className="spinner__cube spinner__cube--3"></div>
        <div className="spinner__cube spinner__cube--4"></div>
        <div className="spinner__cube spinner__cube--5"></div>
        <div className="spinner__cube spinner__cube--6"></div>
        <div className="spinner__cube spinner__cube--7"></div>
        <div className="spinner__cube spinner__cube--8"></div>
        <div className="spinner__cube spinner__cube--9"></div>
      </div>
    );
  }
});

module.exports = Spinner;

