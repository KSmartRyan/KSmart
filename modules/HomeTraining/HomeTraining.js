Module.register("HomeTraining", {
	getStyles: function () {
		return ["main.css"];
	},
	notificationReceived: function (notification, payload, sender) {
		if (notification === "HOMETRAINING") {
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
		const wrapper = document.createElement("div");
		wrapper.className = "wrapper";

		const header = document.createElement("p");
		header.innerHTML = "운동할 자세를 선택해주세요";
		header.className = "HomeHeader";

		const menuDiv = document.createElement("div");
		menuDiv.id = "homeMemu";

		const TPose = document.createElement("img");

		TPose.src = this.data.path + "T.png";

		menuDiv.appendChild(TPose);
		wrapper.appendChild(header);
		wrapper.appendChild(menuDiv);

		return wrapper;
	}
});
