export class CommonFunctionsService {
  public combineObjects(obj1: any, obj2: any) {
    let result: any = {};

    for (let key in obj1) {
      if (obj2.hasOwnProperty(key) && obj2[key] !== null) {
        result[key] = obj2[key];
      } else {
        result[key] = obj1[key];
      }
    }
    return result;
  }
}
