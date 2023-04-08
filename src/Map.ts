import Polyanet from "./Polyanet";
import Soloon from "./Soloon";
import Cometh from "./Cometh";
import dotenv from "dotenv";

dotenv.config();

const CREATION_INTERVAL: number = parseInt(
  process.env.CREATION_INTERVAL as string
);

interface MapInterface {
  candidateId: string;
  mapData: { goal: string[][] };
  createMap(command: string): Promise<void>;
  deleteMap(): Promise<void>;
}

class Map implements MapInterface {
  candidateId: string;
  mapData: { goal: string[][] };

  constructor(candidateId: string, mapData: { goal: string[][] }) {
    this.candidateId = candidateId;
    this.mapData = mapData;
  }

  // Creates the map
  async createMap(command: string) {
    try {
      let needInterval = true;

      for (let row = 0; row < this.mapData.goal.length; row++) {
        for (let column = 0; column < this.mapData.goal[row].length; column++) {
          const tile = this.mapData.goal[row][column];

          switch (true) {
            case tile === "SPACE" && command !== "with-delete":
              needInterval = false;
              break;

            case tile === "SPACE" && command === "with-delete":
              await new Polyanet(row, column).delete(this.candidateId);
              break;

            case tile === "POLYANET":
              await new Polyanet(row, column).create(this.candidateId);
              break;

            case tile.includes("SOLOON"):
              const color = tile.split("_")[0].toLowerCase();
              await new Soloon(row, column).create(this.candidateId, color);
              break;

            case tile.includes("COMETH"):
              const direction = tile.split("_")[0].toLowerCase();
              await new Cometh(row, column).create(this.candidateId, direction);
              break;
          }

          if (needInterval) {
            await new Promise((resolve) =>
              setTimeout(resolve, CREATION_INTERVAL)
            );
          }
          needInterval = true;
        }
      }
    } catch (error) {
      console.error("Error in main:", (error as Error).message);
    }
  }

  // Deletes all tiles
  async deleteMap() {
    try {
      for (let row = 0; row < this.mapData.goal.length; row++) {
        for (let column = 0; column < this.mapData.goal[row].length; column++) {
          await new Polyanet(row, column).delete(this.candidateId);
          await new Promise((resolve) =>
            setTimeout(resolve, CREATION_INTERVAL)
          );
        }
      }
    } catch (error) {
      console.error("Error in main:", (error as Error).message);
    }
  }
}

export default Map;
