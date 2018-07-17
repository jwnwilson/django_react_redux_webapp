import root from 'window-or-global';

// Load global jQuery
const $ = root.$;

/**
 * Get cookie value
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

/**
 * Capitalize first letter of string
 * 
 * @param {String} string to capitalize
 */
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

export default {
  capitalize,
  getCookie
}
