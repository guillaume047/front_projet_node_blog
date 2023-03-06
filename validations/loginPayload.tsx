import * as yup from 'yup'

export const loginPayload = yup.object({
    email: yup
        .string()
        .required('Votre email est nécessaire pour vous connecter')
        .email("Il semblerait que l'email n'est pas valide"),
    password: yup
        .string()
        .required('Impossible de se connecter sans mot de passe')
        .min(3, 'Le mot de passe doit faire au moins 3 caractères'),
})