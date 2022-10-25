import {Alert, Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;

const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = widthPercent;

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = heightPercent;

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const checkFileSize = image => {
  let size = image.fileSize / 1048;
  if (size < 100) {
    return true, image;
  } else return false;
};

function truncate(str, n) {
  if (str && str.length > 0) {
    return str.length > n ? str.slice(0, n - 1) + '..' : str;
  }
}

function dateFormatter(str) {
  return str.replace(/'/g, "\\'");
}

export {
  widthPercentageToDP,
  heightPercentageToDP,
  checkFileSize,
  truncate,
  dateFormatter,
  screenWidth,
  screenHeight,
};
