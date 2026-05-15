import { RootReq } from "../models/root";
import {randomUUID} from "crypto";

const rootRoute = (req: RootReq, res: any) => {
  if (req.id) {
    res.json({ message: `Hello, your ID is ${req.id}` });
  } else {
    const newId = randomUUID();
    res.json({ message: "Hello, your ID has been generated", id: newId });
  }
}

export default rootRoute;