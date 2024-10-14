function convertMHzToGHz(valueInMHz) {
  const coefficient = 1000;
  const valueInGHz = (valueInMHz / coefficient).toFixed(2);
  return `${valueInGHz}GHz`;
}

export default convertMHzToGHz;