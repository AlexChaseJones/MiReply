# [MiReply](http://mireply.meteorapp.com/) - Dynamic Group Messaging Social Platform

[MiReply](http://mireply.meteorapp.com/) is a personal project that I have been working on since early June 2016. It features all aspects of a social application that you would expect, namely friend requests, personal profiles with photos and posts, and messaging, but is built entirely in ES6 using cutting edge technologies such as Meteor and React. All data is stored in MLabs mongoDB, less user image uploads which I store in a AWS S3 Bucket for cost and loading optimization. All styling is done in CSS3, and as of July 2016 I am in the process of 'translating' it into Stylus (.styl) format for a more clear orginization.

## Downloading for personal use

This public repo will serve mainly as a source to assist others in building  similar platforms using meteor and react by showing my way of handling component rendering and data reactiveness. Feel free to reuse my methods, structures, and component layout as you would like. This application will not run on your device in its uploaded state.

### Prerequisities

This application is written in ES6 and uses babel to transpile it into a compatible format for most browsers. However I have noticed some bugs in Safari V9.0 that do not exist in Google Chrome V51.0, so as of right now I suggest you view it in the Chrome browser until I address those issues.


## Built With
* ES6
* Meteor
* Galaxy for deployment
* Multiple AtmosphereJS libraries
* TrackerReact for data reactiveness
* React
* React CSS Transitions (Library)
* jQuery
* MongoDB
* MLabs
* Amazon Web Services
* FlowRouter for routing
* CSS3
* Stylus
* Underscore


## Contributing

If you would like to contribute, please contact me on my [LinkedIn](https://www.linkedin.com/in/alexander-jones-2942b190
).

## Authors

* **Alexander Jones** - *Initial work* - [MiReply](https://github.com/AlexChaseJones/MiReply)

## License

This project is licensed under the MIT License

## Acknowledgments

* Michael Stern of Rutgers for introducing me to Meteor
* Pavan Katepalli of Trilogy for his continuous encouragement
* Windows 10 for pioneering modern flat design


## Screen Captures
<br>
### Profile View
<img src="https://github.com/AlexChaseJones/MiReply/blob/master/public/images/examples/profile_example.png"/>
<br>
## Friends View
<img src="https://github.com/AlexChaseJones/MiReply/blob/master/public/images/examples/friends_example.png" />
<br>
## Conversations View
<img src="https://github.com/AlexChaseJones/MiReply/blob/master/public/images/examples/conversation_example.png"/>
## Message View
<img src="https://github.com/AlexChaseJones/MiReply/blob/master/public/images/examples/messaging_example.png" />
