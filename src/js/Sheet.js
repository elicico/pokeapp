var React = require('react');
var Autocomplete = require('./Autocomplete');
var Results = require('./Results');
var PropTypes = React.PropTypes;

var Sheet = React.createClass({
  getInitialState: function() {
    return {
      view: "autocomplete",
      selectedPokemon: null
    };
  },

  handleSelectedPokemon: function(selectedPokemon) {
    this.setState({
      view: "results",
      selectedPokemon: selectedPokemon
    });
  },

  handleBackButton: function() {
    this.setState({
      view: "autocomplete"
    });
  },

  render: function() {
    return this.state.view === "autocomplete" ?
      <Autocomplete onSelectPokemon={ this.handleSelectedPokemon }/> :
      <Results pokemon={ this.state.selectedPokemon } onBack={ this.handleBackButton }/>;
}

});

module.exports = Sheet;
