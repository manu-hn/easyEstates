import bcrypt from "bcryptjs"

export const passwordHasher = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
        
    } catch (error) {
        console.log(error)
    }
}




export const isPasswordValid = async (password, hashedPassword) => {

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    return isPasswordCorrect;

}