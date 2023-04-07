import axios from "axios";
import Map from "./Map";
import dotenv from "dotenv";

dotenv.config();

const CANDIDATE_ID: string = process.env.CANDIDATE_ID as string;
const REQUEST_TIMEOUT: number = parseInt(process.env.REQUEST_TIMEOUT as string);

// Fetch the map data from the API
const getMap = async (): Promise<{ goal: string[][] }> => {
  try {

    const instance = axios.create({
      baseURL: process.env.BASE_URL,
      timeout: REQUEST_TIMEOUT,
    });

    const url = `/map/${CANDIDATE_ID}/goal`;

    const response = await instance.get(url);
    return response.data;

  } catch (error) {
    console.error("Error in getMap:", error);
    throw error;
  }
};

// Main function
const main = async () => {
  try {
    // Fetch the map data
    const mapData = await getMap();

    // Create a new Map
    const map = new Map(CANDIDATE_ID, mapData);

    // Check the command line argument
    switch (process.argv[2]) {
      case "just-delete":
        await map.deleteMap();
        break;

      case undefined:

      case "with-delete":
        await map.createMap(process.argv[2]);
        break;

      default:
        console.log("Command not recognized");
    }
  } catch (error) {
    console.error("Error in main:", error);
  }
};

main();
