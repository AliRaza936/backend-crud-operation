import bcrypt from 'bcrypt'

let encryptPassword = async (plainPassword)=>{
        let saltCount = 10;
        let encryptedPassword = await bcrypt.hash(plainPassword,saltCount)
        return encryptedPassword;
}
let matchPassword = (userpassword,hashpassword)=>{
   return bcrypt.compare(userpassword,hashpassword)
}
export {encryptPassword,matchPassword}