var React = require('react');
var pikachu = require('./client');
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

    return (
      <div>
        <div className="stats">
          {
            this.state.infos ?
            this.renderInfos() :
            "LOADING..."
          }
        </div>
        </div>
    );
  },

  renderInfos: function() {

    var stats = [
      { name: "health points", value: JSON.stringify(this.state.infos.hp) },
      { name: "attack", value: JSON.stringify(this.state.infos.attack) },
      { name: "defense", value: JSON.stringify(this.state.infos.defense) },
      { name: "special attack", value: JSON.stringify(this.state.infos.sp_atk) },
      { name: "special defense", value: JSON.stringify(this.state.infos.sp_def) },
      { name: "speed", value: JSON.stringify(this.state.infos.speed) }
    ];

    return (
      <div>
        <ul className="flex-ul result__list">
          { stats.map(this.renderStats) }
        </ul>
      </div>
    )
  },

  renderStats: function(stat) {

    return (
      <li className="flex-li singleStat"><div className="statName">{ stat.name }</div><div className="statValue">{ stat.value }</div></li>
    )
  }

});

module.exports = Stats;
