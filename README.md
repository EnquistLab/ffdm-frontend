# Ffdm-frontend

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Building Cesium

Build Cesium from within the ffdm-frontend/vendors/cesium directory:

```
$ ./Tools/apache-ant-1.8.2/bin/ant combine
```

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
Building environment=dev_server seems to work
* `ember build --environment production` (production)

### Deploying

In root ffdm-frontend folder:

sudo rsync -uavz -e "ssh -p 1657" dist h4ck3rd4wg@scooby.iplantcollaborative.org:~

Log in to scooby, at /home/h4ck3rd4wg/ where we rsync'd :

sudo cp -r dist/. /var/www/html

Watch out for your broswer's cache if it looks like the website isn't updating

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

