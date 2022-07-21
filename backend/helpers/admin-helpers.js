const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const ApplicationSchema = require('../models/applicationModel')
const sloteSchema = require('../models/sloteModel')
const { response } = require('express')
const res = require('express/lib/response')
const { findById } = require('../models/adminModel')
//   Authenticate a user

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("🚀 ~ file: admin-helpers.js ~ line 9 ~ loginAdmin ~ req.body", req.body)


    const admin = await Admin.findOne({ email })

    if (admin) {

        if (email === admin.email && password == admin.password) {
            console.log('admin matched')
            res.status(200).json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id)
            })
        } else {
            console.log('admin not matched')
            res.json({ error: "Incorrect password" })

        }
    } else {
        console.log('admin not fount')
        res.json({ error: "admin not fount" })

    }
})

const getNewLists = asyncHandler(async (req, res) => {
    try {
        let newList = await ApplicationSchema.find({ Status: "new" }).limit(5).sort({ createdAt: -1 }).lean()
        if (newList.length > 0) {
            // console.log("🚀 ~ file: admin-helpers.js ~ line 37 ~ getNewLists ~ newList", newList)
            res.status(200).json(newList)
        }
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 40 ~ getNewLists ~ error", error)

    }


})
const getPendingList = asyncHandler(async (req, res) => {
    try {
        let pendingList = await ApplicationSchema.find({ Status: "Pending" }).sort({ createdAt: -1 }).lean()
        if (pendingList.length > 0) {
            //console.log("🚀 ~ file: admin-helpers.js ~ line 53 ~ getPendingList ~ newList", pendingList)
            res.status(200).json(pendingList)
        }
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 57 ~ getPendingList ~ error", error)
    }
})
const getDetails = asyncHandler(async (req, res) => {
    try {
        ApplicationSchema.findById(req.params.id).then((response) => {
            console.log("🚀 ~ file: admin-helpers.js ~ line 63 ~ getDetails ~ app", response)
            app = [response]
        })

        res.status(200).json(app)
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 66 ~ getDetails ~ error", error)

    }
})
const changeStatus = asyncHandler(async (req, res) => {
    const { status, id } = req.body
    try {
        await ApplicationSchema.findByIdAndUpdate(id,
            { $set: { Status: status } },
            { new: true }).then((response) => {
                console.log("🚀 ~ file: admin-helpers.js ~ line 80 ~ {new:true}).then ~ response", response)
            })
        let pendingList = await ApplicationSchema.find({ Status: "Pending" }).sort({ createdAt: -1 }).lean()
        if (pendingList.length > 0) {
            console.log("🚀 ~ file: admin-helpers.js ~ line 53 ~ getPendingList ~ newList", pendingList)
            res.status(200).json(pendingList)
        }else{
            res.status(200).json([])
        }
    } catch (error) {

    }
})
const getApprovedList = asyncHandler(async (req, res) => {
    try {
        let approvedList = await ApplicationSchema.find({ Status: "Approved" }).sort({ createdAt: -1 }).lean()
        if (approvedList.length > 0) {
            console.log("🚀 ~ file: admin-helpers.js ~ line 95 ~ getApprovedList ~ approvedList", approvedList)
            res.status(200).json(approvedList)
        }
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 98 ~ getApprovedList ~ error", error)

    }
})
const getAllList = asyncHandler(async (req, res) => {
    try {
        let allApps = await ApplicationSchema.find().sort({ createdAt: -1 }).lean()
        res.status(200).json(allApps)
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 109 ~ getAllList ~ error", error)

    }
})
const getSlot = asyncHandler(async (req, res) => {
    try {
        let slote = await sloteSchema.find().lean()
        res.status(200).json(slote)
    } catch (error) {

    }
})
const addSlot = asyncHandler(async (req, res) => {
    try {
        await sloteSchema.create({ name: null }).then((response) => {

            console.log("🚀 ~ file: admin-helpers.js ~ line 126 ~ awaitsloteSchema.create ~ response", response)
            res.status(200).json(response)
        })
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 128 ~ addSlot ~ error", error)

    }
})
const deleteSlot = asyncHandler(async (req, res) => {
    try {
        await sloteSchema.findOneAndRemove({ name: null }).then((response) => {
            console.log("🚀 ~ file: admin-helpers.js ~ line 137 ~ awaitsloteSchema.findOneAndRemove ~ response", response)
            res.status(200).json(response)
        })
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 138 ~ deleteSlot ~ error", error)

    }
})
const bookSlot = asyncHandler(async (req, res) => {
    const { Id, cId,cName } = req.body
    try {
        await sloteSchema.findByIdAndUpdate(Id, {
            $set: {
                name:cName,
                Booked: true,
                Company: cId,
            }
        },
            { new: true }).then(async(response) => {
                await ApplicationSchema.findByIdAndUpdate(cId,
                    { $set: { Status: 'Booked' } },
                    { new: true }).then((resp) => {
                        res.status(200).json(response.Company)
                    })
                console.log("🚀 ~ file: admin-helpers.js ~ line 155 ~ {new:true}).then ~ response", response)
                
            })
    } catch (error) {
        console.log("🚀 ~ file: admin-helpers.js ~ line 149 ~ bookSlot ~ error", error)

    }
})
const viewDetails = asyncHandler(async(req,res)=>{
    const { sId } = req.body;
    try {
        await ApplicationSchema.findById(sId).then((response)=>{
        console.log("🚀 ~ file: admin-helpers.js ~ line 169 ~ awaitApplicationSchema.findById ~ response", response)
            res.status(200).json(response)
        })
    } catch (error) {
        
    }
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET2, {
        expiresIn: '7d',
    })
}

module.exports = {
    loginAdmin,
    getNewLists,
    getPendingList,
    getDetails,
    changeStatus,
    getApprovedList,
    getAllList,
    getSlot,
    addSlot,
    deleteSlot,
    bookSlot,
    viewDetails

}