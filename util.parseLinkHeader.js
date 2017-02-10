// Linkヘッダを解析する
// @param  {header} HTTPヘッダのLinkキー値
// @return {object} key=rel値(next,prev,last,first), value=page(2以上の整数)
function parseLinkHeader(header)
{
	var parts = header.split(',');
	var links = {};
	angular.forEach(parts, function (p) {
		var section = p.split(';');
		if (section.length != 2) {
		    throw new Error("セクションを';'で分割できませんでした。");
		}
		var url = section[0].replace(/<(.*)>/, '$1').trim();
		var queryString = {};
		url.replace(
		    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		    function($0, $1, $2, $3) { queryString[$1] = $3; }
		);
		var page = queryString['page'];
		if( angular.isString(page) ) {
		    page = parseInt(page);
		}
		var name = section[1].replace(/rel="(.*)"/, '$1').trim();
		links[name] = page;
	});
	return links;
}

