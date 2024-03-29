// Listing Schema Validation
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

const roomSchema = Joi.object().keys({
    Single: Joi.string().valid("Single"),
    Double: Joi.string().valid("Double"),
    Triple: Joi.string().valid("Triple"),
    Dormitory: Joi.string().valid("Dormitory"),
})

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
    roomType: roomSchema.required(),
    facilities: facilitiesSchema,
    contact: Joi.object().keys({
        mobile: Joi.number().required(),
        email: Joi.string().required(),
    }),
}});


