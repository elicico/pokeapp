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
    return (
      <div>
        <div className="moves">
          {
            this.state.moves.length > 0 ?
            this.renderMoves() :
            <Spinner />
          }
        </div>
      </div>
    );
  },

  renderMoves: function() {
    return (
      <div>
        <ul className="result__grid-list">
          { this.state.moves.map(this.renderMoveInfos) }
        </ul>
      </div>
    );
  },

  renderMoveInfos: function(move) {
    return (
      <li key={ move.name } className="result__grid-list__item">
        <div className="move-detail">{ move.name }</div>
        <div className="flex-li">
          <div className="move-detail">
            <div className="move-detail__name">power</div>
            <div className="move-detail__value">{ move.power }</div>
          </div>
          <div className="move-detail">
            <div className="move-detail__name">accuracy</div>
            <div className="move-detail__value">{ move.accuracy }</div>
          </div>
          <div className="move-detail">
            <div className="move-detail__name">pp</div>
            <div className="move-detail__value">{ move.pp }</div>
          </div>
        </div>
        <div className="move-detail move-detail__description-link">
          description
          <div className="move-detail move-detail__description">{ move.description }</div>
        </div>
      </li>
    );
  }

});

module.exports = Moves;
