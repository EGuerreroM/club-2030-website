import { Client, Databases, ID, Query } from 'appwrite';

const { APPWRITE_API_ENDPOINT, APPWRITE_DATABASE_ID, APPWRITE_PROJECT_ID, PROJECTS_COLLECTION_ID } = import.meta.env;

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

export type LocalProject = Omit<
  Project,
  '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'
>;

const getAllProjects = async ({ perPage = 3, page = 1 }: GetAllProjects) => {
  const results = await appwriteDatabase.listDocuments<Project>(APPWRITE_DATABASE_ID, PROJECTS_COLLECTION_ID, [
    Query.orderDesc('$createdAt'),
    Query.limit(perPage),
    Query.offset((page - 1) * perPage),
  ]);

  return results;
};

const createProject = async (project: LocalProject) => {
  const id = ID.unique();

  try {
    const createdProject = await appwriteDatabase.createDocument<Project>(
      APPWRITE_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      id,
      project,
    );
    console.log(createdProject);

    if (!createdProject) {
      throw new Error('Error creating project');
    }

    return new Response(
      JSON.stringify({
        message: 'Success!',
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error creating project',
      }),
      { status: 400 },
    );
  }
};

const appwrite = {
  client: appwriteClient,
  database: appwriteDatabase,
  getAllProjects,
  createProject,
};

export default appwrite;
