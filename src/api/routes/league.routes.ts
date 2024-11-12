// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/league.controller";
import {validateToken} from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @route POST /
 * @description Crear una nueva liga
 */
router.post("/", [validateToken], controller.createLeague);

/**
 * @route GET /owned
 * @description Obtener las ligas creadas por el usuario autenticado
 */
router.get("/owned", [validateToken], controller.getOwnLeagues);

/**
 * @route GET /:id
 * @description Obtener detalles de una liga específica por ID
 */
router.get("/:id", [validateToken], controller.getLeague);
module.exports = router;

/**
 * @route GET /
 * @description Buscar ligas disponibles
 */
router.get("/", [validateToken], controller.searchLeagues);

/**
 * @route GET /:id/members
 * @description Obtener miembros de una liga específica
 */
router.get("/:id/members", [validateToken], controller.getLeagueMembers);

/**
 * @route GET /:id/not-members
 * @description Buscar usuarios que no son miembros de la liga especificada
 */
router.get("/:id/not-members", [validateToken], controller.searchNotMembers);

/**
 * @route POST /:id/member
 * @description Añadir un miembro a una liga
 */
router.post("/:id/member", [validateToken], controller.addMemberToLeague);

/**
 * @route DELETE /:leagueId/member/:userId
 * @description Expulsar un miembro de la liga
 */
router.delete("/:leagueId/member/:userId", [validateToken], controller.kickMember);

/**
 * @route POST /:leagueId/enter
 * @description Solicitar unirse a una liga
 */
router.post("/:leagueId/enter", [validateToken], controller.requestToEnterLeague);

/**
 * @route GET /:leagueId/pending
 * @description Obtener lista de miembros en espera de aprobación
 */
router.get("/:leagueId/pending", [validateToken], controller.getPendingMembers);

/**
 * @route POST /:leagueId/pending/accept
 * @description Aceptar una solicitud pendiente para unirse a la liga
 */
router.post("/:leagueId/pending/accept", [validateToken], controller.acceptMember);

/**
 * @route POST /:leagueId/pending/decline
 * @description Rechazar una solicitud pendiente para unirse a la liga
 */
router.post("/:leagueId/pending/decline", [validateToken], controller.denyMember);

router.post("/:leagueId/invite/:userId", [validateToken], controller.inviteMember);

export default router;