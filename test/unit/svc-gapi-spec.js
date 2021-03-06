/* jshint expr:true */
"use strict";

describe("Services: gapi loader", function() {

  beforeEach(module("risevision.common.gapi"));
  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("CORE_URL", "");
    window.gapiSrc = "test/gapi-mock.js";
  }));

  describe("gapiLoader", function () {
    it("should load gapi", function(done) {
      inject(function (gapiLoader) {
        expect(gapiLoader).be.defined;
        gapiLoader().then(function () {
          done();
        });
      });
    });
  });

  describe("gapiClientLoaderGenerator", function () {

    it("should load a gapi client lib", function (done) {
      inject(function (gapiClientLoaderGenerator, $window) {
        expect(gapiClientLoaderGenerator).be.defined;
        var loaderFn = gapiClientLoaderGenerator("custom", "v0");
        loaderFn().then(function () {
          expect($window.gapi).to.be.defined;
          expect($window.gapi.custom).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("oauth2APILoader", function () {
    it("should load", function(done) {
      inject(function (oauth2APILoader, $window) {
        expect(oauth2APILoader).be.defined;
        oauth2APILoader().then(function () {
          expect($window.gapi.client.oauth2).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("coreAPILoader", function () {
    it("should load", function(done) {
      inject(function (coreAPILoader, $window) {
        expect(coreAPILoader).be.defined;
        coreAPILoader().then(function () {
          expect($window.gapi.client.core).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("done", function () {
    it("should load", function(done) {
      inject(function (riseAPILoader, $window) {
        expect(done).be.defined;
        riseAPILoader().then(function () {
          expect($window.gapi.client.rise).to.be.defined;
          done();
        }, done);
      });
    });
  });

});
