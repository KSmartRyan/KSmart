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
		menuDiv.className = "TPose_Size";
		

		const TPoseImg = document.createElement("img");

		TPoseImg.src = this.data.path + "T.png";

		const TPoseCameraVideo = document.createElement("video");
		TPoseCameraVideo.id = "videoElement";

		menuDiv.addEventListener("click", () => this.cameraOn());


		const footer = document.createElement("div");
		footer.className = "description-container";

		const footerMenu = document.createElement("div"); 
		footerMenu.className = "menu__description";
		footerMenu.innerHTML = "T자세이다.";


		menuDiv.appendChild(TPoseImg);
		menuDiv.appendChild(TPoseCameraVideo);
		wrapper.appendChild(header);
		wrapper.appendChild(menuDiv);
		wrapper.appendChild(footerMenu);

		this.TposeHeader = header;
		this.TPoseCameraVideo = TPoseCameraVideo;
		this.TPoseImg = TPoseImg;

		return wrapper;
	},
	cameraOn : function(){
		this.TposeHeader.style.visibility = "hidden";
		this.TPoseImg.style.display = "none"

		var video = document.querySelector("#videoElement");

		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
				video.play();

            }).catch(function (error) {
                console.log(error);
            })
		}
	}
	
});
