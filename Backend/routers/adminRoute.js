const express = require('express');
const router = express.Router()
const { signIn, createPump, getAllPumps, createCase, pumpDetail, truckDetail, driverDetail, createTruck, getAllTrucks, createDriver, getAllDrivers } = require("../controllers/adminController")

router.post("/api/admin/sign-in", signIn)
router.post("/api/admin/create-pump", createPump)
router.get("/api/admin/list-of-pumps", getAllPumps)
router.post("/api/admin/create-truck", createTruck)
router.get("/api/admin/list-of-trucks", getAllTrucks)
router.post("/api/admin/create-driver", createDriver)
router.get("/api/admin/list-of-drivers", getAllDrivers)
router.post("/api/admin/create-case", createCase)
router.get("/api/admin/pump-detail/:id", pumpDetail)
router.get("/api/admin/truck-detail/:id", truckDetail)
router.get("/api/admin/driver-detail/:id", driverDetail)





module.exports = router