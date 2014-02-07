# Ustream Embed API

Enables sites using the [Ustream] embed iframe to build and adapt on the embed live player.

The Ustream Embed API provides basic methods to control the live stream or recorded video playback, and enables the user to access essential events of the live stream or the played video.

The Ustream Embed API requires [postMessage] DOM API, it won't work in browsers that does not support the postMessage API.

## Usage

Create an instance of the Embed API by providing the ID of the iframe, or the iframe DOM object itself:

```html
<iframe id="UstreamIframe" src="//ustream.tv/embed/1524" width="640" height="480"></iframe>
```

```javascript
var viewer = UstreamEmbed('UstreamIframe');
```

The Ustream Embed API provides the following methods:

 * callMethod
 * getProperty
 * addListener
 * removeListener


## callMethod

Calls a command method of the embed player, passing in any arguments.

Available commands through `callMethod`:

### play

Starts playing the currently loaded channel or video.

##### Example:

```javascript
viewer.callMethod('play');
```


### pause

Pauses the live stream, or the playback of a video.

##### Example:

```javascript
viewer.callMethod('pause');
```


### stop

Pauses the live stream, or stops the video and jumps back to the start.

##### Example:

```javascript
viewer.callMethod('stop');
```


### load

Loads a channel or a video in the player.
Requires two additional arguments:

* `type` - the loaded content type (_channel | video_)
* `id`   - the loaded content id

##### Example:

```javascript
viewer.callMethod('load', 'video', 5903947);
viewer.callMethod('load', 'channel', 1524);
```


### seek

Jumps to given position in played recorded video.

Requires one argument:

* position in seconds

##### Example:

```javascript
viewer.callMethod('seek', 180);
```


### volume
Sets the playback sound volume

Requires one argument:

* volume percent between 0-100

##### Example:

```javascript
viewer.callMethod('volume', 0); // mute
```


### quality

Sets the stream quality, if available.

Requires one argument:

* a `qualityID` key from received quality options in `quality` event

##### Example:

```javascript
viewer.callMethod('quality', 16); // set to high
```

---------------------------------------

## getProperty

Read a property of the embed player.

This method is **asynchronous**, the data will be passed to a callback function, given as argument.

Accessible properties by `getProperty`:


### duration

Get the video duration in seconds.

##### Example:

```javascript
viewer.getProperty('duration', function (duration) {
    ...
});
```


### viewers

Get the current viewer count for the loaded live stream.

##### Example:

```javascript
viewer.getProperty('viewers', function (viewerNumber) {
    ...
});
```


### progress

Get the current progress for recorded video playback, in seconds.

##### Example:

```javascript
viewer.getProperty('progress', function (progress) {
    ...
});
```

---------------------------------------

## addListener &amp; removeListener

The embed player dispatches several events during playback.
This method adds or removes event handlers to these events.

The event handler callback receives two arguments:

* `type` the type of the event
* `data` _optional_ data sent along the event

Available events for `addListener` and `removeListener`:


### live

Called when the currently loaded offline channel becomes live.

##### Example:
```javascript
viewer.addListener('live', callBack);
```


### offline
Called when the currently loaded live channel goes offline.

##### Example:
```javascript
viewer.addListener('offline', callBack);
```


### finished

Called when the currently loaded and played recorded video reaches its end.

##### Example:
```javascript
viewer.addListener('finished', callBack);
```


### playing

Called when the currently loaded content playback is started or stopped

Sends data along the event:

* `playing` (boolean)

##### Example:
```javascript
viewer.addListener('playing', callBack);
```


### size

Called when the stream size is available, or changed _(changes reported only in flash mode)_

Sent data is the size of the calculated embed iframe according to the player width, and the stream aspect ratio. The player bar height is included, if the controls are visible.

Sends data along the event:

* `size` (array) as [`width`, `height`] in pixels

##### Example:
```javascript
viewer.addListener('size', callBack);
```


### quality

Fired when the stream quality options are available.

Receives an object, with the `qualityID` as keys, and an object with two properties as values:

* `label` (string) label to show to users on control UI, eg.: "480p"
* `active` (booelan) if this quality is used or set


##### Example:
```javascript
viewer.addListener('quality', callBack);
```
```javascript
// example quality object
{
    "0":{"label":"240p","active":false},
    "1":{"label":"360p","active":false},
    "2":{"label":"480p","active":false},
    "16":{"label":"BEST","active":true}
}
```


### ppvgofree

Called when the Pay-Per-View stream becomes available free


##### Example:
```javascript
viewer.addListener('ppvgofree', callBack);
```


### ppvgopaid

Called when the free available Pay-Per-View stream closes the paywall,
the viewers can only access the stream with a valid ticket bought.


##### Example:
```javascript
viewer.addListener('ppvgopaid', callBack);
```

### syncedmeta

Called when a synced metadata has arrived on the stream/recorded. 
Used for keep presentations in sync with the live stream / recorded.

Received arguments: data (object) 

##### Example:
```javascript
viewer.addListener('syncedmeta', callBack);
```

[Ustream]:http://ustream.tv/
[postMessage]:http://www.w3.org/TR/webmessaging/
