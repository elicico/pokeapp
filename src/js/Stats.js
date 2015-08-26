var React = require('react');
var pikachu = require('./client');
var Spinner = require('./Spinner');
var PropTypes = React.PropTypes;

var Stats = React.createClass({
  getInitialState: function() {
    return {
      infos: null
    };
  },

  componentDidMount: function() {
    pikachu
      .get("http://pokeapi.co/api/v1/pokemon/" + this.props.pokemon.id)
      .done(function(err, data) {
        if (err) {
          console.log("FAIL ", err);
        } else {
          this.setState({ infos: data });
        }
      }.bind(this));
  },

  render: function() {

    return this.state.infos ?
            this.renderInfos() :
            <Spinner />;
  },

  renderInfos: function() {

    var stats = [
      { name: "health points", value: this.state.infos.hp },
      { name: "attack", value: this.state.infos.attack },
      { name: "defense", value: this.state.infos.defense },
      { name: "special attack", value: this.state.infos.sp_atk },
      { name: "special defense", value: this.state.infos.sp_def },
      { name: "speed", value: this.state.infos.speed }
    ];

    return <ul className="infos">
            { stats.map(this.renderStats) }
          </ul>

  },

  renderStats: function(stat) {
    return (
        <li key={ stat.name } className="infos__item">
          <div className="infos__item__left">{ stat.name }</div>
          <div className="infos__item__right">{ stat.value }</div>
        </li>
    );
  }
});

module.exports = Stats;
