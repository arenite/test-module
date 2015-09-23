window.Module = {};
window.Module.Test = function () {
  return {
    context: {
      dependencies: {
        default: {
          async: [
            'build/test.min.js'
          ]
        },
        dev: {
          sync: [
            'lib/jasmine/jasmine.js',
            'lib/jasmine/jasmine-html.js',
            'lib/jasmine/console.js',
            'lib/jasmine/boot.js'
          ],
          async: [
            'lib/jasmine/blanket.js',
            'lib/jasmine/blanket_jasmine.js',
            'js/test.js'
          ]
        }
      },
      instances: {
        test: {
          namespace: 'Arenite.Test',
          args: [{ref: 'arenite'}]
        }
      }
    }
  };
};