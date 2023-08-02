import { Client, Databases } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_APPWRITE_ENDPOINT
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECTID);

export const databases = new Databases(client);

export default client;

