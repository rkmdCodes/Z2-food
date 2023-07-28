export function formatString(str , len) {
    if ( str && str.length >= len ){
      return str.substr(0, len-2) + '..';
    } else {
      return str;
    }
  }