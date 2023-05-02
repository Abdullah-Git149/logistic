const Admin = require("../models/Admin")
const Pump = require("../models/Pump")
const Truck = require("../models/Truck")
const bcrypt = require("bcrypt")
const Driver = require("../models/Driver")
const Case = require("../models/Case")

// ADMIN LOGIN
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email })


        const isMatch = await bcrypt.compare(password, admin.password);
        if (!email || !password) {
            return res.status(400).json({ status: 0, message: "Must provide email or password" })
        }

        else if (!isMatch) {
            return res.status(400).json({ status: 0, message: "Password is not valid" });
        }
        else {
            await admin.generateAuthToken();
            const adminDetail = await Admin.findOne({ _id: admin._id });
            res.status(200).json({ status: 1, message: "Login Successfully", data: adminDetail.token, admin })
        }
    } catch (err) {
        return res.status(400).json({ status: 0, message: err.message })
    }
}


// ADD PUMP 
const createPump = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ status: 0, message: "Must provide name" })
        } else if (!req.body.phoneNumber) {
            return res.status(400).json({ status: 0, message: "Must provide phoneNumber" })
        } else if (!req.body.address) {
            return res.status(400).json({ status: 0, message: "Must provide Address" })
        } else if (!req.body.ownerName) {
            return res.status(400).json({ status: 0, message: "Must provide Owner's Name" })
        } else {
            const newPump = new Pump({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                ownerName: req.body.ownerName
            })

            await newPump.save()

            if (newPump) {
                return res.status(200).json({ status: 1, message: "Pump Added Successfully" })
            } else {
                return res.status(400).json({ status: 0, message: "Something Went Wrong" })
            }
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// GET ALL PUMPS
const getAllPumps = async (req, res) => {
    try {
        const pumps = await Pump.find()
        if (pumps.length > 0) {
            return res.status(200).json({ status: 1, data: pumps })
        } else {
            return res.status(400).json({ status: 0, message: "No Pump Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

const pumpDetail = async (req, res) => {
    try {
        const pump = await Pump.findOne({ _id: req.params.id })
        if (pump) {
            return res.status(200).json({ status: 1, data: pump })
        } else {
            return res.status(400).json({ status: 0, message: "No Pump Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}
const truckDetail = async (req, res) => {
    try {
        const truck = await Truck.findOne({ _id: req.params.id })
        if (truck) {
            return res.status(200).json({ status: 1, data: truck })
        } else {
            return res.status(400).json({ status: 0, message: "No Truck Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

const driverDetail = async (req, res) => {
    try {
        const driver = await Driver.findOne({ _id: req.params.id })
        if (driver) {
            return res.status(200).json({ status: 1, data: driver })
        } else {
            return res.status(400).json({ status: 0, message: "No Driver Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// ADD TRUCK
const createTruck = async (req, res) => {
    try {
        if (!req.body.truckNumber) {
            return res.status(400).json({ status: 0, message: "Must provide Truck Number" })
        } else if (!req.body.chassisNumber) {
            return res.status(400).json({ status: 0, message: "Must provide Chassis" })
        } else if (!req.body.truckOwner) {
            return res.status(400).json({ status: 0, message: "Must provide Truck Owner" })
        } else if (!req.body.frameNumber) {
            return res.status(400).json({ status: 0, message: "Must provide Frame Number" })
        } else if (!req.body.wheels) {
            return res.status(400).json({ status: 0, message: "Must provide Wheels" })
        } else {
            const newTruck = new Truck({
                truckNumber: req.body.truckNumber,
                truckOwner: req.body.truckOwner,
                chassisNumber: req.body.chassisNumber,
                frameNumber: req.body.frameNumber,
                wheels: req.body.wheels
            })
            await newTruck.save()
            if (newTruck) {
                return res.status(200).json({ status: 1, message: "Truck Added Successfully" })
            } else {
                return res.status(400).json({ status: 0, message: "Something Went Wrong" })
            }
        }
    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// GET ALL TRUCKS
const getAllTrucks = async (req, res) => {
    try {
        const truck = await Truck.find()
        if (truck.length > 0) {
            return res.status(200).json({ status: 1, data: truck })
        } else {
            return res.status(400).json({ status: 0, message: "No Pump Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// ADD DRIVER 
const createDriver = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ status: 0, message: "Must provide name" })
        } else if (!req.body.phone) {
            return res.status(400).json({ status: 0, message: "Must provide Phone Number" })
        } else if (!req.body.cnic) {
            return res.status(400).json({ status: 0, message: "Must provide CNIC" })
        } else if (!req.body.license) {
            return res.status(400).json({ status: 0, message: "Must provide License" })
        } else {
            const check = await Driver.findOne({ cnic: req.body.cnic })
            if (check) {
                return res.status(400).json({ status: 0, message: "CNIC Already Exists" })
            } else {

                const newDriver = new Driver({
                    name: req.body.name,
                    phone: req.body.phone,
                    cnic: req.body.cnic,
                    license: req.body.license
                })

                await newDriver.save()

                if (newDriver) {
                    return res.status(200).json({ status: 1, message: "Driver Added Successfully" })
                } else {
                    return res.status(400).json({ status: 0, message: "Something Went Wrong" })
                }
            }
        }
    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// GET ALL DRIVERS
const getAllDrivers = async (req, res) => {
    try {
        const driver = await Driver.find()
        if (driver.length > 0) {
            return res.status(200).json({ status: 1, data: driver })
        } else {
            return res.status(400).json({ status: 0, message: "No Driver Found" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

// ADD CASE 
const createCase = async (req, res) => {
    try {
        const newCase = new Case({
            caseNumber: req.body.caseNumber,
            vehicle: req.body.vehicle,
            marketDate: req.body.marketDate,
            returnDate: req.body.returnDate,
            weight: req.body.weight,
            bilty: req.body.bilty,
            balance: req.body.balance,
            from: req.body.from,
            to: req.body.to,
            empty: req.body.empty,
            driver: req.body.driver,
            broker: req.body.broker,
            frieght: req.body.frieght,
            returnFrieght: req.body.returnFrieght,
            status: req.body.status,
        })

        await newCase.save()

        if (newCase) {
            return res.status(200).json({ status: 1, message: "Driver Added Successfully", case: newCase })
        } else {
            return res.status(400).json({ status: 0, message: "Something Went Wrong" })
        }

    } catch (err) {
        return res.status(400).send({ status: 0, message: err.message })
    }
}

module.exports = { signIn, createPump, getAllPumps,driverDetail, createCase,truckDetail, createTruck, pumpDetail, getAllTrucks, createDriver, getAllDrivers }