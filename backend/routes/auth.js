import express from "express";

import { validateRequest } from "zod-express-middleware";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  varifyEmailSchema,
} from "../libs/validate-schema.js";
import {
  loginUser,
  registerUser,
  resetPasswordRequest,
  verifyEmail,
  verifyResatPasswordTokenAndResatPassword,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest({
    body: registerSchema,
  }),
  registerUser
);

router.post(
  "/login",
  validateRequest({
    body: loginSchema,
  }),
  loginUser
);

router.post(
  "/verify-email",
  validateRequest({
    body: varifyEmailSchema,
  }),
  verifyEmail
);

router.post(
  "/reset-password-request",
  validateRequest({
    body: emailSchema,
  }),
  resetPasswordRequest
);

router.post(
  "/reset-password",
  validateRequest({
    body: resetPasswordSchema,
  }),

  verifyResatPasswordTokenAndResatPassword
);

export default router;
