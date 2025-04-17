
import addressModel from '../models/addressModel.js'
let addAddress = async function (req, res) {
  try {
    let {country,name,phone,address,city,state,zip} = req.body
    if(!country||!name||!phone||!address||!city||!state||!zip){
        return res.status(404).send({success:false,message:"All Fields Required"})
    }
    // let userId = req.user._id
    
    let addresses = await addressModel.create({country,name,phone,address,state,city,zip,user:req.user._id})
   

      return res.status(201).send({success:true,message:"Address Add Successfully",addresses})
} catch (error) {
    console.log(`Error in addAddress ${error}`)
}
return res.status(500).send({ success: false, message: "Error in addAddress" });
};
let getSingleAddress = async function (req, res) {
  try {
  let {addressId} = req.params
  let Address = await addressModel.findById(addressId)
  if(!Address){
    return res.status(404).send({success:false,message:"Address Not Found"})

  }

  return res.status(201).send({success:true,message:"Address fetched Successfully",Address})
   

} catch (error) {
    console.log(`Error in getSingleAddress ${error}`)
}
return res.status(500).send({ success: false, message: "Error in getSingleAddress" });
};


let getAddress = async function (req, res) {
  try {

  let addresses = await addressModel.find({}).populate("user","name")
  if(!addresses){
    return res.status(404).send({success:false,message:"Address not Found"})

  }

  return res.status(201).send({success:true,total:addresses.length,message:"Addresses Fetched Successfully",addresses})
   

} catch (error) {
    console.log(`Error in getAddress ${error}`)
}
return res.status(500).send({ success: false, message: "Error in getAddress" });
};


let deleteAddress = async function (req, res) {
  try {
    let {addressId} = req.params

  let addresses = await addressModel.findByIdAndDelete(addressId)
  if(!addresses){
    return res.status(404).send({success:false,message:"Address not Found"})

  }

  return res.status(201).send({success:true,message:"Addresses Delete Successfully"})
   

} catch (error) {
    console.log(`Error in deleteAddress ${error}`)
}
return res.status(500).send({ success: false, message: "Error in deleteAddress" });
};


let updateAddress = async function (req, res) {
  try {
    let {addressId} = req.params
    let {country,name,phone,address,city,state,zip} = req.body


  let addresses = await addressModel.findByIdAndUpdate(addressId)
  if(!addresses){
    return res.status(404).send({success:false,message:"Address not Found"})

  }
  if(country) addresses.country = country
  if(name) addresses.name = name
  if(phone) addresses.phone = phone
  if(address) addresses.address = address
  if(city) addresses.city = city
  if(state) addresses.state = state
  if(zip) addresses.zip = zip

  await addresses.save()

  return res.status(201).send({success:true,message:"Addresses updateed Successfully",addresses})
   

} catch (error) {
    console.log(`Error in updateAddress ${error}`)
}
return res.status(500).send({ success: false, message: "Error in updateAddress" });
};

export {addAddress,getSingleAddress,getAddress,deleteAddress,updateAddress  };
