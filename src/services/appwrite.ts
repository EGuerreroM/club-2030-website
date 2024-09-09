import { Client, Databases, Query } from 'appwrite';

const { APPWRITE_API_ENDPOINT, APPWRITE_API_KEY, APPWRITE_DATABASE_ID, APPWRITE_PROJECT_ID, PROJECTS_COLLECTION_ID } =
  import.meta.env;

const appwriteClient = new Client().setEndpoint(APPWRITE_API_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
const appwriteDatabase = new Databases(appwriteClient);

type GetAllProjects = {
  perPage?: number;
  page?: number;
};

type Project = {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  title: string;
  description: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  organization: string | null;
};

const getAllProjects = async ({ perPage = 3, page = 1 }: GetAllProjects) => {
  const results = await appwriteDatabase.listDocuments<Project>(APPWRITE_DATABASE_ID, PROJECTS_COLLECTION_ID, [
    Query.orderDesc('$createdAt'),
    Query.limit(perPage),
    Query.offset((page - 1) * perPage),
  ]);

  return results;
};

const appwrite = {
  client: appwriteClient,
  database: appwriteDatabase,
  getAllProjects,
};

export default appwrite;
