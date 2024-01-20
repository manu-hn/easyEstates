import { generateFromEmail } from "unique-username-generator";

export function randomUniqueUsernameGenerator(email){
    const username = generateFromEmail(
        email,
        4
      );
      return username;
}