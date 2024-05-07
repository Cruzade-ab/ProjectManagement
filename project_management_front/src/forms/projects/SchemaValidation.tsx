import { z } from 'zod';


const projectSchema = z.object({
  id: z.number().optional(),
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description should be at least 10 characters long"),
  status: z.string().min(1, "Status is required")
});

export { projectSchema };
