import { expect } from 'chai';
import { getRepository } from '../helpers';
import { initialize, getStore, clearMetadataStorage, getMetadataStorage } from '../MetadataStorage';
import { Transient } from './Transient';

describe('Transient', () => {
  const store = getStore();
  beforeEach(() => {
    clearMetadataStorage();
    initialize(null);
  });

  it('should register transient fields', async () => {
    class Entity {
      id: string;
      name: string;

      @Transient()
      description: string;
    }

    const repository = getRepository(Entity);
    const entity = new Entity();
    entity.id = 'abc';
    entity.name = 'def';
    entity.description = 'ghi';
    const savedEntity = await repository.create(entity);
    expect(savedEntity.id).to.equal(entity.id);
    expect(savedEntity.name).to.equal(entity.name);
    expect(savedEntity.description).to.equal(undefined);
  });
});
