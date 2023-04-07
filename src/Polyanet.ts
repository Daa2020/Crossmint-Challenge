import AstralObject from "./AstralObject";

interface PolyanetInterface {
  create(candidateId: string): Promise<void>;
  delete(candidateId: string): Promise<void>;
}

// Subclass of AstralObject
class Polyanet extends AstralObject implements PolyanetInterface {

  // Creates a Polyanet
  async create(candidateId: string): Promise<void> {
    await this.createInstance("/polyanets", {
      candidateId,
      row: this.row,
      column: this.column,
    });
  }

  // Deletes a Polyanet (or any tile)
  async delete(candidateId: string): Promise<void> {
    await this.deleteInstance("/polyanets", { candidateId });
  }
}

export default Polyanet;
