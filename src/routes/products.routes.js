import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { validateObjectIds } from "../middlewares/validateObjectIds.middleware.js";
import ProductsController from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid", validateObjectIds(["pid"]), ProductsController.getProduct);

router.post("/", passportCall("jwt"), authorization("admin"), checkProductData, ProductsController.createProduct);

router.put("/:pid", passportCall("jwt"), authorization("admin"), validateObjectIds(["pid"]), ProductsController.updateProduct);

router.delete("/:pid", passportCall("jwt"), authorization("admin"), validateObjectIds(["pid"]), ProductsController.deleteProduct);

export default router;
