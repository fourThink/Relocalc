var m = require("mithril");

exports.loader = function(){
  return m('img.loader[src="../img/spinner.gif"]', {style: {display: "none"}})
};