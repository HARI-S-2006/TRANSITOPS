export function serializeData(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'object' && obj !== null) {
    if (typeof obj.toDate === 'function') {
      return obj.toDate().toISOString();
    }
    if ('_seconds' in obj && '_nanoseconds' in obj) {
      return new Date(obj._seconds * 1000).toISOString();
    }
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeData);
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = serializeData(obj[key]);
      }
    }
    return newObj;
  }

  return obj;
}
