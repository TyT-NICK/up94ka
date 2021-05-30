module.exports = {
  removeFieldsFromObject: (obj, ...fieldNames) => {
    let newObj = { ...obj };

    fieldNames.forEach((x) => {
      const { [x]: removed, ...rest } = newObj;
      newObj = rest;
    });

    return newObj;
  },
};
