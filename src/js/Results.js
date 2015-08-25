var React = require('react');
var pikachu = require('./client');
var Stats = require('./Stats');
var Types = require('./Types');
var Moves = require('./Moves');
var PropTypes = React.PropTypes;

var Results = React.createClass({
  getInitialState: function() {
    return {
      view: "stats",
    };
  },

  handleView: function() {
    switch (this.state.view) {
      case "stats":
        return (<Stats pokemon={ this.props.pokemon } />);
      break;
      case "types":
        return (<Types pokemon={ this.props.pokemon } />);
      break;
      case "moves":
        return (<Moves pokemon={ this.props.pokemon } />);
      break;
    }
  },

  statsClickHandler: function(e) {
    e.preventDefault();
      this.setState({ view: "stats" });
  },

  typesClickHandler: function(e) {
    e.preventDefault();
      this.setState({ view: "types" });
  },

  movesClickHandler: function(e) {
    e.preventDefault();
      this.setState({ view: "moves" });
  },

  backClickHandler: function(e) {
    e.preventDefault();
    this.props.onBack();
  },

  render: function() {

    var resultStyle = {
      backgroundImage: "url(" + this.props.pokemon.image + ")",
      backgroundColor: "#fff",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center center",
      opacity: "1"
    };

    var statStyle = "result__tab";
    var typeStyle = "result__tab";
    var moveStyle = "result__tab";

    if (this.state.view === "stats") {
      statStyle += " result__tab--active";
    } else if (this.state.view === "types") {
      typeStyle += " result__tab--active";
    } else if (this.state.view === "moves") {
      moveStyle += " result__tab--active";
    };

    return (
      <div className="result" style={ resultStyle } >
        <div className="result--opacity">
          <a href="#" onClick={ this.backClickHandler } className="result__back-button">
            back
          </a>
          <div
            className="result__title"
          >
            { this.props.pokemon.name }
          </div>
          <div className="result__tabs">
            <a href="#" onClick={ this.statsClickHandler } className={ statStyle }>
              stats
            </a>
            <a href="#" onClick={ this.typesClickHandler } className={ typeStyle }>
              types
            </a>
            <a href="#" onClick={ this.movesClickHandler } className={ moveStyle }>
              moves
            </a>
          </div>
            { this.handleView() }
          </div>
      </div>
     );
   }

});
module.exports = Results;
