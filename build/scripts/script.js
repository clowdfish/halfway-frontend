angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/index","null");
$templateCache.put("templates/search","null");
$templateCache.put("templates/index/index.html","<div ui-view=\"search\"></div>\r\n<div class=\"row friendlist\">\r\n    <div class=\"ui-card col-xs-12 col-lg-3\">\r\n        <h1>Name</h1>\r\n        <p>Location</p>\r\n    </div>\r\n    <div class=\"ui-card col-xs-12 col-lg-3\">\r\n        <h1>Name</h1>\r\n        <p>Location</p>\r\n    </div>\r\n</div>\r\n<input ng-model=\'twoway\' class=\"form-control\">\r\n<div>\r\n    {{ twoway }}\r\n</div>\r\n\r\n<p>Nothing here {{\'yet\' + \'!\'}}</p>\r\n<div ng-repeat=\"phone in phones\">\r\n    phones {{ phone.name }}\r\n</div>");
$templateCache.put("templates/search/search.html","<section class=\"search wrapper\">\r\n</section>\r\n\r\n\r\n");}]);
/**
* This module contains shared directive, filter, and service across the App
*/
(function() {

  'use strict';

  angular
    .module('app.common', [])
    .run(run);


  function run($rootScope) {
  }

})();

/**
 * This module declares all third-party dependencies
 */
(function() {

  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ngAnimate',
      'ngStorage',
      'ngSanitize',
      'ui.sortable'
    ]);
})();


/*
* This module contain global configuration.
*/
(function() {

  'use strict';

  angular
    .module('app.index', [
      'app.core'
    ])
    .run(run);

  function run($rootScope) {
    // do whatever
  }
  
})();

(function() {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.core',
      'app.index',
      'app.templates'
    ])
    .value('googleApiKey', '....')
    .run(run);

  function run(browser) {
    if (browser.isMobileDevice()) {
      FastClick.attach(document.body);
    }
  }

})();


(function() {

  'use strict';

  angular
    .module('app.index')
    .controller('indexCtrl', indexCtrl);

  function indexCtrl($scope) {

  }

})();

(function() {

  'use strict';

  angular
    .module('app.index')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    /**
    * Resolve global application-wide data at here
    */
    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {
        globalConfig: function() {
          return {};
        }
      }
    });

    $stateProvider.state('index', {
      url: '/',
      parent: 'root',
      views: {
        '': {
          templateUrl: 'templates/index/index.html',
          controller: 'indexCtrl'
        },
        'search@index': {
          templateUrl: 'templates/search/search.html',
          controller: 'indexCtrl',
          resolve: {
            searchFormData: getDefaultData
          }
        }
      }
    });
  }

  function getDefaultData() {
    return {
      destination: null,
      origin: null,
	  date: null
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app.common')
    .filter('capitalize', capitalize);

  function capitalize() {

    return function(text) {
      if (!_.isString(text)) {
        return text;
      }
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  }
})();

(function() {

  'use strict';

  angular
    .module('app.common')
    .service('browser', browser);

  function browser($document, $window) {

    this.isMobileDevice = isMobileDevice;
    this.getViewport = getViewport;

    /**
     * Try to figure out, if the user uses a mobile device.
     */
    function isMobileDevice() {
      if (getViewport().width < 720)
        return true;

      var a = (navigator.userAgent || navigator.vendor || window.opera);
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
    }

    /**
     * Get the resolution of the browser window.
     */
    function getViewport() {
      var e = $window,
          a = 'inner';
      if ( !( 'innerWidth' in $window ) ) {
        a = 'client';
        e = $document.documentElement || $document.body;
      }
      return {
        width : e[ a + 'Width' ] ,
        height : e[ a + 'Height' ]
      }
    }

    return this;

  }
})();
(function() {

  'use strict';

  angular
    .module('app.common')
    .service('date', date);

  function date() {

    this.stringToDate = stringToDate;

    /**
    * Convert date string with timezone to Date object
    * Eg: 2015-02-10T02:54:51+00:0
    * @params {string} date - Datetime string
    * @return {Date} date object
    */
    function stringToDate(date) {
      return moment(date, "YYYY-MM-DDTHH:mm:ssZ").toDate();
    }
  }
})();
(function() {

	'use strict';

	angular
		.module('app.common')
		.service('googleMap', googleMap);

	function googleMap($q) {

		var geocoder = new google.maps.Geocoder();

		this.geocode = geocode;

		/**
		* Use geocoder to get latitude and longitude from address
		* @params {string} address - Address
		* @return {Object} latitude and longitude of address
		*/
		function geocode (address) {
			var deferred = $q.defer();
			geocoder
        .geocode({address: address}, function(results, status) {
        	console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {          	
          	deferred.resolve({
          		latitude: results[0].geometry.location.lat(),
          		longitude: results[0].geometry.location.lng()
          	});
          } else {
          	deferred.reject();
          }
        });
      return deferred.promise;
		}

		return this;

	};

})();