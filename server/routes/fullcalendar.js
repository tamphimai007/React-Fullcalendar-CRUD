const express = require('express')
const router = express.Router();

/* Multer  */
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
            file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})

const upload = multer({ storage: storage }).single('file')
/* Multer  */

const {
    createEvent,
    listEvent,
    updateEvent,
    currentMonth,
    updateImage,
    removeEvent,
    query
} = require('../controllers/fullcalendar')


//@Endpoint     localhost:5000/api/event
//@Method       POST
//@Acesss       Public
router.post('/event', createEvent)

//@Endpoint     localhost:5000/api/event
//@Method       GET
//@Acesss       Public
router.get('/event', listEvent)

//@Endpoint     localhost:5000/api/event
//@Method       PUT
//@Acesss       Public
router.put('/event', updateEvent)

//@Endpoint     localhost:5000/api/event
//@Method       DELETE
//@Acesss       Public
router.delete('/event/:id', removeEvent)

//@Endpoint     localhost:5000/api/current-month
//@Method       POST
//@Acesss       Public
router.post('/current-month', currentMonth)

//@Endpoint     localhost:5000/api/current-date
//@Method       GET
//@Acesss       Public
// router.get('/current-date', currentEvening)

//@Endpoint     localhost:5000/api/update-image
//@Method       POST
//@Acesss       Public
router.post('/update-image', upload, updateImage)


/*------------------- WorkShop -------------------- */
//@Endpoint     localhost:5000/api/query
//@Method       POST
//@Acesss       Public
router.post('/query', query)


module.exports = router;