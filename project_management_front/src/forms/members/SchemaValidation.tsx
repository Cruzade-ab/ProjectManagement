import { z } from 'zod';


const memberSchema = z.object({
  project_id: z.number(),
  member_name: z.string().min(1, "Member name is required"),
  role: z.string().min(1, "Member Role is required")
});

export { memberSchema };