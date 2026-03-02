export { getFirebaseAuth, getFirebaseDb, getFirebaseStorage } from "./config";
export { signInWithGoogle, signOut, getUserProfile } from "./auth";
export {
  /* Programs */
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  /* Units */
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
  /* Topics */
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  /* Contents */
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  /* Tree */
  getProgramTree,
  getAllProgramTrees,
  /* Storage */
  uploadContentFile,
  /* Progress */
  getCompletions,
  markContentComplete,
} from "./curriculum";
export type { ProgramInput, UnitInput, TopicInput, ContentInput } from "./curriculum";
