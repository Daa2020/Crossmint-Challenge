import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: parseInt(REQUEST_TIMEOUT!),
});

interface AstralObjectInterface {
  row: number;
  column: number;
  createInstance(endpoint: string, data: any): Promise<void>;
  deleteInstance(endpoint: string, data: any): Promise<void>;
}

// Astral objects superclass
class AstralObject implements AstralObjectInterface {
  constructor(public row: number, public column: number) {}

  // Creates a tile
  async createInstance(endpoint: string, data: any) {

    try {
      await instance.post(endpoint, data);
      console.log(
        `Created ${this.constructor.name} at ${this.row} ${this.column}`
      );

    } catch (error) {
      console.error("Error in createInstance:", (error as Error).message);
    }
  }

  // Deletes a tile
  async deleteInstance(endpoint: string, data: any) {
    try {
      await instance.delete(endpoint, {

        data: {
          ...data,
          row: this.row,
          column: this.column,
        },
      });
      console.log(`Deleted ASTRALOBJECT at ${this.row} ${this.column}`);

    } catch (error) {
      console.error("Error in deleteInstance:", (error as Error).message);
    }
  }
}

export default AstralObject;
