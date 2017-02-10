// リポジトリURLを取得する
function getGitHubReposUrl(username, reposName)
{
	return "https://github.com/" + username + "/" + reposName;
}
// jsonデータからHTML文字列を作成して返す
function getHtmlString(data)
{
	return getReposHeaderString(data)
			+ getReposTableString(data)
	;
}
// jsonデータからtableタグ文字列を作成して返す
// json→html
// https://github.com/ozh/github-colors
function getReposTableString(data)
{
//	var addHtml = "<p>リポジトリ数：" + data.data.length + "</p>";
	var html = "";
	html += "<table>";
	html += "<tr><th>作成日</th><th>リポジトリ名</th><th>説明</th></tr>";
	baseDate = new Date();
	var i=0;
	for (i = 0; i < data.length; i++) {
		var targetDate = new Date(data[i].created_at);
		var desc = "";
		if (data[i].homepage) {
			desc = "<td><a href='" + data[i].homepage + "'>" + data[i].description + "</a></td>";
		} else {
			desc = "<td>" + data[i].description + "</td>";
		}
		html += "<tr>"
			+ "<td title='" + formatDate(targetDate, "yyyy-MM-dd HH:mm:ss") + "'>" + abs2rel(baseDate, targetDate) + "前</td>"
			+ "<td><a href='" + getGitHubReposUrl(data[i].owner.login, data[i].name) + "'>" + data[i].name + "</a></td>"
			+ desc
			+ "</tr>";
	}
	return html;
}
// jsonから集計部分のHTML文字列を作成して返す
function getReposHeaderString(data)
{
	var now = new Date();
	var startDate = new Date(data[(data.length - 1)].created_at);
	var elapsedDays = Math.floor((now.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
	html = "<table>"
		+ "<tr>"
			+ "<th>" + "開始日時" + "</th>"
			+ "<th>" + "リポジトリ総数" + "</th>"
			+ "<th>" + "経過日数" + "</th>"
			+ "<th>" + "リポジトリ/日" + "</th>"
		+ "</tr>"
		+ "<tr>"
			+ "<td align='center'>" + formatDate(startDate, "yyyy-MM-dd") + "</td>"
			+ "<td align='center'>" + data.length + "</td>"
			+ "<td align='center'>" + elapsedDays + "</td>"
			+ "<td align='center' title='"+(data.length / elapsedDays)+"/日'>" + (data.length / elapsedDays).toFixed(2) + "/日" + "</td>"
		+ "</tr>";
	return html;
}

