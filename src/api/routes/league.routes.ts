// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/league.controller";
import {validateToken} from "../middlewares/auth.middleware";
import {banMember} from "../controllers/league.controller";
import {isBanned} from "../middlewares/league.middleware";

const router = express.Router();

/**
 * @route POST /
 * @description Crear una nueva liga
 */
router.post("/", [validateToken], controller.createLeague);

router.get("/invites/:userId?", [validateToken], controller.getUserInvites);

router.put("/invites/accept/:leagueId", [validateToken], controller.acceptLeagueInvite);


/**
 * @route PUT /
 * @description Edita la liga `:leagueId` con los datos indicados en la petición.
 */
router.put("/:leagueId/", [validateToken, isBanned], controller.editLeague);


/**
 * @route GET /owned
 * @description Obtener las ligas creadas por el usuario autenticado
 */
router.get("/owned", [validateToken], controller.getOwnLeagues);

/**
 * @route GET /:id
 * @description Obtener detalles de una liga específica por ID
 */
router.get("/:leagueId", [validateToken, isBanned], controller.getLeague);
module.exports = router;

/**
 * @route GET /
 * @description Buscar ligas disponibles
 */
router.get("/", [validateToken, isBanned], controller.searchLeagues);

/**
 * @route GET /:id/members
 * @description Obtener miembros de una liga específica
 */
router.get("/:leagueId/members", [validateToken, isBanned], controller.getLeagueMembers);

/**
 * @route GET /:id/not-members
 * @description Buscar usuarios que no son miembros de la liga especificada
 */
router.get("/:leagueId/not-members", [validateToken, isBanned], controller.searchNotMembers);

/**
 * @route POST /:id/member
 * @description Añadir un miembro a una liga
 */
router.post("/:leagueId/member", [validateToken, isBanned], controller.addMemberToLeague);

/**
 * @route DELETE /:leagueId/member/:userId
 * @description Expulsar un miembro de la liga
 */
router.delete("/:leagueId/kick/:userId", [validateToken, isBanned], controller.kickMember);

/**
 * @route POST /:leagueId/enter
 * @description Solicitar unirse a una liga
 */
router.post("/:leagueId/enter", [validateToken, isBanned], controller.requestToEnterLeague);

/**
 * @route GET /:leagueId/pending
 * @description Obtener lista de miembros en espera de aprobación
 */
router.get("/:leagueId/pending", [validateToken, isBanned], controller.getPendingMembers);

/**
 * @route POST /:leagueId/pending/accept
 * @description Aceptar una solicitud pendiente para unirse a la liga
 */
router.post("/:leagueId/pending/accept", [validateToken, isBanned], controller.acceptMember);

/**
 * @route POST /:leagueId/pending/decline
 * @description Rechazar una solicitud pendiente para unirse a la liga
 */
router.post("/:leagueId/pending/decline", [validateToken, isBanned], controller.denyMember);

/**
 * @route POST /:leagueId/pending/decline
 * @description Invitar a un usuario `:userId` a la liga `:leagueId`
 */
router.post("/:leagueId/invite/:userId", [validateToken, isBanned], controller.inviteUser);


/**
 * @route POST /:leagueId/pending/decline
 * @description Invitar a un usuario `:userId` a la liga `:leagueId`
 */
router.post("/:leagueId/ban/:userId", [validateToken, isBanned], controller.banMember);

router.get("/:leagueId/championships", [validateToken], controller.getChampionships);


export default router;