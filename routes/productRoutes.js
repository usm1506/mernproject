import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'
import {brainTreePaymentController, braintreeTokenController, createProductController, productCategoryController, productCountController, productFiltersController, productListController, realtedProductController, searchProductController} from "./../contollers/productController.js"
import { getProductController } from "./../contollers/productController.js";
import { getSingleProductController } from "./../contollers/productController.js";
import { productPhotoController } from "./../contollers/productController.js";
import { deleteProductController } from "./../contollers/productController.js";
import { updateProductController } from "./../contollers/productController.js";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


router.get("/get-product", getProductController);


router.get("/get-product/:slug", getSingleProductController);

// //get photo
router.get("/product-photo/:pid", productPhotoController);

// //delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

// //filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// //search product
router.get("/search/:keyword", searchProductController);

// //similar product
router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;