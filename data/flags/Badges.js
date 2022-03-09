
import { BitField } from './BitField.js'

/**
 * Data structure that makes it easy to interact with a {@link User#flags} bitfield.
 * @extends {BitField}
 */
export class Badges extends BitField {}

/**
 * @name UserFlags
 * @kind constructor
 * @memberof UserFlags
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Bitfield of the packed bits
 * @type {number}
 * @name UserFlags#bitfield
 */

/**
 * Numeric user flags. All available properties:
 * * `DISCORD_EMPLOYEE`
 * * `PARTNERED_SERVER_OWNER`
 * * `HYPESQUAD_EVENTS`
 * * `BUGHUNTER_LEVEL_1`
 * * `HOUSE_BRAVERY`
 * * `HOUSE_BRILLIANCE`
 * * `HOUSE_BALANCE`
 * * `EARLY_SUPPORTER`
 * * `TEAM_USER`
 * * `BUGHUNTER_LEVEL_2`
 * * `VERIFIED_BOT`
 * * `EARLY_VERIFIED_BOT_DEVELOPER`
 * * `DISCORD_CERTIFIED_MODERATOR`
 * * `BOT_HTTP_INTERACTIONS`
 * @type {Object}
 * @see {@link https://discord.com/developers/docs/resources/user#user-object-user-flags}
 */
Badges.FLAGS = {
  DEVELOPER: 1 << 0,
  TRANSLATOR: 1 << 1,
  SUPPORTER: 1 << 2,
  RESPONSIBLE_DISCLOSURE: 1 << 3,
  FOUNDER: 1 << 4,
  PLATFORM_MODERATION: 1<<5,
  ACTIVE_SUPPORTER: 1<<6,
  PAW: 1<<7,
  EARLY_ADOPTER: 1 << 8,
  RESERVED_RELEVANT_JOKE_BADGE_1: 1<<9
};