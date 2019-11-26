import { getMetadataStorage } from '../MetadataStorage';

export function Transient(): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    getMetadataStorage().setTransient(target.constructor.name, propertyKey);
  };
}
