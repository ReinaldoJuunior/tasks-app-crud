const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const checkInvalidEmail = (email: string) =>  EMAIL_REGEX.test(email);

export const checkInvalidPassword = (password: string) => password.length >= 6;