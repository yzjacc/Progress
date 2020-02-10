/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Base implementation of a loader. Default loads package.json files from top level directory and each package in packages
 * @module gaz/fs/loader
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires debug
 * @requires path
 * @requires fs
 * @requires glob
 * @requires async
 * @requires keef
 * @requires gaz/class
 * @requires gaz/class/options
 * @requires gaz/class/parent
 * @requires gaz/lang
 * @requires gaz/array
 * @requires gaz/function
 */

var debug         = require( 'debug' )('gaz:fs:loader') // debuging instance
  , path          = require( 'path' )                   // node path module
  , fs            = require( 'fs' )                     // node fs module
  , async         = require( 'async' )                  // node async module
  , glob          = require( 'glob' )
  , conf          = require( 'keef' )                   // hive configuration loader
  , Class         = require( '../class' )               //  standard Class
  , Options       = require( '../class/options' )       //  Options mixin for Class
  , Parent        = require( '../class/parent' )        //  Options mixin for Class
  , clone         = require( '../lang' ).clone          //  standard clone function
  , toArray       = require( '../lang' ).toArray        //  standard function to convert things to arrays
  , compact       = require( '../array' ).compact       //  standard compact function
  , flatten       = require( '../array' ).flatten       //  standard flatten function
  , attempt       = require( '../function' ).attempt    //  try/catch wrapper
  , values        = require('../object').values
  , toModule      = require('../string').toModule
  , Loader                                                     // Base Loader class
  , applications
  , pkg
  ;


pkg = conf.get('pkg:name') || 'megadoomer';
applications = toArray( conf.get( pkg + ':applications') );

/**
 * And object mapping arrays of files to their associated package names
 * @typedef {Object} module:gaz/fs/loader~files
 * @property {Function} flat reduces the object into a single array
 */

/**
 * Base implementation of A file loader. Can locate all package.json files for packages and hive 
 * @constructor
 * @alias module:gaz/fs/loader
 * @param {Object} [options] Instance specific configuration options
 * @param {String} [options.searchpath=''] search path relative to {@link module:zim/lib/overrides.PACKAGE_PATH|PACKAGE_PATH} to look for package files to load
 * @param {RegExp} [options.filepattern=/package.json$/] a regular expression used to qualify files
 * @mixes module:gaz/class/options
 * @mixes module:prime-util/prime/parentize
 */
Loader = new Class({
  mixin:[Options, Parent]
, options:{
    searchpath: ''
  , extensionpattern: /\.[\w]+$/
  , filepattern: /package\.json$/
  , recurse: true
  , ignore: 'node_modules'
  }
, constructor: function( options ){
    this.paths = {};
    this.cache = {};
    this.setOptions( options );
  }
  /**
   * Locates specific files located throught the project and loads returns their absolute path
   * @method module:gaz/fs/loader#find
   * @example var loader.find('core', 'conf', 'hive')
   * @param {...String} [packages] Any number of applications to load packages from. Packages are restricted to the hive packages under the {@link module:hive-conf/lib/overrides.PACKAGE_PATH|PACKAGE_PATH} setting . the `hive-` prefix is optional
   * @return {module:gaz/fs/loader~files} an object where keys are app names and its value is an array of full paths to all of the fixture files that were found
  */
, find: function find(){
    var apps  // users specified application to search for files
      , that  // reference to this
      , obj   // object that will be returned from function
      ;

    apps = toArray( arguments );
    that = this;
    obj = {};

    Object.defineProperty(obj,'flat',{
      value:this.flat
    });

    if( !apps.length ){
      // find specified
      apps =  apps.concat( applications )
      try{
        require.resolve( process.cwd() );
        apps.push(  process.cwd() );
      } catch( err ){
        // if there is no index.js, just omit it from apps
      }
    }

    debug('loading %s', apps.join(', ') );
    apps.forEach(function( app ){
      var appName = that.appName( app, apppath )
        , apppath = path.dirname( require.resolve( app ) )
        , directoryPath = path.join( apppath, that.options.searchpath )
        ;

      debug('checking directory path %s', directoryPath );
      if( that.paths[ app ] ){
         return obj[ appName ] = that.paths[app];
      }

      if( fs.existsSync( directoryPath ) &&  fs.statSync( directoryPath ).isDirectory() ){
        var opt = {ignore:path.join(directoryPath, that.options.ignore ,'**' )}
          , files = that.options.recurse ?
            glob.sync( path.join( directoryPath, '**', '*' ), opt ) :
            glob.sync( path.join( directoryPath, '*') , opt )

        files
        .forEach( function( f ){
          if( ( that.options.filepattern ).test( f ) ){
            f = path.normalize( f )
            debug('found fixture %s', f );
            ( that.paths[app] = that.paths[app] || [] ).push( {name:that.toName(app, f ), path: f }  );
          }
        });
        obj[ appName ] = clone( that.paths[ app ] );
      }
    });
    return obj;
  }
, appName: function( name ){
    return name;
  }
  /**
   * Similar to the find method, but returns the object returned by require rather than paths
   * @method module:gaz/fs/loader#load
   * @param {...String} [packages] Any number of applications to load packages from
   * @example loader.load('core', 'conf', 'hive')
   * @return {module:gaz/fs/loader~files} an object where keys are app names and its value is an array the fixture data to all of the fixture files that were found
   */
, load: function load(){
    var packages = this.find.apply(this, arguments)
      , obj = {}
      ;

    Object.defineProperty(obj,'flat',{
      value:this.flat
    });

    for( var key in packages ){
      this.cache[key] = this.cache[key] || [];
      if( !this.cache[key].length ){
        this.cache[key] = compact( packages[key].map( this.remap.bind(this,key) ) );
      }

      obj[key] = clone( this.cache[key]);
    }

    return obj;
  }

  /**
   * The return value is used as the name of the module to be loaded Defaults to the name of the application
   * @method module:gaz/fs/loader#toName
   * @param {String} app The name of the application the file is associated with
   * @param {String} path the full path of the file to be loaded
   * @return {String} The name of the file to be loaded
   **/
, toName: function toName(app, path ){
    return app
  }

, remap: function remap( app, loaded ){
    return attempt( require.bind( require, loaded.path, loaded.name ) )
  }
  /**
   * The method used to flatten out the loader data structure to a single array
   * @method module:gaz/fs/loader#flat
   * @return {Array} A single arry of the loaded files or modules
   **/
, flat: function flat(){
    var items = values( this )
      , out = []
      ;

    for(var x=0,len=items.length; x<len; x++){
      out = out.concat( items[x] )
    }
    return flatten( out )
  }
  /**
   * clears internal file cache
   * @method module:gaz/fs/loader#reset
   * @return {Loader} Current loader instance
   **/

, reset: function reset( ){
    this.cache = {};
    this.paths = {};
    return this;
  }
});
module.exports = Loader;
