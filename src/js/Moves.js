var React = require('react');
var pikachu = require('./client');
var PropTypes = React.PropTypes;
var Spinner = require('./Spinner');

var Moves = React.createClass({
  getInitialState: function() {
    return {
      moves: []
    };
  },

  componentDidMount: function() {
    pikachu
      .get("http://pokeapi.co/api/v1/pokemon/" + this.props.pokemon.id)
      .done(function(err, data) {
        if (err) {
          console.log("FAIL ", err);
        } else {
            var mosse = [];
            for (i=0; i < data.moves.length; i++) {
              pikachu
                .get("http://pokeapi.co" + data.moves[i].resource_uri)
                .done(function(err, d) {
                  mosse.push(d);
                  this.setState({ moves: mosse });
                }.bind(this));
            }
        }
      }.bind(this));
  },

  handleDescriptionClick: function(e) {
    e.preventDefault();
    return <div>{ move.description }</div>
  },

  render: function() {
    return this.state.moves.length > 0 ?
            this.renderMoves() :
            <Spinner />
  },

  renderMoves: function() {
    return (
      <div>
        <ul className="moves-list">
          { this.state.moves.map(this.renderMoveInfos) }
        </ul>
      </div>
    );
  },

  renderMoveInfos: function(move) {
    return (
      <li key={ move.name } className="moves-list__item">
        <div className="moves-list__item__name">{ move.name }</div>
        <div className="moves-list__item__infos">
          <div className="moves-list__item__info">
            <div className="moves-list__item__info__name">power</div>
            <div className="moves-list__item__info__value">{ move.power }</div>
          </div>
          <div className="moves-list__item__info">
            <div className="moves-list__item__info__name">accuracy</div>
            <div className="moves-list__item__info__value">{ move.accuracy }</div>
          </div>
          <div className="moves-list__item__info">
            <div className="moves-list__item__info__name">pp</div>
            <div className="moves-list__item__info__value">{ move.pp }</div>
          </div>
        </div>
        <div className="moves-list__item__description-link">
          description
          <div className="moves-list__item__description">{ move.description }</div>
        </div>
      </li>
    );
  }

});

module.exports = Moves;
