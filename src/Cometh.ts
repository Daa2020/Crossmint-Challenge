import AstralObject from './AstralObject';

interface ComethInterface {
  create(candidateId: string, direction: string): Promise<void>;
}

// Subclass of AstralObject
class Cometh extends AstralObject implements ComethInterface {

  // Creates a cometh
  async create(candidateId: string, direction: string): Promise<void> {
    await this.createInstance("/comeths", { candidateId, row: this.row, column: this.column, direction });
  }
}

export default Cometh;
