import React from 'react';

export default React.createClass({
  componentDidMount() {
    this.setupText();
  },
  componentDidUpdate() {
    var to;
    while (to = this.timeouts.pop()) {
      clearTimeout(to);
    }
    this.setupText();
  },
  setupText() {
    //Flying Letters script- by Matthias (info@freejavascripts.f2s.com)
    // Modified by Twey for efficiency and compatibility
    //For this script and more, visit Dynamic Drive: http://www.dynamicdrive.com

    //Configure message to display. Use "$" for linebreak
    //By default, set to just grab the text from element with ID="fly"
    var el = this.refs.fly;
    var message = this.props.value; // $ = taking a new line
    var distance = 50; // pixel(s)
    var speed = 200; // milliseconds

    var txt="",
    	num=0,
    	num4=0,
    	flyofle="",
    	flyofwi="",
    	flyofto="",
    	fly=el;

    this.timeouts = [];
    var self = this;

    var stfly = function() {
    	for(var i=0;i != message.length;i++) {
    		if(message.charAt(i) != "$")
    			txt += "<span style='position:relative;visibility:hidden;' id='n"+i+"'>"+message.charAt(i)+"<\/span>";
    		else
    			txt += "<br>";
    	}
    	fly.innerHTML = txt;
    	txt = "";
    	flyofle = fly.offsetLeft;
    	flyofwi = fly.offsetWidth;
    	flyofto = fly.offsetTop;
    	fly2b();
    }

    var fly2b = function() {
    	if(num4 != message.length) {
    		if(message.charAt(num4) != "$") {
    			var then = document.getElementById("n" + num4);
    			then.style.left = flyofle - then.offsetLeft + flyofwi / 2 + 'px';
    			then.style.top = flyofto - then.offsetTop + distance + 'px';
    			fly3(then.id, parseInt(then.style.left), parseInt(then.style.left) / 5, parseInt(then.style.top), parseInt(then.style.top) / 5);
    		}
    		num4++;
    		var to = setTimeout(() => { fly2b(); }, speed);
        self.timeouts.push(to);
    	}
    }

    var fly3 = function(target,lef2,num2,top2,num3) {
    	if((Math.floor(top2) != 0 && Math.floor(top2) != -1) || (Math.floor(lef2) != 0 && Math.floor(lef2) != -1)) {
    		if(lef2 >= 0)
    			lef2 -= num2;
    		else
    			lef2 += num2 * -1;
    		if(Math.floor(lef2) != -1) {
    			document.getElementById(target).style.visibility = "visible";
    			document.getElementById(target).style.left = Math.floor(lef2) + 'px';
    		} else {
    			document.getElementById(target).style.visibility = "visible";
    			document.getElementById(target).style.left = Math.floor(lef2 + 1) + 'px';
    		}
    		if(lef2 >= 0)
    			top2 -= num3
    		else
    			top2 += num3 * -1;
    		if(Math.floor(top2) != -1)
    			document.getElementById(target).style.top = Math.floor(top2) + 'px';
    		else
    			document.getElementById(target).style.top = Math.floor(top2 + 1) + 'px';
    		var to = setTimeout(() => { fly3(target,lef2,num2,top2,num3); }, 50);
        self.timeouts.push(to);
    	}
    }

    stfly()
  },

  render() {
    return <span ref={"fly"}>{this.props.value}</span>;
  }
});
