import { Router } from "express";
import crud from "./crud.js";

export default routes => {
  
    var router = Router();
    
    router.post("/", crud.create);
  
    router.get("/", crud.findAll);
  
    router.get("/:id", crud.findOne);
  
    router.put("/:id", crud.update);
  
    router.delete("/:id", crud.delete);
  
  };
