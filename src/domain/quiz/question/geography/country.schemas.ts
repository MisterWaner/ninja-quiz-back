import { z } from 'zod';

const CountrySchema = z.object({
    name: z.object({
        common: z.string()
    }),
    capital: z.array(z.string()),
    flags: z.object({
        svg: z.string(),
        png: z.string()
    })
})

export type Country = z.infer<typeof CountrySchema>;