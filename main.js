angular.module('myApp', [ 'ngSanitize' ])
.controller('MyController', ['$scope', '$http', '$q', function($scope, $http, $q) {
	$http.get(createUrl())
	.then(function(response) {
		// Linkヘッダからpagenation情報を取得する
		console.log(".then ------------")
		console.log(response)
		link_string = response.headers('Link')
		console.log(link_string)

		// 応答結果を溜める
	    response_datas = [];
		Array.prototype.push.apply(response_datas, response.data)
		console.log(response.data)

		// Linkヘッダを解析して全件分のリクエストURLを取得する
		var https = [];
		links = parseLinkHeader(link_string);
		for (key in links) { console.log(key + ": " + links[key]); }
		for (var i = links["next"]; i <= links["last"]; i++)
		{
			https.push($http.get(createUrl() + "&page=" + i));
			console.log(createUrl() + "&page=" + i)
		}
		
		// ページ分だけリクエストを繰り返す
		$q.all(https).then(function(result) {
			console.log("$q.all --------------")
			angular.forEach(result, function(response) {
				console.log("angular.forEach --------------")
				console.log(response.data)
				Array.prototype.push.apply(response_datas, response.data)
			});
			console.log("LAST --------------")
			console.log(response_datas)
			$scope.gitHubRepos = getHtmlString(response_datas);
		});
	});
}]);

