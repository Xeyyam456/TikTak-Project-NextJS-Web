import { z } from 'zod'

export const updateSchema = z
    .object({
        full_name: z.string().trim().min(2, 'Adınızı daxil edin'),
        address: z.string().trim().optional(),
        password: z.string().optional(),
        password_repeat: z.string().optional(),
    })
    .refine((data) => !data.password || data.password.length >= 4, {
        message: 'Şifrə ən azı 4 simvol olmalıdır',
        path: ['password'],
    })
    .refine((data) => !data.password || data.password === data.password_repeat, {
        message: 'Şifrələr uyğun gəlmir',
        path: ['password_repeat'],
    })
