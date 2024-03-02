// Schema Validation
const Joi = require("joi");

const facilitiesSchema = Joi.object().keys({
    WiFi: Joi.string().valid("WiFi"),
    Parking: Joi.string().valid("Parking"),
    Gym: Joi.string().valid("Gym"),
    Laundry: Joi.string().valid("Laundry"),
    AC: Joi.string().valid("Air Conditioning"),
    Heating: Joi.string().valid("Heating"),
    Kitchen: Joi.string().valid("Kitchen"),
    TV: Joi.string().valid("TV"),
    Mess: Joi.string().valid("Mess"),
    Washroom: Joi.string().valid("Washroom"),
});

module.exports.listingSchema = Joi.object({
    listing:{
    title: Joi.string().required(),
    forWho: Joi.string().valid('Boys', 'Girls').required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().required().min(1000),
    image: Joi.string(),
    description: Joi.string().required(),
    nearCollege: Joi.string().optional(),
    bedrooms: Joi.number().required(),
    roomType: Joi.string().valid('Single', 'Double', 'Triple', 'Dormitory').required(),
    facilities: facilitiesSchema,
}});

module.exports.userSchema = Joi.object({
    user: {
        username: Joi.string(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        accountType: Joi.string().valid("Business", "Personal"),
    }
})