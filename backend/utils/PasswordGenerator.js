import { generate } from "generate-password";

export function randomPasswordGenerator() {

    const password = generate({
        length: 16,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true
    })

    return password
}