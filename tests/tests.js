suite('Ustream EmbedAPI tests', function() {

	var MTE = createMockFrame;

	suite('addListener', function () {

		test('ready', function () {

			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			embedapi.addListener('ready', spy);

			mte.send('ready', true);

			sinon.assert.calledOnce(spy);
		});

		test("live", function () {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			embedapi.addListener('live', spy);

			mte.send('ready', true);
			mte.send('live', true);

			sinon.assert.calledOnce(spy);

		});
	});

	suite('removeListener', function () {

		test("live", function () {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			embedapi.addListener('live', spy);

			mte.send('ready', true);

			mte.send('live', true);
			embedapi.removeListener('live', spy);
			mte.send('live', true);

			sinon.assert.calledOnce(spy);

		});
	});

	suite('callMethod', function () {

		test("play", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('play');

			mte.send('ready', true);



			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'play');
				done();
			}, 30);

		});


		test("pause", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('pause');

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'pause');
				done();
			}, 30);

		});


		test("stop", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('stop');

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'stop');
				done();
			}, 30);

		});

		test("load", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('load', 'channel', 1524);

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'load');
				assert.equal(received2.args[0], 'channel');
				assert.equal(received2.args[1], 1524);
				done();
			}, 30);

		});

		test("seek", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('seek', 180);

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'seek');
				assert.equal(received2.args[0], 180);
				done();
			}, 30);

		});
		test("volume", function (done) {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.on('message',spy);

			embedapi.callMethod('volume', 30);

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'volume');
				assert.equal(received2.args[0], 30);
				done();
			}, 30);

		});

		test("quality", function (done) {
			var mte = MTE();
			var embedapi = UstreamEmbed(mte);
			window[mte.id] = mte;

			var spy = sinon.spy();

			mte.on('message',spy);

			embedapi.callMethod('quality', 16);

			mte.send('ready', true);

			setTimeout(function () {
				var received1 = JSON.parse(spy.args[0][0]),
					received2 = JSON.parse(spy.args[1][0]);

				sinon.assert.calledTwice(spy);
				assert.equal(received1.cmd, 'apihandshake');
				assert.equal(received2.cmd, 'quality');
				assert.equal(received2.args[0], 16);
				done();
			}, 30);
		});


	});


	suite('socialstream connect', function () {

		test("listen to sstream iframe", function (done) {

			var mte, embedapi, sstream, call;

			mte = MTE();
			sstream = MTE('SocialStreamTest');

			embedapi = UstreamEmbed(mte);

			window[mte.id] = mte;
			window[sstream.id] = sstream;

			sinon.spy(window, 'addEventListener');

			embedapi.callMethod('socialstream', sstream);

			sinon.assert.calledOnce(window.addEventListener);

			call = window.addEventListener.getCall(0);

			assert.equal(call.args[0], 'message');

			sinon.restore(window.addEventListener);

			done();
		});

		test("ready", function (done) {

			var mte,
				embedapi,
				sstream,
				spy = sinon.spy();

			mte = MTE();
			sstream = MTE('SocialStreamTest2');

			sstream.on('message', spy);

			embedapi = UstreamEmbed(mte);

			window[mte.id] = mte;
			window[sstream.id] = sstream;

			mte.send('ready', true);

			embedapi.callMethod('socialstream', sstream);

			spy.reset();

			sstream.socialsend('ready');

			var call = spy.getCall(0),
				received = JSON.parse(call.args[0]);

			sinon.assert.calledOnce(spy);
			assert.equal(received.cmd, 'ready');

			done();


		});

		test("load", function (done) {

			var mte, embedapi, sstream,
				sspy = sinon.spy(),
				mspy = sinon.spy();

			mte = MTE();
			sstream = MTE('SocialStreamTest3');

			mte.on('message', mspy);
			sstream.on('message', sspy);

			embedapi = UstreamEmbed(mte);

			window[mte.id] = mte;
			window[sstream.id] = sstream;

			embedapi.callMethod('socialstream', sstream);

			sstream.socialsend('ready');

			mte.send('ready', true);

			sstream.socialsend('load', ['video',123456]);


			var received1 = JSON.parse(mspy.args[0][0]),
				received2 = JSON.parse(mspy.args[1][0]),
				received3 = JSON.parse(mspy.args[2][0]);

			sinon.assert.callCount(mspy, 3);
			assert.equal(received1.cmd, 'ready');

			assert.equal(received2.cmd, 'apihandshake');

			assert.equal(received3.cmd, 'load');
			assert.equal(received3.args[0], 'video');
			assert.equal(received3.args[1], 123456);

			done();


		});
	});

	suite('getProperty', function () {

		test("duration", function (done) {
			var cmd = 'duration',
				mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;


			mte.send('ready', true);

			embedapi.getProperty(cmd, spy);

			setTimeout(function () {
				var received = JSON.parse(spy.args[0][0]);

				sinon.assert.calledOnce(spy);

				assert.equal(received, 100);

				done();
			}, 30);

		});

		test("viewers", function (done) {
			var cmd = 'viewers',
				mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.send('ready', true);

			embedapi.getProperty(cmd, spy);

			setTimeout(function () {

				var received = JSON.parse(spy.args[0][0]);

				sinon.assert.calledOnce(spy);

				assert.equal(received, 100);

				done();
			}, 30);

		});

		test("progress", function (done) {
			var cmd = 'progress',
				mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy = sinon.spy();

			window[mte.id] = mte;

			mte.send('ready', true);

			embedapi.getProperty(cmd, spy);

			setTimeout(function () {
				var received = JSON.parse(spy.args[0][0]);
				sinon.assert.calledOnce(spy);
				assert.equal(received, 100);
				done();
			}, 30);

		});

		suite('playingContent', function () {
			test('playingContent just once', function (done) {
				var cmd = 'playingContent',
					mte = MTE(),
					embedapi = UstreamEmbed(mte),
					spy = sinon.spy();

				window[mte.id] = mte;

				mte.send('ready', true);

				embedapi.getProperty(cmd, spy);

				setTimeout(function () {
					var received = JSON.parse(spy.args[0][0]);
					sinon.assert.calledOnce(spy);
					assert.equal(received, 100);
					done();
				}, 30);
			});


			test('playingContent recursively', function (done) {
				var cmd = 'playingContent',
					mte = MTE(),
					embedapi = UstreamEmbed(mte),
					spy = sinon.spy();

				window[mte.id] = mte;

				mte.send('ready', true);

				embedapi.callMethod(cmd, function () {
					embedapi.callMethod(cmd, spy);
				});

				setTimeout(function () {
					var received = JSON.parse(spy.args[0][0]);
					sinon.assert.calledOnce(spy);
					assert.equal(received, 100);
					done();
				}, 100);
			});
		});
	});


	suite('destroy', function () {

		test("destroy", function () {
			var mte = MTE(),
				embedapi = UstreamEmbed(mte),
				spy1 = sinon.spy(),
				spy2 = sinon.spy();

			embedapi.addListener('ready', spy1);
			embedapi.addListener('live', spy1);

			mte.send('ready', true);
			mte.send('live', true);

			sinon.assert.calledTwice(spy1);

			embedapi.addListener('live', spy2);

			embedapi.destroy();

			mte.send('live', false);

			sinon.assert.notCalled(spy2);
		});
	});

});
