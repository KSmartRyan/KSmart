/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("helloworld", {
	// Default module config.
	defaults: {
		text: "안녕하세요!"
	},

	getTemplate: function () {
		return "helloworld.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
