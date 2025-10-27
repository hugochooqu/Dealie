import { apiRequest } from "@/lib/api";

// GET - list all personas
export const fetchPersonas = (token: string) =>
  apiRequest("personas", "GET", undefined, token);

// GET - active persona
export const fetchActivePersona = (token: string) =>
  apiRequest("personas/active", "GET", undefined, token);

// POST - create new custom persona
export const createPersona = (data: any, token: string) =>
  apiRequest("personas/custom", "POST", data, token);

// PUT - update a custom persona
export const updatePersona = (id: number, data: any, token: string) =>
  apiRequest(`personas/${id}`, "PUT", data, token);

// DELETE - delete a persona
export const deletePersona = (id: number, token: string) =>
  apiRequest(`personas/${id}`, "DELETE", undefined, token);

// POST - select persona as active
export const selectPersona = (id: number, token: string) =>
  apiRequest(`personas/select/${id}`, "POST", undefined, token);
