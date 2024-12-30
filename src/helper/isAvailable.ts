import { Hall } from "../modules/HallDetails/halldetails.model";

export const updateHallAvailability = async (hallId: string, isAvailable: boolean) => {
  // Update the hall's availability in the database
  await Hall.update(
    { isAvailable }, // Set isAvailable to false (booked)
    { where: { id: hallId } }
  );
};