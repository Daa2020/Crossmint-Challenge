import AstralObject from './AstralObject';

interface SoloonInterface {
  create(candidateId: string, color: string): Promise<void>;
}

// Subclass of AstralObject
class Soloon extends AstralObject implements SoloonInterface {

  // Creates a Soloon
  async create(candidateId: string, color: string): Promise<void> {
    await this.createInstance("/soloons", { candidateId, row: this.row, column: this.column, color });
  }
}

export default Soloon;
