(function () {
  var path = location.pathname;
  if (path.endsWith('/index.html')) path = path.slice(0, -10);
  else if (path.endsWith('index.html')) path = path.slice(0, -10);
  else if (!path.endsWith('/')) {
    var last = path.split('/').pop() || '';
    path = last.includes('.') ? path.slice(0, path.lastIndexOf('/') + 1) : path + '/';
  }
  var base = document.createElement('base');
  base.href = path || './';
  document.head.appendChild(base);
})();
