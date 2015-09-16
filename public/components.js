var RecipeAPIHeader = React.createClass({
  render: function() {
    return (
      <h1>
        <a href="/" className="logo-svg"><img src="siili_logo.svg"/></a>Recipes API
        <div className="links">
          <a href="https://www.getpostman.com/collections/a71a45c5b668530f10ce" target="_blank">Postman collection url</a>
        </div>
      </h1>
    );
  }
});

var Api = React.createClass({
  render: function() {
    return (
     <div className="api">
      <h2><span className="no">{this.props.no}</span> <span className={this.props.method + " method"}>{this.props.method}</span>
      {this.props.path.split("/").slice(1).map(s => (s.startsWith('{'))?<span key={s.id}>&#x200A;/&#x200A;<span className="pathparam">{s}</span></span>:((s==="")?(""):<span>&#x200A;/&#x200A;{s}</span>))}</h2>
      <div className="apidesc">
      	{this.props.children}
      </div>
     </div>
    );
  }
});

var JsonExample = React.createClass({
  getInitialState: function() {
    return {
      example: '',
      show: false
    };
  },

  componentDidMount: function() {
    $.get(this.props.src, function(result) {
      if (this.isMounted()) {
        this.setState({
          example: result,
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="examplejson">
      	<span>{this.props.title}</span> 
      	<span className="showhide" onClick={this.showHide}>{this.state.show?<i className="fa fa-minus-square-o"></i>:<i className="fa fa-plus-square-o"></i>}</span>
      	<div className={"examplejsoncontent "+(this.state.show?"visible":"hidden")}>{this.renderJson(this.state.example)}</div>
  	  </div>
    );
  },

  showHide: function(){
  	this.setState({show: !this.state.show});
  },

  renderJson: function(jsonValue){
    if (Object.prototype.toString.apply(jsonValue) === '[object Array]') {
    	var elements = this.renderJsonArray(jsonValue);
    	return <span className="jsonarray">&#x0005B;{elements}&#x0005D;</span>;
    } else if(typeof jsonValue === 'object') {
    	var elements = this.renderJsonObject(jsonValue);
    	return <span className="jsonobject">&#x0007B;{elements}&#x0007D;</span>;
    } else if(typeof jsonValue === 'string') {
    	return <span>&quot;<span className="jsonstring">{jsonValue}</span>&quot;</span>;
    } else {
    	return <span className={'json'+(typeof jsonValue)}>{jsonValue}</span>;
    }
  },

  renderJsonObject: function(jsonObject){
  	var elements = [];
  	for(var objType in jsonObject){
  		elements.push(<span>&quot;<span className="jsonname">{objType}</span>&quot;:{this.renderJson(jsonObject[objType])}</span>);
    }
    var len = elements.length;
    for (var i = len - 1; i >= 1; i--) {
    	elements.splice(i,0,",");
    };
    return elements;
  },

  renderJsonArray: function(jsonArray){
  	var elements = [];
  	for(var objType in jsonArray){
  		elements.push(this.renderJson(jsonArray[objType]));
  	}
  	var len = elements.length;
    for (var i = len - 1; i >= 1; i--) {
    	elements.splice(i,0,",");
    };
  	return elements;
  }

});

