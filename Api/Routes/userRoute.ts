import express from "express";
const router = express.Router();
import { userController } from "../Controllers/userController";

const userC = new userController();


router.get('/', async (req, res, next) => {
  try {
    res.send(await userC.getAll());

  } catch (err: any) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get(`/:id`, async (req, res, next) => {
    try {
        res.send(await userC.getById(parseInt(req.params.id)))
    } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
    }
})

module.exports = router;