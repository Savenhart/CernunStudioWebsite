import express from "express";
const router = express.Router();
import { userController } from "../Controllers/userController";
import { User } from "../models/userModels";

const userC = new userController();

router.get("/", async (req, res, next) => {
  try {
    res.send(await userC.getAll());
  } catch (err: any) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    res.send(await userC.getById(parseInt(req.params.id)));
  } catch (error: any) {
    console.error(`Error`, error.message);
    next(error);
  }
});

router.get(`/userName/:userName`, async (req, res, next) => {
  try {
    res.send(await userC.getByUserName(req.params.userName));
  } catch (error: any) {
    console.error(`Error`, error.message);
    next(error);
  }
});

router.post("/", async(req, res, next) => {
  try {
    let user = new User(req.body)
    res.json(await userC.create(user))
  } catch (error: any) {
    console.error(`Error`, error.message);
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.send(await userC.updateById(parseInt(req.params.id), req.body))
  } catch (error: any) {
    console.error(`Error`, error.message);
    next(error);
  }
})

router.delete(`/:id`), async(req: { params: { id: string; }; }, res: { send: (arg0: unknown) => void; }, next: (arg0: any) => void) => {
  try {
    res.send(await userC.deleteById(parseInt(req.params.id)))
  } catch (error: any) {
    console.error(`Error`, error.message);
    next(error);
  }
}

module.exports = router;
