import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { validateObjectIds } from "../middlewares/validateObjectIds.middleware.js";
import CartsController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", CartsController.createCart);

router.get("/:cid", validateObjectIds(["cid"]), CartsController.getCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), validateObjectIds(["cid", "pid"]), CartsController.addProductToCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), validateObjectIds(["cid", "pid"]), CartsController.deleteProductFromCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), validateObjectIds(["cid", "pid"]), CartsController.updateQtyProductInCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), validateObjectIds(["cid"]), CartsController.clearProductsToCart);

router.post("/:cid/purchase", passportCall("jwt"), authorization("user"), validateObjectIds(["cid"]), CartsController.purchaseCart);

export default router;
