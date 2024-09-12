export const prerender = false;

import type { APIRoute } from 'astro';
import type { Schema } from 'components/Form/Form';
import type { LocalProject } from 'services/appwrite';
import appwrite from 'services/appwrite';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as Schema;

  const projectData: LocalProject = {
    title: data.titulo,
    description: data.descripcion,
    email: data.email || null,
    phone: data.telefono || null,
    address: data.direccion || null,
    organization: data.organizacion || null,
  };

  return await appwrite.createProject(projectData);
};
