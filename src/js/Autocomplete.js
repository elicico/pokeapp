var React = require('react');
var PropTypes = React.PropTypes;

var pokeImgs = require('./images.json');
var pokeNames = require('./names.json');

var ENTER_KEY = 13;
var ARROW_UP_KEY = 38;
var ARROW_DOWN_KEY = 40;

var Autocomplete = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      selectedIndex: null
    };
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value,
      selectedIndex: 0
    });
  },

  handleKeyDown: function(e) {
    var results = this.matchingPokemons(this.state.value);

    switch (e.keyCode) {
      case ENTER_KEY:
      if (this.matchingPokemons(this.state.value).length > 0) {
        this.props.onSelectPokemon(results[this.state.selectedIndex]);
      } else {
        this.setState({ value: "", selectedIndex: null });
      }
      break;
      case ARROW_UP_KEY:
      var selectedIndex = Math.max(0, this.state.selectedIndex - 1);
      this.setState({ selectedIndex: selectedIndex })
      this.refs.itemsContainer.getDOMNode().scrollTop = 80 * selectedIndex;
      break;
      case ARROW_DOWN_KEY:
      var selectedIndex = Math.min(results.length - 1, this.state.selectedIndex + 1);
      this.setState({ selectedIndex: selectedIndex })
      this.refs.itemsContainer.getDOMNode().scrollTop = 80 * selectedIndex;
      break;
    }
  },

  handleClick: function(e) {
    e.preventDefault();
    var results = this.matchingPokemons(this.state.value);
    pokemonName = e.target.textContent;
    var selectedPokemon = results.filter(function(pokemon) {
      return pokemon.name === pokemonName;
    });
    this.props.onSelectPokemon(selectedPokemon[0]);
  },

  matchingPokemons: function(value) {
    if (value.length < 2) {
      return [];
    }

    return pokeNames.filter(function(item) {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  },

  render: function() {
    var filteredResults = this.matchingPokemons(this.state.value);

    return (
      <div className="autocomplete--flex">
        <input
          className="autocomplete__input"
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
          placeholder="pokemon name here"
          value={ this.state.value }
        />
        <ul
          className={ "autocomplete__results__ul" + ( filteredResults.length > 0 ? " has-results" : "" ) }
          ref="itemsContainer"
        >
          { filteredResults.map(this.renderItem) }
        </ul>
      </div>
    );
  },

  renderItem: function(item, i) {
    var className = "autocomplete__results__li";
    if (this.state.selectedIndex === i) {
      className += " is-selected";
    }

    return (
      <li className={ className } onClick={ this.handleClick }>
        {
          item.image &&
          <img src={ "/imgs/" + item.id + ".png" } />
        }
        {item.name}
      </li>
    );
  }
});

module.exports = Autocomplete;
