// MTE iframe player mockup object
function createMockFrame (id) {

		var messageHandlers = [],
			instance = {};

		function send (event, data, property) {

			// mock message event on current window
			// as from postMessage
			var evt = document.createEvent('Event'),
				eventdata = {};

			evt.initEvent('message', true, true);
			evt.origin =  "http://localhost";
			evt.source = instance.id;

			if (!property) {
				eventdata.event = {};
				eventdata.event[event] = data;
			} else {
				eventdata.property = {};
				eventdata.property[property] = data;
			}

			evt.data = JSON.stringify(eventdata);

			window.dispatchEvent(evt);
		}

		function socialsend (cmd, data) {

			// mock message event on current window
			// as from postMessage
			var evt = document.createEvent('Event'),
				eventdata = {};

			evt.initEvent('message', true, true);
			evt.origin =  "http://localhost";
			evt.source = instance.id;

			eventdata.cmd = cmd;
			eventdata.args = data;

			eventdata.sstream = true;

			evt.data = JSON.stringify(eventdata);

			window.dispatchEvent(evt);
		}

		instance = {

			id: id || '',

			getAttribute: function (attr) {
				switch (attr) {
					case "src":
						return 'http://localhost/frame.html';
				}
			},

			contentWindow: {
				postMessage: function (data, host) {

					var eventdata = JSON.parse(data);

					switch (eventdata.cmd) {
						case "duration":
						case "viewers":
						case "progress":
						case "playingContent":
							send(null, 100, eventdata.cmd);
							break;
					}

					for (var cb in messageHandlers) {
						messageHandlers[cb].call(window, data, host);
					}
				}
			},

			send: send,

			socialsend: socialsend,

			on: function (event, cb) {
				messageHandlers.push(cb);
			},

			off: function () {
				messageHandlers = [];
			}
		};

		return instance;
	};

