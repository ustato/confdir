'use babel';

var _require = require('immutable');

var fromJS = _require.fromJS;

module.exports = function compose(state, action) {
  if (state === undefined) state = [];

  var index = undefined;
  switch (action.type) {
    case "COMPOSE_FILE_SELECTED":
      return fromJS([]).push({
        'filePath': action.filePath,
        'services': action.services.map(function (service) {
          return fromJS(service).set('up', "unknown").toJS();
        }),
        'version': action.version
      }).toJS();
    case "COMPOSE_FILE_ADDED":
      if (state.find(function (file) {
        return file.filePath == action.filePath;
      })) return state;else {
        return fromJS(state).push({
          'filePath': action.filePath,
          'services': action.services.map(function (service) {
            return fromJS(service).set('up', "unknown").toJS();
          }),
          'version': action.version
        }).toJS();
      }
    case "SERVICES_REFRESHED":
      index = state.findIndex(function (file) {
        return file.filePath == action.filePath;
      });
      if (index != -1) {
        return fromJS(state).setIn([index, 'services'], action.services.map(function (service) {
          return fromJS(service).set('up', "unknown").toJS();
        })).toJS();
      } else {
        return state;
      }
    case "SERVICE_STATE_CHANGED":
      return fromJS(state).map(function (conf) {
        return conf.update('services', function (services) {
          return services.map(function (service) {
            var new_service = fromJS(action).get('services').find(function (s) {
              var n = s.get('name');
              return n == service.get('name') || n == service.get('container_name');
            }, {}, fromJS({}));

            return service.set('up', new_service.get('up', 'unknown'));
          });
        });
      }).toJS();
    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob3RtYW4vLmF0b20vcGFja2FnZXMvZG9ja2VyL2xpYi9yZWR1eC9yZWR1Y2Vycy9jb21wb3NlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7ZUFFSSxPQUFPLENBQUMsV0FBVyxDQUFDOztJQUE5QixNQUFNLFlBQU4sTUFBTTs7QUFFWCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBTyxNQUFNLEVBQUU7TUFBcEIsS0FBSyxnQkFBTCxLQUFLLEdBQUcsRUFBRTs7QUFDMUMsTUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFVBQU8sTUFBTSxDQUFDLElBQUk7QUFDaEIsU0FBSyx1QkFBdUI7QUFDMUIsYUFBTyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JCLGtCQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVE7QUFDM0Isa0JBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87aUJBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFO1NBQUEsQ0FBQztBQUN6RixpQkFBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPO09BQzFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUFBLEFBQ1osU0FBSyxvQkFBb0I7QUFDdkIsVUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtlQUFJLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVE7T0FBQSxDQUFDLEVBQ3RELE9BQU8sS0FBSyxDQUFDLEtBQ1Y7QUFDSCxlQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEIsb0JBQVUsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUMzQixvQkFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTzttQkFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUU7V0FBQSxDQUFDO0FBQ3pGLG1CQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU87U0FDMUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ1g7QUFBQSxBQUNILFNBQUssb0JBQW9CO0FBQ3ZCLFdBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtlQUFJLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVE7T0FBQSxDQUFDLENBQUM7QUFDbEUsVUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDZixlQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDWCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2lCQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRTtTQUFBLENBQUMsQ0FBQyxDQUN6RyxJQUFJLEVBQUUsQ0FBQztPQUNqQixNQUFNO0FBQ0wsZUFBTyxLQUFLLENBQUM7T0FDZDtBQUFBLEFBQ0gsU0FBSyx1QkFBdUI7QUFDMUIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtlQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQ25FLGlCQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDN0IsZ0JBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxFQUFJO0FBQ3pELGtCQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLHFCQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDdkUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRW5CLG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDNUQsQ0FBQyxDQUFDO1NBQ0osQ0FBQztPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUFBLEFBQ2I7QUFDRSxhQUFPLEtBQUssQ0FBQztBQUFBLEdBQ2hCO0NBQ0YsQ0FBQyIsImZpbGUiOiIvVXNlcnMvaG90bWFuLy5hdG9tL3BhY2thZ2VzL2RvY2tlci9saWIvcmVkdXgvcmVkdWNlcnMvY29tcG9zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbnZhciB7ZnJvbUpTfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2Uoc3RhdGUgPSBbXSwgYWN0aW9uKSB7XG4gIGxldCBpbmRleDtcbiAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBcIkNPTVBPU0VfRklMRV9TRUxFQ1RFRFwiOlxuICAgICAgcmV0dXJuIGZyb21KUyhbXSkucHVzaCh7XG4gICAgICAgICdmaWxlUGF0aCc6IGFjdGlvbi5maWxlUGF0aCxcbiAgICAgICAgJ3NlcnZpY2VzJzogYWN0aW9uLnNlcnZpY2VzLm1hcCgoc2VydmljZSkgPT4gZnJvbUpTKHNlcnZpY2UpLnNldCgndXAnLCBcInVua25vd25cIikudG9KUygpKSxcbiAgICAgICAgJ3ZlcnNpb24nOiBhY3Rpb24udmVyc2lvbixcbiAgICAgIH0pLnRvSlMoKTtcbiAgICBjYXNlIFwiQ09NUE9TRV9GSUxFX0FEREVEXCI6XG4gICAgICBpZiAoc3RhdGUuZmluZChmaWxlID0+IGZpbGUuZmlsZVBhdGggPT0gYWN0aW9uLmZpbGVQYXRoKSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmcm9tSlMoc3RhdGUpLnB1c2goe1xuICAgICAgICAgICdmaWxlUGF0aCc6IGFjdGlvbi5maWxlUGF0aCxcbiAgICAgICAgICAnc2VydmljZXMnOiBhY3Rpb24uc2VydmljZXMubWFwKChzZXJ2aWNlKSA9PiBmcm9tSlMoc2VydmljZSkuc2V0KCd1cCcsIFwidW5rbm93blwiKS50b0pTKCkpLFxuICAgICAgICAgICd2ZXJzaW9uJzogYWN0aW9uLnZlcnNpb24sXG4gICAgICAgIH0pLnRvSlMoKTtcbiAgICAgIH1cbiAgICBjYXNlIFwiU0VSVklDRVNfUkVGUkVTSEVEXCI6XG4gICAgICBpbmRleCA9IHN0YXRlLmZpbmRJbmRleChmaWxlID0+IGZpbGUuZmlsZVBhdGggPT0gYWN0aW9uLmZpbGVQYXRoKTtcbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gZnJvbUpTKHN0YXRlKVxuICAgICAgICAgICAgICAgIC5zZXRJbihbaW5kZXgsICdzZXJ2aWNlcyddLCBhY3Rpb24uc2VydmljZXMubWFwKChzZXJ2aWNlKSA9PiBmcm9tSlMoc2VydmljZSkuc2V0KCd1cCcsIFwidW5rbm93blwiKS50b0pTKCkpKVxuICAgICAgICAgICAgICAgIC50b0pTKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgY2FzZSBcIlNFUlZJQ0VfU1RBVEVfQ0hBTkdFRFwiOlxuICAgICAgcmV0dXJuIGZyb21KUyhzdGF0ZSkubWFwKGNvbmYgPT4gY29uZi51cGRhdGUoJ3NlcnZpY2VzJywgc2VydmljZXMgPT4ge1xuICAgICAgICByZXR1cm4gc2VydmljZXMubWFwKHNlcnZpY2UgPT4ge1xuICAgICAgICAgIGxldCBuZXdfc2VydmljZSA9IGZyb21KUyhhY3Rpb24pLmdldCgnc2VydmljZXMnKS5maW5kKHMgPT4ge1xuICAgICAgICAgICAgbGV0IG4gPSBzLmdldCgnbmFtZScpO1xuICAgICAgICAgICAgcmV0dXJuIG4gPT0gc2VydmljZS5nZXQoJ25hbWUnKSB8fCBuID09IHNlcnZpY2UuZ2V0KCdjb250YWluZXJfbmFtZScpO1xuICAgICAgICAgIH0sIHt9LCBmcm9tSlMoe30pKTtcblxuICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnNldCgndXAnLCBuZXdfc2VydmljZS5nZXQoJ3VwJywgJ3Vua25vd24nKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkpLnRvSlMoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuIl19