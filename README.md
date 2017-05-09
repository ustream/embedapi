# Ustream Embed API

[![Build Status](https://travis-ci.org/ustream/embedapi.svg?branch=master)](https://travis-ci.org/ustream/embedapi)

Enables sites using the [Ustream] embed iframe to build and adapt on the embed live player.

The Ustream Embed API provides basic methods to control the live stream or recorded video playback, and enables the user to access essential events of the live stream or the played video.

The Ustream Embed API requires [postMessage] DOM API, it won't work in browsers that does not support the postMessage API.

## Usage

Create an instance of the Embed API by providing the ID of the iframe, or the iframe DOM object itself:

```html
<iframe id="UstreamIframe" src="//ustream.tv/embed/1524" width="640" height="480" allowfullscreen webkitallowfullscreen></iframe>
```

```javascript
var viewer = UstreamEmbed('UstreamIframe');
```

The Ustream Embed API provides the following methods:

 * callMethod
 * getProperty
 * addListener
 * removeListener

## URL parameters

The default behaviour of the player can be modified by extending the src URL with any of the following parameters:

| Parameter | Effect | Values | Default |
| ------------- | ----------- | ----------- | ----------- |
| allowfullscreen | Disables fullscreen and remove the button. | true/false | true |
| autoplay | Starts video playback automatically. | true/false | false |
| controls | Hides all UI elements. | true/false | true |
| offaircontent | Disables displaying offair content. | true/false | true |
| quality | Overrides the automatic quality selection. | low, med, high, auto | auto |
| showtitle | Hides title and viewer count. | true/false | true |
| volume | Overrides the default volume. 0 is mute, 1 is max volume. | 0.0-1.0 | user setting |

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


### content

Get the loaded content type and id as an array.

##### Example:

```javascript
viewer.getProperty('content', function (content) {
    // content == ['channel', 1524]
    // or
    // content == ['recorded', 123456]
    ...
});
```

### playingContent

Get the actual content type and id as an array. This will return the currently played offair video's id if the loaded content is an offair channel or with the channel id if the channel is live.

##### Example:

```javascript
viewer.callMethod('load', 'channel', 1524);

// ...

viewer.getProperty('playingContent', function (content) {
    // content == ['channel', 1524]
    //  - if it's live, or
    // content == ['recorded', 123456]
    //  - if it's offair and has offair video content, or
    // content == []
    //  - if it's offair and doesn't have offair video content
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

### content

Called when a the player content changes for some reason.
Same data as received in getProperty('content')

Received arguments: data (array)

##### Example:
```javascript
viewer.addListener('content', callBack);
```


[Ustream]:http://ustream.tv/
[postMessage]:http://www.w3.org/TR/webmessaging/
