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
    return this.state.types.length > 0 ?
            this.renderTypes() :
            <Spinner />;
  },

  renderTypes: function() {

    var conglomerator = function(types, property) {
      return types.reduce(function(acc, type) {
        return acc.concat(type[property].map(function(type) {
          return type.name;
          }));
      }, [])
    }

    var typeInfos = [
      {
        name: "type",
        values: this.state.types.map(function(type) {
          return type.name;
        })
      },
      {
        name: "strong vs",
        values: conglomerator(this.state.types, "super_effective")
      },
      {
        name: "weak vs",
        values: conglomerator(this.state.types, "weakness")
      }
    ];

    return (
        <ul className="infos">
          { typeInfos.map(this.renderTypeInfos) }
        </ul>
    );
  },

  renderTypeInfos: function(typeInfo) {
    return (
      <li className="infos__item">
        <div className="infos__item__left">{ typeInfo.name }</div>
        <div className="infos__item__right">{ typeInfo.values.join(", ") }</div>
      </li>
    );
  }
});

module.exports = Types;
