var React = require('react');
var pikachu = require('./client');
var Stats = require('./Stats');
var Types = require('./Types');
var Moves = require('./Moves');
var PropTypes = React.PropTypes;

var Results = React.createClass({
  getInitialState: function() {
    return {
      view: "stats"
    };
  },

  handleView: function() {
    switch (this.state.view) {
      case "stats":
        return <Stats pokemon={ this.props.pokemon } />;
      case "types":
        return <Types pokemon={ this.props.pokemon } />;
      case "moves":
        return <Moves pokemon={ this.props.pokemon } />;
    }
  },

  changeTabHandler: function(newTab, e) {
    e.preventDefault();
    this.setState({ view: newTab });
  },

  backClickHandler: function(e) {
    e.preventDefault();
    this.props.onBack();
  },

  render: function() {

    var resultStyle = {
      backgroundImage: "url(" + this.props.pokemon.image + ")"
    };

    return (
      <div className="result" style={ resultStyle } >
        <div className="result--opacity">
          <a href="#" onClick={ this.backClickHandler } className="result__back-button">
            back
          </a>
          <div className="result__title">
            { this.props.pokemon.name }
          </div>
          <div className="result__tabs">
            { [ "stats", "types", "moves" ].map(this.renderTab) }
          </div>
         { this.handleView() }
          </div>
      </div>
     );
   },

   renderTab: function(tabName) {
     var className = "result__tab" + ( this.state.view === tabName ? " result__tab--active" : "" );

     return (
       <a
        key={ tabName }
        href="#"
        onClick={ this.changeTabHandler.bind(this, tabName) }
        className={ className }
      >
        { tabName }
      </a>
     );
   }

});
module.exports = Results;
