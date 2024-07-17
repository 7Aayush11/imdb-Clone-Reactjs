const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Saved = require('../models/WatchLater')
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using: GET "/api/watchlater/fetchsaved". Login Required
router.get('/fetchsaved' ,fetchuser ,async (req, res)=>{
    try {
        const saved = await Saved.find({user: req.user.id})
        res.json(saved)
    }
    // If there are error return bad request
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Sever Error")
    }
})

// Route 2: Add notes using: Post "/api/watchlater/additem". Login Required
router.post('/additem', fetchuser,[
    body('imdbId'),
    body('poster')],
    async (req, res)=>{
    try {
        const{imdbId, poster} = req.body
        const item = new Saved({
           imdbId, poster, user: req.user.id
        })
        const savedItem = await item.save()
        res.json(savedItem)
    }
    // If there are error return bad request
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Sever Error")            
    }
})

// Route 3: Delete existing notes using: Delete "/api/watchlater/removeitem". Login Required
try {
    
    router.delete('/removeitem/:id', fetchuser, async (req, res)=>{
    
        //Find the note to be delteded
        let item = await Saved.findById(req.params.id)
        if(!item){return res.status(404).send("Not Found")}
    
        //If the note is not of the authorized user do not allow the access
        if(item.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        item = await Saved.findByIdAndDelete(req.params.id)
        res.json("Item Deleted successfully")
    
    })
}
catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Sever Error")   
}


module.exports = router