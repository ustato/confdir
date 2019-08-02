'use babel';

var creators = {
  createComposeFileSelectedAction: function createComposeFileSelectedAction(filePath, services, version) {
    return {
      type: "COMPOSE_FILE_SELECTED",
      filePath: filePath,
      services: services,
      version: version
    };
  },
  createServicesRefreshedAction: function createServicesRefreshedAction(services) {
    return {
      type: "SERVICES_REFRESHED",
      services: services
    };
  },
  createServiceStateChangedAction: function createServiceStateChangedAction(services) {
    return {
      type: "SERVICE_STATE_CHANGED",
      services: services
    };
  },
  createComposeFileAddedAction: function createComposeFileAddedAction(filePath, services, version) {
    return {
      type: "COMPOSE_FILE_ADDED",
      filePath: filePath,
      services: services,
      version: version
    };
  }
};

module.exports = creators;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob3RtYW4vLmF0b20vcGFja2FnZXMvZG9ja2VyL2xpYi9yZWR1eC9hY3Rpb25zL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7QUFFWCxJQUFJLFFBQVEsR0FBRztBQUNaLGlDQUErQixFQUFFLHlDQUFTLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3JFLFdBQU87QUFDTCxVQUFJLEVBQUUsdUJBQXVCO0FBQzdCLGNBQVEsRUFBUixRQUFRO0FBQ1IsY0FBUSxFQUFSLFFBQVE7QUFDUixhQUFPLEVBQVAsT0FBTztLQUNSLENBQUM7R0FDSDtBQUNELCtCQUE2QixFQUFFLHVDQUFTLFFBQVEsRUFBRTtBQUNoRCxXQUFPO0FBQ0wsVUFBSSxFQUFFLG9CQUFvQjtBQUMxQixjQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDO0dBQ0g7QUFDRCxpQ0FBK0IsRUFBRSx5Q0FBUyxRQUFRLEVBQUU7QUFDbEQsV0FBTztBQUNMLFVBQUksRUFBRSx1QkFBdUI7QUFDN0IsY0FBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQztHQUNIO0FBQ0QsOEJBQTRCLEVBQUUsc0NBQVMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbEUsV0FBTztBQUNMLFVBQUksRUFBRSxvQkFBb0I7QUFDMUIsY0FBUSxFQUFSLFFBQVE7QUFDUixjQUFRLEVBQVIsUUFBUTtBQUNSLGFBQU8sRUFBUCxPQUFPO0tBQ1IsQ0FBQztHQUNIO0NBQ0gsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiIvVXNlcnMvaG90bWFuLy5hdG9tL3BhY2thZ2VzL2RvY2tlci9saWIvcmVkdXgvYWN0aW9ucy9zZXJ2aWNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbnZhciBjcmVhdG9ycyA9IHtcbiAgIGNyZWF0ZUNvbXBvc2VGaWxlU2VsZWN0ZWRBY3Rpb246IGZ1bmN0aW9uKGZpbGVQYXRoLCBzZXJ2aWNlcywgdmVyc2lvbikge1xuICAgICByZXR1cm4ge1xuICAgICAgIHR5cGU6IFwiQ09NUE9TRV9GSUxFX1NFTEVDVEVEXCIsXG4gICAgICAgZmlsZVBhdGgsXG4gICAgICAgc2VydmljZXMsXG4gICAgICAgdmVyc2lvblxuICAgICB9O1xuICAgfSxcbiAgIGNyZWF0ZVNlcnZpY2VzUmVmcmVzaGVkQWN0aW9uOiBmdW5jdGlvbihzZXJ2aWNlcykge1xuICAgICByZXR1cm4ge1xuICAgICAgIHR5cGU6IFwiU0VSVklDRVNfUkVGUkVTSEVEXCIsXG4gICAgICAgc2VydmljZXM6IHNlcnZpY2VzXG4gICAgIH07XG4gICB9LFxuICAgY3JlYXRlU2VydmljZVN0YXRlQ2hhbmdlZEFjdGlvbjogZnVuY3Rpb24oc2VydmljZXMpIHtcbiAgICAgcmV0dXJuIHtcbiAgICAgICB0eXBlOiBcIlNFUlZJQ0VfU1RBVEVfQ0hBTkdFRFwiLFxuICAgICAgIHNlcnZpY2VzOiBzZXJ2aWNlc1xuICAgICB9O1xuICAgfSxcbiAgIGNyZWF0ZUNvbXBvc2VGaWxlQWRkZWRBY3Rpb246IGZ1bmN0aW9uKGZpbGVQYXRoLCBzZXJ2aWNlcywgdmVyc2lvbikge1xuICAgICByZXR1cm4ge1xuICAgICAgIHR5cGU6IFwiQ09NUE9TRV9GSUxFX0FEREVEXCIsXG4gICAgICAgZmlsZVBhdGgsXG4gICAgICAgc2VydmljZXMsXG4gICAgICAgdmVyc2lvblxuICAgICB9O1xuICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRvcnM7XG4iXX0=