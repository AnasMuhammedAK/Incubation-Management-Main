const express = require('express')
const { loginAdmin,getNewLists,addSlot,viewDetails,bookSlot,deleteSlot,getPendingList,getDetails,getSlot,changeStatus,getApprovedList,getAllList} = require('../helpers/admin-helpers')
const { protectAdmin} = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/login', loginAdmin)
router.get('/getNewList',protectAdmin,getNewLists)
router.get('/getPendingList',protectAdmin,getPendingList) 
router.get('/getDetails/:id',protectAdmin,getDetails)         
router.post('/changeStatus',protectAdmin,changeStatus)
router.get('/getApprovedList',protectAdmin,getApprovedList)
router.get('/getAllList',protectAdmin,getAllList)
router.get('/getSlot',protectAdmin,getSlot)
router.post('/addSlot',addSlot)
router.delete('/deleteSlot',protectAdmin,deleteSlot)
router.post('/bookSlot',protectAdmin,bookSlot)
router.post('/viewDetails',protectAdmin,viewDetails)


module.exports = router