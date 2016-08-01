require('../styles/App.less');

var React = require('react');

let logoImage = require('../images/logo.png');

var AppComponent = React.createClass({
  render: function() {
    return (
      <div className="index">
        <img src={logoImage} alt="logo" />
        <div className="notice">Littoe 来了!<br />准备好了吗？</div>
      </div>
    );
  }
}) ;

AppComponent.defaultProps = {
};

module.exports =  AppComponent;
