function noop () {
  return null;
}
require.extensions['.css'] = noop;
// require.extensions['.png'] = noop;
// require.extensions['.jpg'] = noop;
// require.extensions['.jpeg'] = noop;
// require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;
