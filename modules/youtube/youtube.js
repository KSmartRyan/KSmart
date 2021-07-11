/* eslint-disable no-undef */
Module.register("youtube", {
	getStyles: function () {
		return ["youtube.css"];
	},
	notificationReceived: function (notification, payload, sender) {
		if (notification === "YOUTUBE") {
			if (this.hidden) {
				this.show(1000);
				this.sendNotification("CLOCK_HIDE", {});
				this.sendNotification("CALENDAR_HIDE", {});
				this.sendNotification("COMPLIMENTS_HIDE", {});
				this.sendNotification("CURRENTWEATHER_HIDE", {});
				this.sendNotification("WEATHERFORECAST_HIDE", {});
				this.sendNotification("NEWSFEED_HIDE", {});
			} else {
				this.hide(1000);
				this.sendNotification("CLOCK_SHOW", {});
				this.sendNotification("CALENDAR_SHOW", {});
				this.sendNotification("COMPLIMENTS_SHOW", {});
				this.sendNotification("CURRENTWEATHER_SHOW", {});
				this.sendNotification("WEATHERFORECAST_SHOW", {});
				this.sendNotification("NEWSFEED_SHOW", {});
			}
		}
	},
	getDom: function () {
		this.hide();
		const listCount = 20;
		const wrapper = document.createElement("div");
		wrapper.className = "youtube__wrapper";
		const listContainer = document.createElement("ul");
		listContainer.className = "list-container";
		const container = document.createElement("div");
		container.className = "container";
		const search = document.createElement("input");
		search.className = "search";
		search.type = "text";
		search.placeholder = "검색어를 입력하세요";
		search.spellcheck = "false";
		search.autocomplete = "off";
		const searchBtn = document.createElement("div");
		searchBtn.className = "search-btn";
		searchBtn.innerHTML = "검색";
		const videoContainer = document.createElement("div");
		videoContainer.className = "video-container";
		const player = document.createElement("iframe");
		player.id = "player";
		player.type = "text/html";
		player.width = "648";
		player.height = "367.63";
		player.hasAttribute("allowfullscreen");
		player.setAttribute("allowFullScreen", "");
		wrapper.appendChild(listContainer);
		wrapper.appendChild(container);
		wrapper.appendChild(videoContainer);
		container.appendChild(search);
		container.appendChild(searchBtn);
		videoContainer.appendChild(player);
		// 영상 목록
		for (let i = 0; i < listCount; i++) {
			li = document.createElement("li");
			li.id = "playlist";
			img = document.createElement("img");
			img.width = 320;
			img.height = 180;
			textContainer = document.createElement("div");
			textContainer.className = "text-container";
			title = document.createElement("div");
			title.className = "title";
			publisher = document.createElement("div");
			publisher.className = "publisher";
			listContainer.appendChild(li);
			li.appendChild(img);
			li.appendChild(textContainer);
			textContainer.appendChild(title);
			textContainer.appendChild(publisher);
		}
		listContainer.style.display = "none";

		var tag = document.createElement("script");

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// 목록에서 영상 선택했을 때 영상 재생
		function playVideo(response) {
			let lists = listContainer.childNodes;
			let src = "http://www.youtube.com/embed/";
			for (let i = 0; i < lists.length; i++) {
				lists[i].addEventListener("click", () => {
					listContainer.style.display = "none";
					container.style.display = "flex";
					videoContainer.style.display = "block";

					player.src = src + response.items[i].id.videoId;
				});
			}
		}

		// api요청으로 받아온 응답을 처리
		function processYoutubeList(response) {
			container.style.display = "none";
			videoContainer.style.display = "none";
			listContainer.style.display = "block";
			let lists = listContainer.childNodes;
			response.items.forEach((item, index) => {
				listChild = lists[index].childNodes;
				listChild[0].src = item.snippet.thumbnails.default.url;
				listChildChild = listChild[1].childNodes;
				listChildChild[0].innerHTML = item.snippet.title;
				listChildChild[1].innerHTML = item.snippet.channelTitle;
			});
			console.log(response);
			playVideo(response);
		}

		// youtube api에 검색어로 요청보내고 받음
		function updateYoutubeList() {
			let url = "https://www.googleapis.com/youtube/v3/search?key=" + "AIzaSyDLecu5uQjRitTPRNCt_BMSym3hRhsoqBk" + "&part=snippet&q=" + search.value + "&maxResults=" + String(listCount);
			let youtubeRequest = new XMLHttpRequest();
			youtubeRequest.open("GET", url, true);
			youtubeRequest.onreadystatechange = function () {
				if (this.readyState === 4) {
					if (this.status === 200) {
						processYoutubeList(JSON.parse(this.response));
						// } else if (this.status === 401) {
						// 	self.updateDom(self.config.animationSpeed);

						// 	if (self.config.forecastEndpoint === "forecast/daily") {
						// 		self.config.forecastEndpoint = "forecast";
						// 		Log.warn(self.name + ": Your AppID does not support long term forecasts. Switching to fallback endpoint.");
						// 	}

						// 	retry = true;
					} else {
						Log.error(self.name + ": 모듈 로드 불가");
					}

					// if (retry) {
					// 	self.scheduleUpdate(self.loaded ? -1 : self.config.retryDelay);
					// }
				}
			};
			youtubeRequest.send();
		}

		// google youtube api에서 검색어의 목록을 가져와서 보여줌
		function showList() {
			updateYoutubeList();
		}
		searchBtn.addEventListener("click", () => showList());

		// wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
