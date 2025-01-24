"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const country_service_1 = require("../services/country.service");
router.get('/countries', country_service_1.Country_Service.getCountries);
router.get('/country-info/:countryCode', country_service_1.Country_Service.getCountryInfo);
router.post('/states', country_service_1.Country_Service.getStates);
//These endpoints do not work (500)
//router.post('/cities', Region_Service.getCities) 
//router.post('/city-info', Region_Service.getCityInfo)
exports.default = router;
