var React = require('react');
var pikachu = require('./client');
var PropTypes = React.PropTypes;
var Spinner = require('./Spinner');

var Types = React.createClass({
  getInitialState: function() {
    return {
      types: []
    };
  },

  componentDidMount: function() {
    pikachu
      .get("http://pokeapi.co/api/v1/pokemon/" + this.props.pokemon.id)
      .done(function(err, data) {
        if (err) {
          console.log("FAIL ", err);
        } else {
            var tipi = [];
            for (i=0; i < data.types.length; i++) {
              pikachu
                .get("http://pokeapi.co" + data.types[i].resource_uri)
                .done(function(err, d) {
                  tipi.push(d);
                  this.setState({ types: tipi });
                }.bind(this));
            }
        }
      }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="stats">
          {
            this.state.types.length > 0 ?
            this.renderTypes() :
            <Spinner />
          }
        </div>
        </div>
    );
  },

  renderTypes: function() {

    var typeInfos = [
      { name: "type", value: this.state.types.map(function(type) {
          return type.name;
        }).join(', ') },
      { name: "strong vs", value: this.state.types.map(function(type) {
          return type.super_effective.map(function(type) {
            return type.name;
          }).join(', ')
        }).join(', ') },
      { name: "weak vs", value: this.state.types.map(function(type) {
          return type.weakness.map(function(type) {
            return type.name;
          }).join(', ')
        }).join(', ') }
    ];

        return (
          <div>
            <ul className="result__list">
              { typeInfos.map(this.renderTypeInfos) }
            </ul>
          </div>
        );
  },

  renderTypeInfos: function(typeInfo) {
    return (
      <div className="result__list__item">
        <li className="info">
          <div className="info__left">{ typeInfo.name }</div>
          <div className="info__right">{ typeInfo.value }</div>
        </li>
      </div>
    )
  }
});

module.exports = Types;
