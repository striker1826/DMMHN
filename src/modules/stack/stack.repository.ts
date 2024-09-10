export interface StackRepository {
  findAllByStack();
}

export const StackRepository = Symbol('StackRepository');
