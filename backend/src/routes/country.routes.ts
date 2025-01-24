import express from "express";
const router = express.Router()
import { Country_Service } from "../services/country.service";
import { Region_Service } from "../services/region.service";

router.get('/countries', Country_Service.getCountries)
router.get('/country-info/:countryCode', Country_Service.getCountryInfo)
router.post('/states', Country_Service.getStates)
//These endpoints do not work (500)
//router.post('/cities', Region_Service.getCities) 
//router.post('/city-info', Region_Service.getCityInfo)


export default router